const express = require("express");
const router = express.Router();
const borrowController = require("../controllers/borrowController");

router.post('/borrow/book', borrowController.borrowBook);
router.get('/borrow/book/list', borrowController.getActiveBorrows);
router.post('/borrow/book/return', borrowController.returnBook);

module.exports = router;
