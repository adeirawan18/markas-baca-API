const Author = require("../models/author");
const mongoose = require('mongoose');

const multer = require('multer'); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  
    }
});

const upload = multer({ storage: storage });

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
        const author = await Author.findById(req.params.id );
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

exports.uploadAuthorProfileImage = [
    upload.single('profileImage'),  
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "Profile image is required" });
            }

            const authorId = req.body.authorId;  
            const profileImagePath = req.file.path;  

            
            const author = await Author.findById(authorId);
            if (!author) {
                return res.status(404).json({ message: "Author not found" });
            }

            
            author.profileImage = profileImagePath;
            await author.save();

            res.status(200).json({
                message: "Profile image updated successfully",
                author: author
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
];

