const { Category } = require("../models");

async function createCategory(userId, data) {
  return await Category.create({ ...data, UserId: userId });
}

async function getCategoriesWithUser(user) {
  const categories = await Category.findAll({
    where: { UserId: user.id },
    order: [["name", "ASC"]],
  });
  return { user, categories };
}

async function getCategoryById(id, userId) {
  const category = await Category.findOne({
    where: { id, UserId: userId },
  });
  if (!category) throw new Error("Category not found");
  return category;
}

async function updateCategory(id, userId, data) {
  const category = await getCategoryById(id, userId);
  return await category.update(data);
}

async function deleteCategory(id, userId) {
  const category = await getCategoryById(id, userId);
  return await category.destroy();
}

module.exports = {
  createCategory,
  getCategoriesWithUser,
  updateCategory,
  deleteCategory,
  getCategoryById,
};
