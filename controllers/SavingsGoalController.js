const goalService = require("../services/SavingsGoalService");

exports.getGoals = async (req, res) => {
  const data = await goalService.getSavingsGoalsWithUser(req.session.user);
  res.render("goals/list", data);
};

exports.createGoal = async (req, res) => {
  const { title, targetAmount, deadline } = req.body;
  await goalService.createSavingsGoal(req.session.user.id, { title, targetAmount, deadline });
  res.redirect("/goals");
};

exports.updateGoal = async (req, res) => {
  const { id } = req.params;
  const { title, targetAmount, deadline } = req.body;
  await goalService.updateSavingsGoal(id, req.session.user.id, { title, targetAmount, deadline });
  res.redirect("/goals");
};

exports.deleteGoal = async (req, res) => {
  const { id } = req.params;
  await goalService.deleteSavingsGoal(id, req.session.user.id);
  res.redirect("/goals");
};
