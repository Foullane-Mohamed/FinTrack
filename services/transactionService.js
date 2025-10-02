const { Transaction, Category } = require("../models");

async function createTransaction(userId, data) {
  return await Transaction.create({ ...data, UserId: userId });
}

async function getTransactionsWithUser(user) {
  const transactions = await Transaction.findAll({
    where: { UserId: user.id },
    include: [{ model: Category, attributes: ["id", "name"] }],
    order: [["date", "DESC"]],
  });
  return { user, transactions };
}

async function getTransactionById(id, userId) {
  const transaction = await Transaction.findOne({
    where: { id, UserId: userId },
    include: [{ model: Category, attributes: ["id", "name"] }],
  });
  if (!transaction) throw new Error("Transaction not found");
  return transaction;
}

async function updateTransaction(id, userId, data) {
  const transaction = await getTransactionById(id, userId);
  return await transaction.update(data);
}

async function deleteTransaction(id, userId) {
  const transaction = await getTransactionById(id, userId);
  await transaction.destroy();
  return true;
}

module.exports = {
  createTransaction,
  getTransactionsWithUser,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
