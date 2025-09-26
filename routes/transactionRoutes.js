const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const { ensureAuth } = require("../middlewares/auth");

router.use(ensureAuth);

router.get("/", transactionController.getAllTransactions);
router.get("/api", transactionController.getTransactionsAPI);
router.get("/add", transactionController.renderAddTransaction);
router.post("/add", transactionController.addTransaction);
router.get("/edit/:id", transactionController.renderEditTransaction);
router.post("/edit/:id", transactionController.updateTransaction);
router.post("/delete/:id", transactionController.deleteTransaction);
router.get("/type/:type", transactionController.getTransactionsByType);

module.exports = router;
