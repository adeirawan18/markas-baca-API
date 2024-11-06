const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // Primary key
    name: { type: String, required: true }, // Nama kategori
    createdAt: { type: Date, default: Date.now }, // Waktu data dibuat
    updatedAt: { type: Date, default: Date.now }, // Waktu data diperbarui
    deletedAt: { type: Date } // Waktu data dihapus (opsional)
});

module.exports = mongoose.model('Category', categorySchema);
