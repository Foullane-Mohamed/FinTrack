const { Budget, Transaction } = require("../models");

const getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.findAll({
      where: { UserId: req.session.user.id },
      order: [["month", "DESC"]],
    });

    res.render("budgets/list", {
      user: req.session.user,
      budgets,
      success: req.query.success,
      error: req.query.error,
    });
  } catch (error) {
    res.render("budgets/list", {
      user: req.session.user,
      budgets: [],
      error: error.message,
      success: undefined,
    });
  }
};

const renderAddBudget = (req, res) => {
  res.render("budgets/add", {
    user: req.session.user,
    error: undefined,
    success: undefined,
  });
};

const addBudget = async (req, res) => {
  try {
    const { category, amount, month } = req.body;

    if (!category || !amount || !month) {
      return res.render("budgets/add", {
        user: req.session.user,
        error: "All fields are required",
        success: undefined,
      });
    }

    if (parseFloat(amount) <= 0) {
      return res.render("budgets/add", {
        user: req.session.user,
        error: "Amount must be greater than 0",
        success: undefined,
      });
    }

    // Check if budget already exists for this category and month
    const existingBudget = await Budget.findOne({
      where: {
        category,
        month,
        UserId: req.session.user.id,
      },
    });

    if (existingBudget) {
      return res.render("budgets/add", {
        user: req.session.user,
        error: "Budget for this category and month already exists",
        success: undefined,
      });
    }

    await Budget.create({
      category,
      amount: parseFloat(amount),
      month,
      UserId: req.session.user.id,
    });

    res.redirect("/budgets?success=Budget created successfully");
  } catch (error) {
    res.render("budgets/add", {
      user: req.session.user,
      error: error.message,
      success: undefined,
    });
  }
};

const renderEditBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.user.id,
      },
    });

    if (!budget) {
      return res.redirect("/budgets?error=Budget not found");
    }

    res.render("budgets/edit", {
      user: req.session.user,
      budget,
      error: undefined,
      success: undefined,
    });
  } catch (error) {
    res.redirect("/budgets?error=" + error.message);
  }
};

const updateBudget = async (req, res) => {
  try {
    const { category, amount, month } = req.body;
    const budgetId = req.params.id;

    if (!category || !amount || !month) {
      const budget = await Budget.findByPk(budgetId);
      return res.render("budgets/edit", {
        user: req.session.user,
        budget,
        error: "All fields are required",
        success: undefined,
      });
    }

    if (parseFloat(amount) <= 0) {
      const budget = await Budget.findByPk(budgetId);
      return res.render("budgets/edit", {
        user: req.session.user,
        budget,
        error: "Amount must be greater than 0",
        success: undefined,
      });
    }

    // Check if another budget exists for this category and month
    const existingBudget = await Budget.findOne({
      where: {
        category,
        month,
        UserId: req.session.user.id,
        id: { [require("sequelize").Op.ne]: budgetId },
      },
    });

    if (existingBudget) {
      const budget = await Budget.findByPk(budgetId);
      return res.render("budgets/edit", {
        user: req.session.user,
        budget,
        error: "Budget for this category and month already exists",
        success: undefined,
      });
    }

    const [updated] = await Budget.update(
      {
        category,
        amount: parseFloat(amount),
        month,
      },
      {
        where: {
          id: budgetId,
          UserId: req.session.user.id,
        },
      }
    );

    if (!updated) {
      return res.redirect("/budgets?error=Budget not found");
    }

    res.redirect("/budgets?success=Budget updated successfully");
  } catch (error) {
    const budget = await Budget.findByPk(req.params.id);
    res.render("budgets/edit", {
      user: req.session.user,
      budget,
      error: error.message,
      success: undefined,
    });
  }
};

const deleteBudget = async (req, res) => {
  try {
    const deleted = await Budget.destroy({
      where: {
        id: req.params.id,
        UserId: req.session.user.id,
      },
    });

    if (!deleted) {
      return res.redirect("/budgets?error=Budget not found");
    }

    res.redirect("/budgets?success=Budget deleted successfully");
  } catch (error) {
    res.redirect("/budgets?error=" + error.message);
  }
};

const getBudgetAnalysis = async (req, res) => {
  try {
    const { month } = req.params;

    const budgets = await Budget.findAll({
      where: {
        UserId: req.session.user.id,
        month: month,
      },
    });

    // Get actual spending for each category in the specified month
    const startDate = new Date(`${month}-01`);
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    );

    const analysisData = [];

    for (const budget of budgets) {
      const actualSpending = await Transaction.sum("amount", {
        where: {
          UserId: req.session.user.id,
          category: budget.category,
          type: "expense",
          date: {
            [require("sequelize").Op.between]: [startDate, endDate],
          },
        },
      });

      analysisData.push({
        category: budget.category,
        budgetAmount: budget.amount,
        actualSpending: actualSpending || 0,
        difference: budget.amount - (actualSpending || 0),
        percentage: ((actualSpending || 0) / budget.amount) * 100,
      });
    }

    res.render("budgets/analysis", {
      user: req.session.user,
      month,
      analysisData,
      error: undefined,
    });
  } catch (error) {
    res.render("budgets/analysis", {
      user: req.session.user,
      month: req.params.month,
      analysisData: [],
      error: error.message,
    });
  }
};

module.exports = {
  getAllBudgets,
  renderAddBudget,
  addBudget,
  renderEditBudget,
  updateBudget,
  deleteBudget,
  getBudgetAnalysis,
};
