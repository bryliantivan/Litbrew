const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
    },
    {
        timestamps: true,
    }
);

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
        rating: { type: Number, required: true, default: 0 },
        numReviews: { type: Number, required: true, default: 0 },
        price: { type: Number, required: true, default: 0 },
        countInStock: { type: Number, required: true, default: 0 },
        category: {
            type: String,
            required: true,
            enum: ['Food', 'Drink', 'Book']
        },
        reviews: [reviewSchema], // Enable reviews array
    },
    {
        timestamps: true,
    }
);

// Add method to calculate average rating
productSchema.methods.calculateAverageRating = function () {
    if (this.reviews.length === 0) {
        this.rating = 0;
        this.numReviews = 0;
    } else {
        this.rating =
            this.reviews.reduce((sum, review) => sum + review.rating, 0) /
            this.reviews.length;
        this.numReviews = this.reviews.length;
    }
};

module.exports = mongoose.model("Product", productSchema);