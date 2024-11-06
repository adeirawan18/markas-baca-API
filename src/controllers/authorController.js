const Author = require("../models/author");
const mongoose = require('mongoose');

// Get all authors
exports.getAuthors = async (req, res) => {
    try {
        const authors = await Author.find({deletedAt: null});
        res.json(authors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get author by ID
exports.getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id, {deletedAt: null});
        if (!author) return res.status(404).json({ message: "Data penulis tidak ditemukan" });
        res.json(author);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create data author
exports.createAuthor = async (req, res) => {
    try {
        const author = new Author({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await author.save();
        res.status(201).json(author);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update data author
exports.updateAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndUpdate(req.params.id, { 
            name: req.body.name,
            updatedAt: new Date()
        }, { new: true });
        
        if (!author) return res.status(404).json({ message: "Data penulis tidak ditemukan" });
        res.json(author);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete author
exports.deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndUpdate(req.params.id, { deletedAt: new Date() }, { new: true });
        if (!author) return res.status(404).json({ message: "Data penulis tidak ditemukan" });
        res.json({ message: "Data penulis berhasil dihapus", data: author });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
