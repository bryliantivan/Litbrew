const express = require("express");
const asyncHandler = require("express-async-handler");  // <-- Import AsyncHandler
const userRoute = express.Router();
const User = require("../Models/User");
const generateToken = require('../tokenGenerate');
const protect = require("../middleware/Auth");
const Voucher = require("../Models/Voucher");
const multer = require("multer");

// Login route
userRoute.post('/login', asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Verifikasi email dan password
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                points: user.points,  // Mengirimkan poin pengguna saat login
                redeemedVouchers: user.redeemedVouchers,  // Mengirimkan voucher yang sudah ditebus
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                createdAt: user.createdAt,
            });
        } else {
            res.status(401);
            throw new Error("Invalid email or password");
        }
    })
);

// Register route (Pendaftaran pengguna)
userRoute.post("/", asyncHandler(
    async (req, res) => {
        const { email, password, name } = req.body;

        // Periksa apakah pengguna sudah ada
        const existUser = await User.findOne({ email });
        if (existUser) {
            res.status(400);
            throw new Error("User already exists");
        } else {
            // Buat pengguna baru
            const user = await User.create({
                name,
                email,
                password
            });

            if (user) {
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    points: user.points,  // Poin default yang dimiliki pengguna baru
                    redeemedVouchers: user.redeemedVouchers,  // Voucher yang telah ditebus
                    isAdmin: user.isAdmin,
                    createdAt: user.createdAt,
                });
            } else {
                res.status(400);
                throw new Error("Invalid user data");
            }
        }
    })
);

// Get user profile data (Auth protected)
userRoute.get("/profile", protect, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            email: user.email,
            name: user.name,
            points: user.points,
            redeemedVouchers: user.redeemedVouchers,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
            profilePicture: user.profilePicture,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
}));


// Update user profile (Auth protected)
userRoute.put("/profile", protect, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        // Update profil pengguna
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        // Update password jika ada
        if (req.body.password) {
            user.password = req.body.password;
        }

        // Simpan perubahan profil
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            email: updatedUser.email,
            name: updatedUser.name,
            points: updatedUser.points,  // Mengirimkan poin setelah update
            redeemedVouchers: updatedUser.redeemedVouchers,  // Mengirimkan voucher yang sudah ditebus
            isAdmin: updatedUser.isAdmin,
            createdAt: updatedUser.createdAt,
            token: generateToken(updatedUser._id)  // Generate token baru setelah update profil
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
}))

//redeem voucher
userRoute.put("/redeem", protect, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id); // Find the user based on the token
    const { voucherCode } = req.body; // Assuming the voucher code is sent in the body

    if (user) {
        // Check if the user has the voucher in the redeemed list
        const voucherIndex = user.redeemedVouchers.indexOf(voucherCode);

        if (voucherIndex === -1) {
            res.status(400);
            throw new Error("Voucher not found or already used");
        }

        // Remove the redeemed voucher from the list
        user.redeemedVouchers.splice(voucherIndex, 1);

        // Subtract points for the voucher redemption
        user.points -= 100;  // Assuming 100 points for redemption, adjust as needed
        await user.save();  // Save the updated user data

        res.json({
            message: "Voucher redeemed and removed from list",
            points: user.points, // Send the updated points
            redeemedVouchers: user.redeemedVouchers, // Send the updated redeemed vouchers list
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
}));

// Konfigurasi Multer (Storage, File Filter)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Buat folder 'uploads' di root proyek
    },
    filename: function (req, file, cb) {
      // Gunakan userId dan timestamp untuk nama file unik.  Ini MENCEGAH overwrite.
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = file.originalname.split('.').pop(); // Get file extension
      cb(null, req.user.id + '-' + uniqueSuffix + '.' + ext);
    }
  });
  
  //Filter untuk memastikan hanya menerima image
  const fileFilter = (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
          cb(null, true);
      } else {
          cb(new Error('Not an image! Please upload only images.'), false);
      }
  };
  
  const upload = multer({ storage: storage, fileFilter: fileFilter });
  
  // Endpoint untuk upload foto profil
  userRoute.post('/upload-profile-picture', protect, upload.single('profilePicture'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      // Update user profile with the new picture URL
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Simpan path relatif ke file di database.
      //  'req.file.path' berisi path LENGKAP ke file yang diupload.
      //  Kita simpan path relatifnya agar lebih fleksibel.
      user.profilePicture = '/uploads/' + req.file.filename; // Simpan path RELATIF!
      await user.save();
  
      // Return the URL to the frontend
      res.status(200).json({
        message: 'Profile picture uploaded successfully',
        profilePictureUrl: user.profilePicture // Kirim URL RELATIF
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  
  // Endpoint untuk mendapatkan profil pengguna (TERMASUK URL foto profil)
  userRoute.get('/profile', protect, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);  // Kirim semua data user, TERMASUK profilePicture
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Endpoint untuk update profile (username, email, password)
  userRoute.put('/profile', protect, async (req, res) => {
      try {
          const { name, email, password } = req.body;
          const user = await User.findById(req.user.id);
  
          if (name) user.name = name;
          if (email) user.email = email;
          if (password) { // Consider hashing the password!
              // In a real application, you would hash the password before saving.
              // Example using bcrypt:
              // const salt = await bcrypt.genSalt(10);
              // user.password = await bcrypt.hash(password, salt);
  
              user.password = password; // VERY IMPORTANT: Hash passwords in production!
          }
  
          await user.save();
          res.status(200).json({ message: 'Profile updated successfully!' });
      } catch (error) {
           console.error(error);
          res.status(500).json({ message: 'Server error' });
      }
  });
  

module.exports = userRoute;
