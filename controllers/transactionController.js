const transactionService = require("../services/transactionService");

// Show all transactions page
exports.getAllTransactions = async (req, res) => {
  try {
    res.render("transactions/index", { user: req.session.user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get transactions as JSON for AJAX
exports.getTransactionsAPI = async (req, res) => {
  try {
    const transactions = await transactionService.getTransactions(
      req.session.user.id
    );
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Show add transaction form
exports.renderAddTransaction = async (req, res) => {
  try {
    res.render("transactions/add", { user: req.session.user, error: null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new transaction
exports.addTransaction = async (req, res) => {
  try {
    await transactionService.createTransaction(req.session.user.id, req.body);
    res.redirect("/transactions");
  } catch (error) {
    res.render("transactions/add", {
      user: req.session.user,
      error: error.message,
    });
  }
};

// Show edit transaction form
exports.renderEditTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.getTransactionById(
      req.params.id,
      req.session.user.id
    );
    res.render("transactions/edit", {
      user: req.session.user,
      transaction: transaction,
      error: null,
    });
  } catch (error) {
    res.redirect("/transactions");
  }
};

// Update transaction
exports.updateTransaction = async (req, res) => {
  try {
    await transactionService.updateTransaction(
      req.params.id,
      req.session.user.id,
      req.body
    );
    res.redirect("/transactions");
  } catch (error) {
    const transaction = await transactionService.getTransactionById(
      req.params.id,
      req.session.user.id
    );
    res.render("transactions/edit", {
      user: req.session.user,
      transaction: transaction,
      error: error.message,
    });
  }
};

// Delete transaction
exports.deleteTransaction = async (req, res) => {
  try {
    await transactionService.deleteTransaction(
      req.params.id,
      req.session.user.id
    );
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
