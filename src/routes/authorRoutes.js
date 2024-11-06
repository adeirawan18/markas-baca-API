const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'), 
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname) 
});
const upload = multer({ storage: storage });

router.get("/authors", authorController.getAuthors);
router.get("/author/:id", authorController.getAuthorById);
router.post("/author", authorController.createAuthor);
router.put("/author/:id", authorController.updateAuthor);
router.delete("/author/:id", authorController.deleteAuthor);
router.post("/author/upload", upload.single('profileImage'), authorController.uploadAuthorProfileImage);


module.exports = router;
