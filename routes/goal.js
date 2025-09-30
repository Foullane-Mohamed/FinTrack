const express = require("express");
const router = express.Router();
const goalController = require("../controllers/SavingsGoalController");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/", isAuthenticated, goalController.getGoals);

router.post("/create", isAuthenticated, goalController.createGoal);
router.post("/update/:id", isAuthenticated, goalController.updateGoal);
router.post("/delete/:id", isAuthenticated, goalController.deleteGoal);

module.exports = router;
