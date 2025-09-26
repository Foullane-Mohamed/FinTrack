const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { ensureAuth } = require("../middlewares/auth");

// Apply authentication middleware to all user routes
router.use(ensureAuth);

// User profile routes
router.get("/profile", userController.getUserProfile);
router.post("/profile", userController.updateProfile);
router.post("/change-password", userController.changePassword);

module.exports = router;
