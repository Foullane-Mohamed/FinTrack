const { Transaction, User } = require("../models");

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { UserId: req.session.user.id },
      order: [["date", "DESC"]],
    });

    res.render("transactions/list", {
      user: req.session.user,
      transactions,
      success: undefined,
      error: undefined,
    });
  } catch (error) {
    res.render("transactions/list", {
      user: req.session.user,
      transactions: [],
      error: error.message,
      success: undefined,
    });
  }
};

const renderAddTransaction = (req, res) => {
  res.render("transactions/add", {
    user: req.session.user,
    error: undefined,
    success: undefined,
  });
};

const addTransaction = async (req, res) => {
  try {
    const { category, type, amount, date } = req.body;

    if (!category || !type || !amount) {
      return res.render("transactions/add", {
        user: req.session.user,
        error: "All fields are required",
        success: undefined,
      });
    }

    if (parseFloat(amount) <= 0) {
      return res.render("transactions/add", {
        user: req.session.user,
        error: "Amount must be greater than 0",
        success: undefined,
      });
    }

    await Transaction.create({
      category,
      type,
      amount: parseFloat(amount),
      date: date || new Date(),
      UserId: req.session.user.id,
    });

    res.redirect("/transactions?success=Transaction added successfully");
  } catch (error) {
    res.render("transactions/add", {
      user: req.session.user,
      error: error.message,
      success: undefined,
    });
  }
};

const renderEditTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.user.id,
      },
    });

    if (!transaction) {
      return res.redirect("/transactions?error=Transaction not found");
    }

    res.render("transactions/edit", {
      user: req.session.user,
      transaction,
      error: undefined,
      success: undefined,
    });
  } catch (error) {
    res.redirect("/transactions?error=" + error.message);
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { category, type, amount, date } = req.body;
    const transactionId = req.params.id;

    if (!category || !type || !amount) {
      const transaction = await Transaction.findByPk(transactionId);
      return res.render("transactions/edit", {
        user: req.session.user,
        transaction,
        error: "All fields are required",
        success: undefined,
      });
    }

    if (parseFloat(amount) <= 0) {
      const transaction = await Transaction.findByPk(transactionId);
      return res.render("transactions/edit", {
        user: req.session.user,
        transaction,
        error: "Amount must be greater than 0",
        success: undefined,
      });
    }

    const [updated] = await Transaction.update(
      {
        category,
        type,
        amount: parseFloat(amount),
        date: date || new Date(),
      },
      {
        where: {
          id: transactionId,
          UserId: req.session.user.id,
        },
      }
    );

    if (!updated) {
      return res.redirect("/transactions?error=Transaction not found");
    }

    res.redirect("/transactions?success=Transaction updated successfully");
  } catch (error) {
    const transaction = await Transaction.findByPk(req.params.id);
    res.render("transactions/edit", {
      user: req.session.user,
      transaction,
      error: error.message,
      success: undefined,
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.destroy({
      where: {
        id: req.params.id,
        UserId: req.session.user.id,
      },
    });

    if (!deleted) {
      return res.redirect("/transactions?error=Transaction not found");
    }

    res.redirect("/transactions?success=Transaction deleted successfully");
  } catch (error) {
    res.redirect("/transactions?error=" + error.message);
  }
};

const getTransactionsByType = async (req, res) => {
  try {
    const { type } = req.params; // income or expense

    if (!["income", "expense"].includes(type)) {
      return res.redirect("/transactions?error=Invalid transaction type");
    }

    const transactions = await Transaction.findAll({
      where: {
        UserId: req.session.user.id,
        type: type,
      },
      order: [["date", "DESC"]],
    });

    res.render("transactions/list", {
      user: req.session.user,
      transactions,
      currentFilter: type,
      success: undefined,
      error: undefined,
    });
  } catch (error) {
    res.render("transactions/list", {
      user: req.session.user,
      transactions: [],
      error: error.message,
      success: undefined,
    });
  }
};

module.exports = {
  getAllTransactions,
  renderAddTransaction,
  addTransaction,
  renderEditTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionsByType,
};
