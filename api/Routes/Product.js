const express = require("express");
const productRoute = express.Router();
const asyncHandler = require("express-async-handler");
const Product = require("../Models/Product");
const protect = require("../middleware/Auth");

productRoute.get("/", asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
}))

productRoute.get("/:id", asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
}))

productRoute.post(
    "/:id/review",
    protect,
    asyncHandler(async (req, res) => {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            // Check if the user has already reviewed
            const alreadyReviewed = product.reviews.find(
                (review) => review.user.toString() === req.user._id.toString()
            );

            if (alreadyReviewed) {
                // If review exists, update the review
                alreadyReviewed.rating = Number(rating);
                alreadyReviewed.comment = comment;
            } else {
                // Otherwise add a new review
                const review = {
                    name: req.user.name,
                    rating: Number(rating),
                    comment,
                    user: req.user._id,
                };

                product.reviews.push(review);
            }

            product.numReviews = product.reviews.length;

            // Recalculate average rating
            const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
            product.rating = totalRating / product.reviews.length;

            await product.save();
            res.status(201).json({ message: "Review submitted successfully" });
        } else {
            res.status(404);
            throw new Error("Product not found");
        }
    })
);


module.exports = productRoute;
