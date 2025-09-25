const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../services/authService");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, currency } = req.body;
    const user = await registerUser(username, email, password, currency);

    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    res.redirect("/auth/dashboard");
  } catch (error) {
    res.render("auth/register", { error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);

    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    res.redirect("/auth/dashboard");
  } catch (error) {
    res.render("auth/login", { error: error.message });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send("Error logging out");
    res.clearCookie("connect.sid");
    res.redirect("/auth/login");
  });
});

module.exports = router;
