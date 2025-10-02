const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { ensureAuth } = require("../middlewares/auth");

router.get("/", ensureAuth, categoryController.getCategories);
router.get("/create", ensureAuth, categoryController.renderCreateCategory);
router.post("/create", ensureAuth, categoryController.createCategory);
router.post("/update/:id", ensureAuth, categoryController.updateCategory);
router.post("/delete/:id", ensureAuth, categoryController.deleteCategory);

module.exports = router;
