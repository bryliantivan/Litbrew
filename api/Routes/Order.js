const express = require("express");
const orderRoute = express.Router();
const protect = require("../middleware/Auth");
const asyncHandler = require("express-async-handler");
const Order = require("../Models/Order");
const User = require("../Models/User");
const Badge = require("../Models/Badge");
const Product = require("../Models/Product");

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
      voucher, // ID voucher yang digunakan
      location,
      estimatedPickUpTime,
      customerName,
    } = req.body;

    // Validation
    if (!orderItems || !orderItems.length) {
      res.status(400);
      throw new Error("No items in the order.");
    }

    // Create a new order
    const order = new Order({
      orderItems,
      paymentMethod,
      taxPrice,
      totalPrice,
      user: req.user._id,
      note,
      orderType,
      tableNumber,
      location,
      numPeople,
      voucher, // Simpan ID voucher yang digunakan di order
      isPaid: false,
      paidAt: null,
      orderStatus,
      estimatedPickUpTime,
      isReviewed: false,
      customerName,
      bookStatus: 'borrowed', // Set default book status to borrowed
    });

    // Save the order
    const createdOrder = await order.save();

    // Loop through each order item to decrease the countInStock of the product
    for (let item of orderItems) {
      const product = await Product.findById(item.product); // Find the product by ID
      if (product) {
        if (product.countInStock >= item.qty) {
          product.countInStock -= item.qty; // Decrease stock based on quantity ordered
          await product.save(); // Save the updated product
        } else {
          res.status(400);
          throw new Error(`Insufficient stock for product ${product.name}`);
        }
      } else {
        res.status(404);
        throw new Error("Product not found");
      }
    }

    // Increment orderCount and update badges
    const user = await User.findById(req.user._id);
    if (user) {
      user.orderCount += 1; // Increment the order count

      // Jika voucher digunakan, hapus dari redeemedVouchers
      if (voucher) {
        user.redeemedVouchers.pull(voucher); // Hapus voucher dari array
      }

      await user.updateBadges(Badge); // Update badges
      await user.save(); // Save the updated user
    }

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
  protect,
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

        const pointsToAdd = Math.round(order.totalPrice * 0.001);
        const user = await User.findById(order.user);

        if (user) {
          user.points += pointsToAdd; // Add points to the user's account
          await user.save(); // Save the updated user with the new points

          // Ensure redeemedVoucher is initialized as an array if it's undefined
          if (!user.redeemedVoucher) {
            user.redeemedVoucher = []; // Initialize as an empty array if it's undefined
          }

          // If the order has a voucher, remove it from the user's redeemedVoucher
          if (order.voucher) {
            console.log("Checking if voucher exists in redeemedVoucher...");

            const voucherIndex = user.redeemedVoucher.indexOf(order.voucher);
            console.log("Voucher index:", voucherIndex);

            if (voucherIndex !== -1) {
              user.redeemedVoucher.splice(voucherIndex, 1); // Remove the voucher from redeemedVoucher
              console.log("Voucher removed, updating user...");

              await user.save(); // Save the updated user after removing the voucher
              console.log("User updated:", user);
            } else {
              console.log("Voucher not found in redeemedVoucher.");
            }
          }
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

// Return book (Update stock)
orderRoute.put(
  "/:id/return", // Route for returning books
  asyncHandler(async (req, res) => {
    const { id } = req.params;  // Get the orderId from request params

    // Find the order by ID
    const order = await Order.findById(id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;  // Exit early if order is not found
    }

    // Ensure the order has 'borrowed' items
    if (order.orderStatus !== 'delivered') {
      res.status(400).json({ message: "This order cannot be returned as it is not delivered." });
      return;
    }

    // Process the order return (e.g., update the stock, change order status)
    for (let item of order.orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.countInStock += item.qty;  // Increase stock based on quantity returned
        await product.save(); // Save the updated product
      }
    }

    // Mark the order as returned and update bookStatus for each book item
    order.bookStatus = 'returned'; // Set book status to 'returned'
    const updatedOrder = await order.save();  // Save the updated order

    res.status(200).json(updatedOrder);  // Respond with the updated order details
  })
);


module.exports = orderRoute;
