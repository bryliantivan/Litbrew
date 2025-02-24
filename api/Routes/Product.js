const express = require("express");
const productRoute = express.Router();
const asyncHandler = require("express-async-handler");
const Product = require("../Models/Product");
const protect = require("../middleware/Auth");
const cloudinary = require("../cloudinaryConfig");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify where to store the uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Ensure unique filenames
    },
});

// Apply multer middleware for handling form data
const upload = multer({ storage: storage });

productRoute.get("/", asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
}))

productRoute.get("/:id", asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
}));


productRoute.post('/add', async (req, res) => {
    const { name, price, description, stock, category, imageFilename } = req.body;

    const newProduct = new Product({
        name,
        price,
        description,
        stock,
        category,
        image: imageFilename, // Store the filename from GridFS
    });

    try {
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
});

productRoute.put("/:id", upload.array('images'), asyncHandler(async (req, res) => {
    const { name, description, price, stock, category, rating, numReview } = req.body;

    // Find the product by ID
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    // Update the product fields with the new values
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.category = category || product.category;
    product.rating = rating || product.rating;
    product.numReview = numReview || product.numReview;

    // Handle images via Cloudinary
    if (req.files && req.files.length > 0) {
        try {
            const uploadResponse = await cloudinary.uploader.upload(req.files[0].path, {
                folder: 'product_images', // Store in the 'product_images' folder on Cloudinary
            });

            product.image = uploadResponse.secure_url;  // Store Cloudinary image URL
        } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
            return res.status(500).json({ message: "Image upload failed", error });
        }
    }

    // Save updated product to the database
    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
}));



productRoute.delete(
    "/:id",
    protect, // Ensure that only authenticated users can delete the product
    asyncHandler(async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }

            // Ensure the user is an admin or has permission to delete
            if (!req.user.isAdmin) {
                res.status(403).json({ message: 'Forbidden: You do not have permission to delete this product' });
                return;
            }

            // Delete the product
            await Product.findByIdAndDelete(req.params.id);  // This replaces product.remove()

            res.status(200).json({ message: 'Product removed successfully' });
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    })
);

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
