const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Budget = sequelize.define("Budget", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  limitAmount: { type: DataTypes.FLOAT, allowNull: false },
  month: { type: DataTypes.STRING, allowNull: true },
  year: { type: DataTypes.INTEGER, allowNull: true },
});

module.exports = Budget;
