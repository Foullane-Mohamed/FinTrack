const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/login", authController.renderLogin);
router.get("/register", authController.renderRegister);
router.get("/dashboard", authController.renderDashboard);

module.exports = router;
