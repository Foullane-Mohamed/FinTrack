const categoryService = require("../services/categoryService");

exports.getCategories = async (req, res) => {
  const data = await categoryService.getCategoriesWithUser(req.session.user);
  res.render("categories/index", data);
};

exports.renderCreateCategory = async (req, res) => {
  res.render("categories/create", { user: req.session.user });
};

exports.createCategory = async (req, res) => {
  await categoryService.createCategory(req.session.user.id, req.body);
  res.redirect("/categories");
};

exports.updateCategory = async (req, res) => {
  await categoryService.updateCategory(req.params.id, req.session.user.id, req.body);
  res.redirect("/categories");
};

exports.deleteCategory = async (req, res) => {
  await categoryService.deleteCategory(req.params.id, req.session.user.id);
  res.redirect("/categories");
};
