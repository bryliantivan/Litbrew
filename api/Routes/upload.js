const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig'); // Import Cloudinary config
const Product = require('../Models/Product');

const router = express.Router();

// Multer setup for handling image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to upload image to Cloudinary and store the URL in MongoDB
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Extract image URL from the result
    const imageUrl = result.secure_url;

    // Store the product with the Cloudinary image URL
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock,
      category: req.body.category,
      image: imageUrl, // Store the Cloudinary image URL
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error });
  }
});

module.exports = router;
