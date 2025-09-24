const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define("Transaction",{
  id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  category : {type: DataTypes.STRING, allowNull: false},
  type : {type: DataTypes.ENUM('income', 'expense'), allowNull: false},
  amount : {type: DataTypes.FLOAT, allowNull: false},
  data : {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW}
})

module.exports = Transaction;