const express = require("express");
const userRoute = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../Models/User");
const generateToken = require('../tokenGenerate');
const protect = require("../middleware/Auth");

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
)

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
                    _id: user.id,
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
)

// Get user profile data (Auth protected)
userRoute.get("/profile", protect, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            email: user.email,
            name: user.name,
            points: user.points,  // Menampilkan poin pengguna
            redeemedVouchers: user.redeemedVouchers,  // Menampilkan voucher yang telah ditebus
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
}))

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

module.exports = userRoute;
