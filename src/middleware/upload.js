const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Tentukan folder penyimpanan file
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Tentukan nama file dengan menambahkan timestamp untuk menghindari duplikasi
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Pastikan hanya menerima file gambar
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files are allowed.'));
    }
};

// Membuat instance multer dengan konfigurasi di atas
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // Maksimal 10MB per file
});

module.exports = upload;
