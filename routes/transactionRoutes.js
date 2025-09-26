const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const { ensureAuth } = require("../middlewares/auth");

// Apply authentication middleware to all transaction routes
router.use(ensureAuth);

// Transaction routes
router.get("/", transactionController.getAllTransactions);
router.get("/add", transactionController.renderAddTransaction);
router.post("/add", transactionController.addTransaction);
router.get("/edit/:id", transactionController.renderEditTransaction);
router.post("/edit/:id", transactionController.updateTransaction);
router.post("/delete/:id", transactionController.deleteTransaction);
router.get("/type/:type", transactionController.getTransactionsByType);

module.exports = router;
