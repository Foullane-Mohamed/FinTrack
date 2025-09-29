const { Budget } = require("../models");

async function createBudget(userId, data) {
  return await Budget.create({ ...data, UserId: userId });
}

async function getBudgets(userId) {
  return await Budget.findAll({ where: { UserId: userId } });
}

async function updateBudget(budgetId, userId, budgetData) {
  const budget = await Budget.findOne({
    where: { id: budgetId, UserId: userId },
  });
  if (!budget) throw new Error("Budget not found");
  return await budget.update(budgetData);
}

async function deleteBudget(budgetId, userId) {
  const budget = await Budget.findOne({
    where: { id: budgetId, UserId: userId },
  });
  if (!budget) throw new Error("Budget not found");
  await budget.destroy();
  return true;
}

module.exports = {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
};
