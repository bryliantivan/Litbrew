const express = require("express");
const asyncHandler = require("express-async-handler");
const userRoute = express.Router();
const User = require("../Models/User");
const generateToken = require('../tokenGenerate');
const protect = require("../middleware/Auth");
const Voucher = require("../Models/Voucher");
const multer = require("multer");
const cloudinary = require("../cloudinaryConfig");
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs'); // For hashing passwords

// Create uploads directory if it doesn't exist
const uploadDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
    console.log('Uploads directory created');
}

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);  // Save files in 'uploads/' folder temporarily
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Ensure unique filenames
    }
});

// Multer file filter for validating image uploads
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter }).single('profilePicture'); // Expect a single 'profilePicture' field

// Cloudinary Upload Function
const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "litbrew_profile",  // Optional: Specify the folder in your Cloudinary account
        });
        return result.secure_url;  // Return the secure URL of the uploaded image
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw error;  // Handle error appropriately
    }
};

// Login route
userRoute.post('/login', asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                points: user.points,
                redeemedVouchers: user.redeemedVouchers,
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

        const existUser = await User.findOne({ email });
        if (existUser) {
            res.status(400);
            throw new Error("User already exists");
        } else {
            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(password, 10); 

            const user = await User.create({
                name,
                email,
                password: hashedPassword // Store hashed password
            });

            if (user) {
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    points: user.points,  
                    redeemedVouchers: user.redeemedVouchers,
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

// Update user profile (Auth protected) with profile picture upload
userRoute.put("/profile", protect, upload, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        // Update profile
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        // Hash password if provided
        if (req.body.password) {
            user.password = await bcrypt.hash(req.body.password, 10); // Hash the password
        }

        // Handle profile picture upload
        if (req.file) {
            const filePath = req.file.path;
            try {
                // Upload image to Cloudinary
                const imageUrl = await uploadToCloudinary(filePath);
                user.profilePicture = imageUrl;

                // Delete the temporary file after upload
                fs.unlinkSync(filePath);
            } catch (error) {
                console.error("Error uploading profile picture:", error);
                res.status(500);
                throw new Error("Error uploading profile picture");
            }
        }

        // Save profile changes
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            email: updatedUser.email,
            name: updatedUser.name,
            points: updatedUser.points,  
            redeemedVouchers: updatedUser.redeemedVouchers, 
            isAdmin: updatedUser.isAdmin,
            createdAt: updatedUser.createdAt,
            profilePicture: updatedUser.profilePicture, 
            token: generateToken(updatedUser._id) 
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
}));

// Redeem voucher
userRoute.put("/redeem", protect, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const { voucherCode } = req.body;

    if (user) {
        // Check if the voucher is already redeemed
        const voucherIndex = user.redeemedVouchers.indexOf(voucherCode);
        if (voucherIndex === -1) {
            res.status(400);
            throw new Error("Voucher not found or already used");
        }

        // Redeem the voucher
        user.redeemedVouchers.splice(voucherIndex, 1);
        user.points -= 100; 

        await user.save();

        res.json({
            message: "Voucher redeemed and removed from list",
            points: user.points,
            redeemedVouchers: user.redeemedVouchers,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
}));

module.exports = userRoute;
