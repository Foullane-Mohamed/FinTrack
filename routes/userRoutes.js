const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { ensureAuth } = require("../middlewares/auth");

router.use(ensureAuth);

router.get("/profile", userController.getUserProfile);
router.post("/profile", userController.updateProfile);
router.post("/change-password", userController.changePassword);

module.exports = router;
