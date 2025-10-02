const sequelize = require("../config/database");

const User = require("./User");
const Transaction = require("./Transaction");
const Budget = require("./Budget");
const SavingsGoal = require("./SavingsGoal");
const Category = require("./Category");

// User associations
User.hasMany(Transaction);
Transaction.belongsTo(User);

User.hasMany(Budget);
Budget.belongsTo(User);

User.hasMany(SavingsGoal);
SavingsGoal.belongsTo(User);

User.hasMany(Category);
Category.belongsTo(User);

// Category associations
Category.hasMany(Transaction);
Transaction.belongsTo(Category);

Category.hasMany(Budget);
Budget.belongsTo(Category);

module.exports = {
  sequelize,
  User,
  Transaction,
  Budget,
  SavingsGoal,
  Category,
};
