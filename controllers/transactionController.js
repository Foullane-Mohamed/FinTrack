const transactionService = require("../services/transactionService");
const categoryService = require("../services/categoryService");

exports.getAllTransactions = async (req, res) => {
  const data = await transactionService.getTransactionsWithUser(req.session.user);
  res.render("transactions/index", data);
};

exports.renderAddTransaction = async (req, res) => {
  const categoriesData = await categoryService.getCategoriesWithUser(req.session.user);
  res.render("transactions/add", categoriesData);
};

exports.addTransaction = async (req, res) => {
  await transactionService.createTransaction(req.session.user.id, req.body);
  res.redirect("/transactions");
};

exports.renderEditTransaction = async (req, res) => {
  const transaction = await transactionService.getTransactionById(req.params.id, req.session.user.id);
  const categoriesData = await categoryService.getCategoriesWithUser(req.session.user);
  res.render("transactions/edit", { ...categoriesData, transaction });
};

exports.updateTransaction = async (req, res) => {
  await transactionService.updateTransaction(req.params.id, req.session.user.id, req.body);
  res.redirect("/transactions");
};

exports.deleteTransaction = async (req, res) => {
  await transactionService.deleteTransaction(req.params.id, req.session.user.id);
  res.redirect("/transactions");
};
