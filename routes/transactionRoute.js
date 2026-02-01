const express = require("express");
const {
  addTransaction,
  getAllTransactions,
  editTransaction,
  deleteTransaction,
  addTransfer,
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/add-transaction", addTransaction);
router.post("/add-transfer", addTransfer); 
router.post("/edit-transaction", editTransaction);
router.post("/delete-transaction", deleteTransaction);
router.post("/get-transaction", getAllTransactions);

module.exports = router;
