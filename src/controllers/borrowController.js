const Borrow = require('../models/borrow');
const mongoose = require('mongoose');

// Mendapatkan semua data peminjaman buku yang masih aktif
exports.getActiveBorrows = async (req, res) => {
    try {
        const borrows = await Borrow.find({ returnedAt: null }).populate('bookId').populate('borrowerId');
        res.json(borrows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Menambahkan data peminjaman buku
exports.borrowBook = async (req, res) => {
    try {
        const borrowedAt = new Date(); // Tanggal peminjaman buku (sekarang)
        
        // Menghitung tanggal 1 bulan setelah peminjaman
        const expectedReturnedAt = new Date(borrowedAt);
        expectedReturnedAt.setMonth(borrowedAt.getMonth() + 1); // Menambahkan 1 bulan
        
        const borrow = new Borrow({
            _id: new mongoose.Types.ObjectId(),
            bookId: req.body.bookId,
            borrowerId: req.body.borrowerId,
            borrowedAt: borrowedAt,
            expectedReturnedAt: expectedReturnedAt // Set tanggal pengembalian yang diharapkan
        });
        
        await borrow.save();
        res.status(201).json(borrow);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const calculateFine = (expectedReturnedAt, returnedAt) => {
    const oneDay = 24 * 60 * 60 * 1000; 
    const diffTime = new Date(returnedAt) - new Date(expectedReturnedAt); // Selisih waktu antara pengembalian dan tenggat waktu
    const daysLate = Math.floor(diffTime / oneDay); // Menghitung jumlah hari keterlambatan

    if (daysLate > 0) {
        const finePerDay = 5000; // Denda per hari
        return daysLate * finePerDay; // Total denda
    }
    return 0; // Tidak ada denda jika tidak terlambat
}

// Menambahkan data pengembalian buku
exports.returnBook = async (req, res) => {
    try {
        const borrow = await Borrow.findById(req.body.borrowId);
        
        if (!borrow) return res.status(404).json({ message: "Data peminjaman tidak ditemukan" });
        
        // Menghitung denda
        const fine = calculateFine(borrow.expectedReturnedAt, new Date());
        
        // Update status pengembalian dan denda
        borrow.returnedAt = new Date();
        borrow.fine = fine; // Menyimpan denda pada data peminjaman
        
        // Simpan data peminjaman yang sudah diperbarui
        await borrow.save();
        
        res.json({
            message: "Buku berhasil dikembalikan",
            fine: fine,
            returnedAt: borrow.returnedAt,
            totalAmount: borrow.fine
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};