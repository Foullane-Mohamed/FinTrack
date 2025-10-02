const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "fintrack", 
  "root", 
  "", 
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    define: {
      timestamps: true,
    },
  }
);

module.exports = sequelize;
