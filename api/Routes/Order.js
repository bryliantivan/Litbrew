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
    const { orderItems, paymentMethod, taxPrice, totalPrice, note, orderType, tableNumber, orderStatus, numPeople } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items found");
    }

    // Validasi orderType untuk dine-in atau takeaway
    if (!orderType || (orderType === 'dine-in' && !tableNumber)) {
      res.status(400);
      throw new Error("Table number is required for dine-in orders");
    }

    const order = new Order({
      orderItems,
      paymentMethod,
      taxPrice,
      totalPrice,
      user: req.user._id,
      note,
      orderType,  // Menyimpan jenis pesanan (takeaway/dine-in)
      tableNumber,  // Menyimpan nomor meja untuk dine-in
      orderStatus,  // Menyimpan status pesanan
      numPeople,  // Menyimpan jumlah orang untuk dine-in
      isPaid: false,  // Set isPaid menjadi false, jika belum dibayar
      paidAt: null,  // Set waktu pembayaran menjadi null
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
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
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      // Tambahkan poin ke pengguna berdasarkan totalPrice pesanan
      const pointsEarned = Math.floor(order.totalPrice / 10); // Misalnya, 1 poin untuk setiap 10 unit order
      const user = await User.findById(order.user);

      if (user) {
        user.points += pointsEarned; // Tambahkan poin ke pengguna
        await user.save();
      } else {
        res.status(404);
        throw new Error("User Not Found");
      }

      // Simpan pesanan yang diperbarui dan kirim respons
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

module.exports = orderRoute;
