const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budgetController");
const { ensureAuth } = require("../middlewares/auth");

router.get("/", ensureAuth, budgetController.getBudget);
router.get("/create", ensureAuth, budgetController.renderCreateBudget);
router.post("/create", ensureAuth, budgetController.createBudget);
router.post("/update/:id", ensureAuth, budgetController.updateBudget);
router.post("/delete/:id", ensureAuth, budgetController.deleteBudget);

module.exports = router;
