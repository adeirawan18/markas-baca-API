const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },  
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    coverImage: { type: String } 
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
