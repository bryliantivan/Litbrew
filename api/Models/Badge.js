const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema(
    {
        color: { type: String, required: true },
        name: { type: String, required: true },
        orderCount: { type: Number, required: true }, // Number of orders needed to unlock this badge
        image: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

// Menambahkan indeks pada 'orderCount' untuk meningkatkan performa query
badgeSchema.index({ orderCount: 1 });

module.exports = mongoose.model('Badge', badgeSchema);
