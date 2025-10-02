const userService = require("../services/userService");

exports.getProfile = async (req, res) => {
  const user = await userService.getProfile(req.session.user.id);
  res.render("users/profile", { user, error: undefined });
};

exports.updateProfile = async (req, res) => {
  const updatedUser = await userService.updateProfile(req.session.user.id, req.body);
  req.session.user = updatedUser;
  res.redirect("/user/profile");
};

exports.deleteProfile = async (req, res) => {
  await userService.deleteProfile(req.session.user.id);
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
};
