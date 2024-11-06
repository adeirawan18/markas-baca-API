const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    name: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }, 
    deletedAt: { type: Date } 
});

module.exports = mongoose.model('Author', authorSchema);
