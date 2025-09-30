const userService = require("../services/userService");

exports.getProfile = async (req, res, next) => {
  const user = await userService.getProfile(req.session.user.id);
  res.render("users/profile", { user: user, error: undefined });
};

exports.updateProfile = async (req, res, next) => {
  await userService.updateProfile(req.session.user.id, req.body);
  const updatedUser = await userService.getProfile(req.session.user.id);
  req.session.user = updatedUser;
  res.redirect("/user/profile");
};

exports.deleteProfile = async (req, res, next) => {
  await userService.deleteProfile(req.session.user.id);
  req.session.destroy((err) => {
    res.redirect("/auth/login");
  });
};
