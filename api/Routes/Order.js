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
      customerName
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
      customerName
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

// Update order status (orderStatus)
orderRoute.put(
  "/:id/status",
  protect,  // Pastikan hanya pengguna terotorisasi yang bisa mengubah status
  asyncHandler(async (req, res) => {
    const { orderStatus } = req.body;  // Ambil status baru dari body request
    
    // Validasi status yang valid
    if (!["confirm", "processing", "delivered"].includes(orderStatus)) {
      res.status(400);
      throw new Error("Invalid order status. It must be 'confirm', 'processing', or 'delivered'.");
    }

    const order = await Order.findById(req.params.id);

    if (order) {
      // Perbarui status pesanan
      order.orderStatus = orderStatus;
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

orderRoute.put(
  "/:id/pay",
  protect, // Ensure only authorized users can make a payment
  asyncHandler(async (req, res) => {
    const { isPaid } = req.body; // Get the payment status (true/false) from the request body
    
    if (typeof isPaid !== "boolean") {
      res.status(400);
      throw new Error("Invalid payment status. It must be a boolean (true/false).");
    }

    const order = await Order.findById(req.params.id);

    if (order) {
      // Update the payment status of the order
      order.isPaid = isPaid;
      
      if (isPaid) {
        order.paidAt = Date.now(); // Set the payment date if the order is paid
        
        // Calculate 5% of the total price and add it to the user's points
        const pointsToAdd = Math.round(order.totalPrice * 0.05); // 5% of the total price
        const user = await User.findById(order.user); // Find the user who placed the order
        
        if (user) {
          user.points += pointsToAdd; // Add points to the user's account
          await user.save(); // Save the updated user with the new points
        }

      } else {
        order.paidAt = null; // Reset the payment date if the order is not paid
      }

      const updatedOrder = await order.save(); // Save the updated order
      res.status(200).json(updatedOrder); // Respond with the updated order details
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
