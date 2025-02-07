const express = require("express");
const orderRoute = express.Router();
const asyncHandler = require("express-async-handler");
const protect = require("../middleware/Auth");
const Order = require("../Models/Order");

orderRoute.post(
    "/",
    protect,
    asyncHandler(async (req, res) => {
        const {
            orderItems,
            paymentMethods,
            taxPrice,
            totalPrice,
            price,
        } = req.body;
        console.log(orderItems)

        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error("no order items found");
        } else {
            const order = new Order({
                orderItems,
                paymentMethods,
                taxPrice,
                totalPrice,
                price,
                user: req.user._id,
            });
            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    })
);

module.exports = orderRoute;