const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const multer = require("multer"); 


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'), 
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname) 
});
const upload = multer({ storage }); 

router.get('/books', bookController.getAllBooks);  
router.get('/book/:id', bookController.getBookById);  
router.post('/book', bookController.createBook);  
router.put('/book/:id', bookController.updateBook);  
router.delete('/book/:id', bookController.deleteBook);  
router.post('/book/upload', upload.single('coverImage'), bookController.uploadBookCover);  

module.exports = router;
