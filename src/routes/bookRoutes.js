const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const multer = require("multer"); // Menggunakan multer untuk file upload

// Konfigurasi multer untuk menyimpan file upload di folder "uploads/"
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'), // Lokasi penyimpanan file
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname) // Menyusun nama file berdasarkan waktu
});
const upload = multer({ storage }); // Gunakan konfigurasi ini untuk upload file

// Routes untuk Buku
router.get('/books', bookController.getAllBooks);  // Mendapatkan semua buku
router.get('/book/:id', bookController.getBookById);  // Mendapatkan buku berdasarkan ID
router.post('/book', bookController.createBook);  // Membuat buku baru
router.put('/book/:id', bookController.updateBook);  // Memperbarui buku berdasarkan ID
router.delete('/book/:id', bookController.deleteBook);  // Menghapus buku berdasarkan ID
router.post('/book/upload', upload.single('coverImage'), bookController.uploadBookCover);  // Mengupload gambar sampul buku

module.exports = router;
