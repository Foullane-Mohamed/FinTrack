const transactionService = require("../services/transactionService");

exports.getAll = async (req, res) => {
  try {
    const transactions = await transactionService.getAllTransactions(
      req.session.user.id
    );
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.update = async (req, res) => {
  try {
    const transaction = await transactionService.updateTransaction(
      req.params.id,
      req.session.user.id,
      req.body
    );
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.delete = async (req, res) => {
  try {
    await transactionService.deleteTransaction(
      req.params.id,
      req.session.user.id
    );
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const transaction = await transactionService.createTransaction(
      req.session.user.id,
      req.body
    );
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
