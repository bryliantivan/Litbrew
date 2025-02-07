const moongose = require("mongoose")

// const reviewSchema = new moongose.Schema({
//     name: { Type: String, required: true },
//     rating: { type: Number, required: true },
//     comment: { type: String, required: true },
//     user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
// });

const productSchema = new moongose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
        rating: { type: Number, required: true, default: 0 },
        numReview: { type: Number, required: true, default: 0 },
        price: { type: Number, required: true, default: 0 },
        countInStock: { type: Number, required: true, default: 0 },
        category: { 
            type: String, 
            required: true, 
            enum: ['Food', 'Drink', 'Book'] 
        } 
        // review: [reviewSchema],
    }
)

module.exports = moongose.model("Product", productSchema);