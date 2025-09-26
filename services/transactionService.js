const { Transaction } = require("../models");

async function createTransaction(userId, data) {
  return await Transaction.create({ ...data, UserId: userId });
}

async function getTransactions(userId) {
  return await Transaction.findAll({ where: { UserId: userId } });
}


async function updateTransaction(id, userId, data) {
  const transaction = await Transaction.findOne({
    where: { id, UserId: userId },
  });
  if (!transaction) throw new Error("Transaction not found");
  return await transaction.update(data);
}

async function deleteTransaction(id, userId) {
  const transaction = await Transaction.findOne({
    where: { id, UserId: userId },
  });
  if (!transaction) throw new Error("Transaction not found");
  return await transaction.destroy();
}

module.exports = {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};
