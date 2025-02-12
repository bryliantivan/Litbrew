const mongoose = require('mongoose');

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
        default: function () { return this.qty * this.price; }
    },
    note: { type: String },
});

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    paymentMethod: { type: String, required: true, default: "Cash" },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    }, isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
    orderItems: [{
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        note: { type: String },
    }],
    totalPrice: { type: Number, required: true },
    voucher: { type: String, required: true },  // Ensure voucher is included
    orderStatus: { type: String, enum: ['arrived', 'not-arrived'] },
    numPeople: { type: Number, required: true },  // Ensure numPeople is included for dine-in
    tableNumber: {
        type: Number,
        required: function () {
            return this.orderType === 'dine-in'; // Ensure tableNumber is required for dine-in
        },
        min: 1,
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
