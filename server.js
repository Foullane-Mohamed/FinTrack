const express = require("express");
const session = require("express-session");
const path = require("path");
const { sequelize } = require("./models");

const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transactionRoutes");
const userRoutes = require("./routes/userRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "fintrack-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);
app.use("/user", userRoutes);
app.use("/budgets", budgetRoutes);

app.get("/", (req, res) => {
  res.redirect("/auth/login");
});

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database connected successfully - Tables recreated");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
