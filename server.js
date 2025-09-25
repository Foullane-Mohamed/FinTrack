const express = require("express");
const { sequelize } = require("./models");

const app = express();

app.use(express.json());

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database, table created");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
