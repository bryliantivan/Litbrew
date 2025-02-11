const express = require("express");
const orderRoute = express.Router();
const protect = require("../middleware/Auth");
const isAdmin = require("../middleware/isAdmin");
const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");

// Create a new order
orderRoute.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      paymentMethod,
      taxPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items found");
    } else {
      const order = new Order({
        orderItems,
        paymentMethod,
        taxPrice,
        totalPrice,
        user: req.user._id,
        note: req.body.note,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  })
);

// Get order by ID
orderRoute.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

// Update order to paid (only admin can validate payment)
orderRoute.put(
  "/:id/pay",
  protect,
  isAdmin,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
      const updatedOrder = await order.save();

      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

// Get logged in user orders
orderRoute.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404);
      throw new Error("Orders Not Found");
    }
  })
);

module.exports = orderRoute;