const Book = require('../models/book');
const mongoose = require('mongoose');

// Mendapatkan semua buku
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()
            .populate('author')  // Populate author
            .populate('category');  // Populate category
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mendapatkan detail buku berdasarkan ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author').populate('category');
        if (!book) return res.status(404).json({ message: "Buku tidak ditemukan" });
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Menambahkan buku baru
exports.createBook = async (req, res) => {
    try {
        const book = new Book({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            description: req.body.description,
            summary: req.body.summary,
            authorId: req.body.authorId,
            category: req.body.categoryId,
        });
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mengupdate buku berdasarkan ID
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            summary: req.body.summary,
            authorId: req.body.authorId,
            category: req.body.categoryId,
        }, { new: true });
        
        if (!book) return res.status(404).json({ message: "Buku tidak ditemukan" });
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Menghapus buku berdasarkan ID
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: "Buku tidak ditemukan" });
        res.json({ message: "Buku berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.uploadBookCover = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Cover image is required" });
        }

        const bookId = req.body.bookId;
        const coverImagePath = req.file.path; // Path file yang sudah di-upload

        // Mencari buku berdasarkan bookId
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Memperbarui data buku dengan cover image path
        book.coverImage = coverImagePath;
        await book.save();

        res.status(200).json({
            message: "Cover image updated successfully",
            book: book
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
