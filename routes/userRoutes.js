const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { ensureAuth } = require("../middlewares/auth");

router.get("/profile", ensureAuth, userController.getProfile);
router.post("/profile", ensureAuth, userController.updateProfile);
router.post("/delete", ensureAuth, userController.deleteProfile);

module.exports = router;
