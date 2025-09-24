const sequelize = require('../config/database');

const User = require('./User');
const Transaction = require('./Transaction');
const Budget = require('./Budget');
const SavingsGoal = require('./SavingsGoal');


User.hasMany(Transaction);
Transaction.belongsTo(User);

User.hasMany(Budget);
Budget.belongsTo(User);

User.hasMany(SavingsGoal);
SavingsGoal.belongsTo(User);

module.exports = {sequelize ,  User, Transaction, Budget, SavingsGoal };