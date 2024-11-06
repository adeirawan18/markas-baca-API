const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }, 
    summary: { type: String, required: true },    
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },  
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true}, 
    createdAt: { type: Date, default: Date.now, required: true },
    updatedAt: { type: Date, default: Date.now, required: true },
    coverImage: { type: String },  
    deletedAt: { type: Date, default: null }       
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
