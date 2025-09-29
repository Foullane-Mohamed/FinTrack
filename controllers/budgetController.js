const budgetService = require("../services/budgetService");

exports.getBudget = async (req, res) => {
  budgetService
    .getBudgets(req.session.user.id)
    .then((budgets) => {
      res.render("budgets/index", { budgets });
    })
    .catch(next);
};

exports.createBudget = async (req, res, next) => {
  budgetService
    .createBudget(req.session.user.id, req.body)
    .then(() => {
      res.redirect("/budgets");
    })
    .catch(next);
};

exports.updateBudget = async (req, res, next) => {
  budgetService
    .updateBudget(req.params.id, req.session.user.id, req.body)
    .then(() => {
      res.redirect("/budgets");
    })
    .catch(next);
};

exports.deleteBudget = async (req, res, next) => {
  budgetService
    .deleteBudget(req.params.id, req.session.user.id)
    .then(() => {
      res.redirect("/budgets");
    })
    .catch(next);
};
