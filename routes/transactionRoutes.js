const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const { ensureAuth } = require("../middlewares/auth");

// Apply auth to all routes
router.use(ensureAuth);

// CRUD routes
router.get("/", transactionController.getAllTransactions);
router.get("/api", transactionController.getTransactionsAPI);
router.get("/add", transactionController.renderAddTransaction);
router.post("/add", transactionController.addTransaction);
router.get("/edit/:id", transactionController.renderEditTransaction);
router.post("/edit/:id", transactionController.updateTransaction);
router.post("/delete/:id", transactionController.deleteTransaction);

module.exports = router;
