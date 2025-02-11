const express = require('express');
const Voucher = require("../Models/Voucher")
const asyncHandler = require('express-async-handler');

const voucherRoute = express.Router();

// Get all available vouchers
voucherRoute.get(
    "/",
    asyncHandler(async (req, res) => {
        const vouchers = await Voucher.find({ isActive: true }).sort({ expirationDate: 1 });
        if (vouchers) {
            res.status(200).json(vouchers);
        } else {
            res.status(404).json({ message: "No active vouchers found." });
        }
    })
);

// Redeem voucher route
voucherRoute.post(
    "/redeem",
    asyncHandler(async (req, res) => {
        const { userId, voucherId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const voucher = await Voucher.findById(voucherId);
        if (!voucher || !voucher.isActive) {
            res.status(404).json({ message: "Voucher not available" });
            return;
        }

        if (user.points >= voucher.pointsRequired) {
            user.points -= voucher.pointsRequired;
            await user.save();

            user.redeemedVouchers = user.redeemedVouchers || [];
            user.redeemedVouchers.push(voucher);
            await user.save();

            res.status(200).json({ message: "Voucher redeemed successfully", voucher });
        } else {
            res.status(400).json({ message: "Not enough points to redeem this voucher" });
        }
    })
);

module.exports = voucherRoute;
