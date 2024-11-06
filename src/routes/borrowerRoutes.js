const express = require("express");
const router = express.Router();
const borrowerController = require("../controllers/borrowerController");

router.get('/borrowers', borrowerController.getAllBorrowers);
router.get('/borrower/:id', borrowerController.getBorrowerById);
router.post('/borrower', borrowerController.createBorrower);
router.put('/borrower/:id', borrowerController.updateBorrower);
router.delete('/borrower/:id', borrowerController.deleteBorrower);

module.exports = router;
