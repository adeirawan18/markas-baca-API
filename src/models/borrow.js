const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    borrowerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Borrower', required: true },
    borrowedAt: { type: Date, required: true },
    expectedReturnedAt: { type: Date, required: true },
    returnedAt: { type: Date }, 
    fine: { type: Number, default: 0 } 
});

module.exports = mongoose.model('Borrow', borrowSchema);
