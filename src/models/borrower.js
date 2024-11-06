// models/borrower.js
const mongoose = require('mongoose');

const borrowerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true }, 
    joinAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('Borrower', borrowerSchema);
