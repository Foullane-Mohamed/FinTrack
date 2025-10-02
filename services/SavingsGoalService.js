const { SavingsGoal, User } = require("../models");

async function createSavingsGoal(userId, data) {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");
  return await SavingsGoal.create({ ...data, UserId: userId });
}

async function getSavingsGoalsWithUser(user) {
  const goals = await SavingsGoal.findAll({ where: { UserId: user.id } });
  return { user, goals };
}

async function getSavingsGoalById(goalId, userId) {
  const goal = await SavingsGoal.findOne({
    where: { id: goalId, UserId: userId },
  });
  if (!goal) throw new Error("Savings Goal not found");
  return goal;
}

async function updateSavingsGoal(goalId, userId, goalData) {
  const goal = await getSavingsGoalById(goalId, userId);
  return await goal.update(goalData);
}

async function deleteSavingsGoal(goalId, userId) {
  const goal = await getSavingsGoalById(goalId, userId);
  await goal.destroy();
  return true;
}

module.exports = {
  createSavingsGoal,
  getSavingsGoalsWithUser,
  updateSavingsGoal,
  deleteSavingsGoal,
  getSavingsGoalById,
};
