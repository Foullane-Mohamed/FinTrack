const budgetService = require("../services/budgetService");

exports.getBudget = async (req, res) => {
  const data = await budgetService.getBudgetsWithUser(req.session.user);
  res.render("budgets/index", data);
};

exports.renderCreateBudget = async (req, res) => {
  const data = await budgetService.getCategoriesWithUser(req.session.user);
  res.render("budgets/create", data);
};

exports.createBudget = async (req, res ) => {
  await budgetService.createBudget(req.session.user.id, req.body);
  res.redirect("/budgets");
};

exports.updateBudget = async (req, res) => {
  await budgetService.updateBudget(req.params.id, req.session.user.id, req.body);
  res.redirect("/budgets");
};

exports.deleteBudget = async (req, res) => {
  await budgetService.deleteBudget(req.params.id, req.session.user.id);
  res.redirect("/budgets");
};
