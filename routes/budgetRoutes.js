const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budgetController");
const { ensureAuth } = require("../middlewares/auth");

// Apply authentication middleware to all budget routes
router.use(ensureAuth);

// Budget routes
router.get("/", budgetController.getAllBudgets);
router.get("/add", budgetController.renderAddBudget);
router.post("/add", budgetController.addBudget);
router.get("/edit/:id", budgetController.renderEditBudget);
router.post("/edit/:id", budgetController.updateBudget);
router.post("/delete/:id", budgetController.deleteBudget);
router.get("/analysis/:month", budgetController.getBudgetAnalysis);

module.exports = router;
