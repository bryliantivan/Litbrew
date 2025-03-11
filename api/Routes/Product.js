const express = require("express");
const productRoute = express.Router();
const asyncHandler = require("express-async-handler");
const Product = require("../Models/Product");
const protect = require("../middleware/Auth");
const cloudinary = require("../cloudinaryConfig");
const multer = require("multer");
const fs = require('fs');
const path = require('path');

// Create uploads directory if it doesn't exist
const uploadDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
    console.log('Uploads directory created');
}

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);  // Save files in 'uploads/' folder temporarily
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Ensure unique filenames
    }
});

const upload = multer({ storage: storage }).single('image');  // Expect a single 'image' field

const uploadToCloudinary = async (filePath) => {
    const folderName = 'product_images';  // Can dynamically change based on category or product
    const result = await cloudinary.uploader.upload(filePath, {
        folder: folderName,
    });
    return result.secure_url;
};

// Route for adding a new product
productRoute.post("/", upload, asyncHandler(async (req, res) => {
    const { name, description, price, category, countInStock, rating, numReview } = req.body;

    // Upload the image to Cloudinary and get URL
    let imageUrl = '';
    if (req.file) {
        try {
            imageUrl = await uploadToCloudinary(req.file.path); // Upload the image and get the URL
        } catch (error) {
            return res.status(500).json({ message: "Image upload failed", error });
        }
    }

    // Create a new product with the Cloudinary URL
    const newProduct = new Product({
        name,
        description,
        price,
        category,
        countInStock,
        rating,
        numReview,
        image: imageUrl,  // Store the image URL (first image)
    });

    await newProduct.save();
    res.status(201).json({
        message: 'Product added successfully!',
        product: newProduct
    });
}));

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

productRoute.put("/:id", upload, asyncHandler(async (req, res) => {
    const { name, description, price, countInStock, category, rating, numReview } = req.body;

    // Find the product by ID
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    // Update the product fields with the new values
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.countInStock = countInStock || product.countInStock;
    product.category = category || product.category;
    product.rating = rating || product.rating;
    product.numReviews = numReview || product.numReviews;

    // Handle image via Cloudinary
    if (req.file) {
        try {
            // Delete the old image from Cloudinary (if it exists)
            if (product.image) {
                const imagePublicId = product.image.split('/').pop().split('.')[0]; // Get the public ID of the image
                await cloudinary.uploader.destroy(imagePublicId); // Delete old image
            }

            // Upload new image to Cloudinary
            const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
                folder: 'product_images', // Store in the 'product_images' folder on Cloudinary
            });

            // Store the new image URL in the product document
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
            // Hitung jumlah unik user yang memberikan review
            const uniqueUsers = new Set(product.reviews.map(review => review.user.toString()));
            product.numReviews = uniqueUsers.size;

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
