const router = require("express").Router();
const Product = require("./Models/Product");
const User = require("./Models/User");
const product = require("./data/Product");
const users = require("./data/Users");
const asyncHandler = require('express-async-handler');


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

module.exports = router;