const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Budget = sequelize.define("Budget", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  category: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  month: { type: DataTypes.STRING, allowNull: true },
});

module.exports = Budget;
