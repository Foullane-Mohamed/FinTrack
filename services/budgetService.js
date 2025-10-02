const { Budget, Category } = require("../models");

async function createBudget(userId, data) {
  return await Budget.create({ ...data, UserId: userId });
}

async function getBudgetsWithUser(user) {
  // كترجع user + budgets جاهز للـ controller
  const budgets = await Budget.findAll({
    where: { UserId: user.id },
    include: [
      {
        model: Category,
        attributes: ["id", "name"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return { user, budgets };
}

async function getBudgetByCategory(userId, categoryId, month = null, year = null) {
  const whereClause = { UserId: userId, CategoryId: categoryId };
  if (month) whereClause.month = month;
  if (year) whereClause.year = year;

  return await Budget.findOne({
    where: whereClause,
    include: [
      {
        model: Category,
        attributes: ["id", "name"],
      },
    ],
  });
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

async function getCategoriesWithUser(user) {
  const categories = await Category.findAll({ where: { UserId: user.id } });
  return { user, categories };
}

module.exports = {
  createBudget,
  getBudgetsWithUser,
  getBudgetByCategory,
  updateBudget,
  deleteBudget,
  getCategoriesWithUser,
};
