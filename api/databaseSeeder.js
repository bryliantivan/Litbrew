const router = require("express").Router();
const Product = require("./Models/Product");
const User = require("./Models/User");
const product = require("./data/Product");
const users = require("./data/Users");
const asyncHandler = require('express-async-handler');
const voucher = require("./data/Voucher");
const Voucher = require("./Models/Voucher");


router.post('/users', asyncHandler(
    async (req, res) => {
        await User.deleteMany({});
        const UserSeeder = await User.insertMany(users);
        res.send({ UserSeeder });
    }
)
)

router.post('/Product', asyncHandler(
    async (req, res) => {
        await Product.deleteMany({});
        const ProductSeeder = await Product.insertMany(product);
        res.send({ ProductSeeder });
    }))


router.post('/Vouchers', asyncHandler(
    async (req, res) => {
        await Voucher.deleteMany({});
        const voucherSeeder = await Voucher.insertMany(voucher);
        res.send({ voucherSeeder });
    }))
module.exports = router;