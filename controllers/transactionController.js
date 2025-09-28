const transactionService = require("../services/transactionService");

exports.getAllTransactions = async (req, res) => {
  const transactions = await transactionService.getTransactions(
    req.session.user.id
  );
  res.render("transactions/index", {
    user: req.session.user,
    transactions: transactions,
  });
};

exports.renderAddTransaction = (req, res) => {
  res.render("transactions/add", { user: req.session.user });
};

exports.addTransaction = async (req, res) => {
  await transactionService.createTransaction(req.session.user.id, req.body);
  res.redirect("/transactions");
};

exports.renderEditTransaction = async (req, res) => {
  const transaction = await transactionService.getTransactionById(
    req.params.id,
    req.session.user.id
  );
  res.render("transactions/edit", {
    user: req.session.user,
    transaction: transaction,
  });
};

exports.updateTransaction = async (req, res) => {
  await transactionService.updateTransaction(
    req.params.id,
    req.session.user.id,
    req.body
  );
  res.redirect("/transactions");
};

exports.deleteTransaction = async (req, res) => {
  await transactionService.deleteTransaction(
    req.params.id,
    req.session.user.id
  );
  res.redirect("/transactions");
};
