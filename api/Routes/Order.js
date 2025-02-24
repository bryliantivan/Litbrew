const express = require("express");
const orderRoute = express.Router();
const protect = require("../middleware/Auth");
const asyncHandler = require("express-async-handler");
const Order = require("../Models/Order");
const User = require("../Models/User");

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
      note,
      orderType,
      tableNumber,
      orderStatus,
      numPeople,
      voucher,
      location,
      estimatedPickUpTime,  // Make sure this is included in the request body
    } = req.body;

    // Validation
    if (!orderItems || !orderItems.length) {
      res.status(400);
      throw new Error("No items in the order.");
    }

    if (!orderType || !["dine-in", "takeaway"].includes(orderType)) {
      res.status(400);
      throw new Error("Invalid order type. It must be either 'dine-in' or 'takeaway'.");
    }

    if (orderType === "dine-in" && !tableNumber) {
      res.status(400);
      throw new Error("Table number is required for dine-in orders.");
    }

    if (!orderStatus || !["confirm", "processing", "delivered"].includes(orderStatus)) {
      res.status(400);
      throw new Error("Invalid order status. It must be 'confirm', 'processing', or 'delivered'.");
    }

    if (!location || !["arrived", "not-arrived"].includes(location)) {
      res.status(400);
      throw new Error("Invalid location status. It must be 'arrived' or 'not-arrived'.");
    }

    if (location === "not-arrived" && !estimatedPickUpTime) {
      res.status(400);
      throw new Error("Estimated pickup time is required when location is 'not-arrived'.");
    }

    // Create a new order
    const order = new Order({
      orderItems,
      paymentMethod,
      taxPrice,
      totalPrice,
      user: req.user._id,
      note,
      orderType, // Menyimpan jenis pesanan (takeaway/dine-in)
      tableNumber, // Menyimpan nomor meja untuk dine-in
      location, // Menyimpan status pesanan
      numPeople, // Menyimpan jumlah orang untuk dine-in
      voucher,
      isPaid: false, // Set isPaid menjadi false, jika belum dibayar
      paidAt: null, // Set waktu pembayaran menjadi null
      orderStatus,
      estimatedPickUpTime, // Ensure this is saved as well
      isReviewed: false, // Set isReviewed menjadi false, jika belum direview
    });

    // Save the order
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  })
);

// Get all orders for a user
orderRoute.get(
  "/myorders",
  protect,
  asyncHandler(async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user._id })
        .sort({ createdAt: -1 }) // Sort by newest first
        .populate("user", "name email");

      if (orders) {
        res.status(200).json(orders);
      } else {
        res.status(404);
        throw new Error("No orders found");
      }
    } catch (error) {
      res.status(500);
      throw new Error("Error fetching orders: " + error.message);
    }
  })
);

// Get order by ID
orderRoute.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

// Update order to paid (no admin validation needed)
orderRoute.put(
  "/:id/pay",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      // Set order as paid
      order.isPaid = true;
      order.paidAt = Date.now();
      order.orderStatus = "processing"; // Update order status to processing
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      // Add points to the user based on the total price of the order
      const pointsEarned = Math.floor(order.totalPrice / 10); // Example: 1 point for every 10 units of the order
      const user = await User.findById(order.user);

      if (user) {
        user.points += pointsEarned; // Add points to the user
        await user.save();
      } else {
        res.status(404);
        throw new Error("User Not Found");
      }

      // Save the updated order and send the response
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

// Get all orders (Admin or authorized user only)
orderRoute.get(
  "/",
  protect, // Add authorization check here
  asyncHandler(async (req, res) => {
    try {
      // Admin or authorized user check (Optional)
      // You can check for an admin or other roles if needed here
      // Example: if (!req.user.isAdmin) { ... } 
      
      const orders = await Order.find()
        .sort({ createdAt: -1 }) // Sort by newest first
        .populate("user", "name email");

      if (orders.length) {
        res.status(200).json(orders);
      } else {
        res.status(404);
        throw new Error("No orders found");
      }
    } catch (error) {
      res.status(500);
      throw new Error("Error fetching orders: " + error.message);
    }
  })
);


orderRoute.put(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      // Ensure the order belongs to the logged-in user
      if (order.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("Not authorized to review this order");
      }
      // Check if the order has already been reviewed
      if (order.isReviewed) {
        res.status(400);
        throw new Error("Order already reviewed");
      }
      // Mark the order as reviewed
      order.isReviewed = true;
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);


module.exports = orderRoute;
