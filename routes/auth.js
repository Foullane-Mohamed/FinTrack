const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Authentication routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// View routes
router.get("/login", authController.renderLogin);
router.get("/register", authController.renderRegister);
router.get("/dashboard", authController.renderDashboard);

module.exports = router;
