const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const SavingsGoal = sequelize.define("SavingsGoal",{
  id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title : {type: DataTypes.STRING, allowNull: false},
  targetAmount : {type: DataTypes.FLOAT, allowNull: false},
  currentAmount : {type: DataTypes.FLOAT, allowNull: false, defaultValue: 0},
  deadline : {type : DataTypes.DATE, allowNull: true}
})

module.exports = SavingsGoal;