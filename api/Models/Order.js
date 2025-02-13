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
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
    orderItems: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    voucher: { type: String},  // Ensure voucher is included
    location: { type: String, enum: ['arrived', 'not-arrived'] },
    numPeople: {
        type: Number,
        required: function() {
            return this.orderType === 'dine-in'; // Only required for dine-in
        },
    },
    orderType: { 
        type: String, 
        required: true, 
        enum: {
            values: ['dine-in', 'takeaway'],
            message: 'Invalid order type. It must be either "dine-in" or "takeaway"'
        }
    },
    tableNumber: {
        type: Number,
        required: function () {
            return this.orderType === 'dine-in'; // Ensure tableNumber is required for dine-in
        },
        min: 1,
    },
    orderStatus: {
        type: String,
        required: true,
        enum: ['confirm', 'processing', 'delivered'],
        default: 'confirm',
    },
    estimatedPickUpTime: {
        type: Date,
        validate: {
            validator: function (value) {
                // Only required if location is 'not-arrived'
                if (this.location === 'not-arrived' && !value) {
                    return false; // Return false if value is not provided
                }
                return true; // Otherwise, it's valid (no need for estimatedPickUpTime)
            },
            message: 'Estimated pickup time is required when location is not-arrived.',
        },
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
