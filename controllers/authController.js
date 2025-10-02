const { registerUser, loginUser } = require("../services/authService");

const register = async (req, res) => {
  const { username, email, password, currency } = req.body;
  const user = await registerUser(username, email, password, currency);

  req.session.user = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  res.redirect("/auth/dashboard");
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await loginUser(email, password);

  req.session.user = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  res.redirect("/auth/dashboard");
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send("Error logging out");
    res.clearCookie("connect.sid");
    res.redirect("/auth/login");
  });
};

const renderLogin = (req, res) =>
  res.render("auth/login", { error: undefined });
const renderRegister = (req, res) =>
  res.render("auth/register", { error: undefined });
const renderDashboard = (req, res) => {
  if (!req.session.user) return res.redirect("/auth/login");
  res.render("dashboard/dashboard", { user: req.session.user });
};

module.exports = {
  register,
  login,
  logout,
  renderLogin,
  renderRegister,
  renderDashboard,
};
