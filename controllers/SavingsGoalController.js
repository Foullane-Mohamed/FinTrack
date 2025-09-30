const goalService = require("../services/SavingsGoalService");

exports.getGoals = async (req, res, next) => {
  const goals = await goalService.getSavingsGoals(req.session.user.id);
  res.render("goals/list", { goals, user: req.session.user });
};

exports.createGoal = async (req, res, next) => {
  const { title, targetAmount, deadline } = req.body;
  await goalService.createSavingsGoal(req.session.user.id, {
    title,
    targetAmount,
    deadline,
  });
  res.redirect("/goals");
};

exports.updateGoal = async (req, res) => {
  const { id } = req.params;
  const { title, targetAmount, currentAmount, deadline } = req.body;
  await goalService.updateSavingsGoal(id, req.session.user.id, {
    title,
    targetAmount,
    currentAmount,
    deadline,
  });
  res.redirect("/goals");
};

exports.deleteGoal = async (req, res) => {
  const { id } = req.params;
  await goalService.deleteSavingsGoal(id, req.session.user.id);
  res.redirect("/goals");
};
