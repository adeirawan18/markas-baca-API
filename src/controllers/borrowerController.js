const Borrower = require('../models/borrower');
const mongoose = require('mongoose');

// Mendapatkan semua data peminjam
exports.getAllBorrowers = async (req, res) => {
    try {
        const borrowers = await Borrower.find();
        res.json(borrowers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mendapatkan detail data peminjam berdasarkan ID
exports.getBorrowerById = async (req, res) => {
    try {
        const borrower = await Borrower.findById(req.params.id);
        if (!borrower) return res.status(404).json({ message: "Data peminjam tidak ditemukan" });
        res.json(borrower);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Menambahkan data peminjam baru
exports.createBorrower = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({ message: "Nama peminjam wajib diisi" });
        }

        const borrower = new Borrower({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name, // Menyertakan nama borrower
            joinAt: new Date(),
        });

        await borrower.save();
        res.status(201).json(borrower);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mengupdate data peminjam berdasarkan ID
exports.updateBorrower = async (req, res) => {
    try {
        const borrower = await Borrower.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!borrower) return res.status(404).json({ message: "Data peminjam tidak ditemukan" });
        res.json(borrower);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Menghapus data peminjam berdasarkan ID
exports.deleteBorrower = async (req, res) => {
    try {
        const borrower = await Borrower.findByIdAndDelete(req.params.id);
        if (!borrower) return res.status(404).json({ message: "Data peminjam tidak ditemukan" });
        res.json({ message: "Data peminjam berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
