const mongoose = require('mongoose')

const orderItemSchema = mongoose.Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, enum: ['Food', 'Drink', 'Book'] },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: function() { return this.qty * this.price; }  // Automatically calculate total price based on qty and price
    },
    note: { type: String },
})

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    orderItems: [orderItemSchema],
    paymentMethod: { type: String, required: true, default: "cash" },
    taxPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    orderType: {
        type: String,
        required: true,
        enum: ['takeaway', 'dine-in'],  // Pesanan bisa pilih takeaway atau dine-in
    },
    tableNumber: {
        type: Number,
        required: function() { return this.orderType === 'dine-in'; }, // Jika pesanan dine-in, nomor meja diperlukan
        min: 1, // Validasi untuk nomor meja (misalnya, meja harus lebih dari 0)
    },
    estimatedPickupTime: {
        type: Date,
        required: function() { return this.orderType === 'takeaway'; },  // Estimasi waktu pickup hanya diperlukan untuk takeaway
    },
    location:{
        type: String,
        required: true,
        enum:['Arrived', 'Not arrived'],
    }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
