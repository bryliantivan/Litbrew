// Voucher Model (misalnya voucherModel.js)
const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    pointsRequired: {
        type: Number,
        required: true, // Jumlah poin yang diperlukan untuk menukarkan voucher
    },
    discountAmount: {
        type: Number,  // Jumlah diskon yang diberikan jika voucher digunakan
        default: 0,
    },
    expirationDate: {
        type: Date,  // Tanggal kadaluarsa voucher
    },
    isActive: {
        type: Boolean,
        default: true,  // Apakah voucher aktif untuk ditukarkan
    },
});

module.exports = mongoose.model('Vouchers', voucherSchema);
