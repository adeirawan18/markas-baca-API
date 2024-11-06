// models/borrower.js
const mongoose = require('mongoose');

const borrowerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // Primary key
    name: { type: String, required: true }, // Nama borrower, wajib diisi
    joinAt: { type: Date, default: Date.now }, // Tanggal bergabung
});

module.exports = mongoose.model('Borrower', borrowerSchema);
