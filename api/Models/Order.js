const mongoose = require('mongoose')

const orderItemSchema = mongoose.Schema({
    name: {type: String, required: true},
    qty: {type: Number, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true, enum: ['Food', 'Drink', 'Book'] },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
})

const orderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    orderItems: [orderItemSchema],
    paymentMethod: {type:String, required:true, default:"cash"},
    taxPrice: {type: Number, required:true, default:0.0},
    totalPrice: {type:Number, required: true, default:0.0},
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {type:Date},
    isDelivered: {type: Boolean, required: true, default: false}
}, {timestamps: true}
)

module.exports = mongoose.model('Order', orderSchema)