const userService = require("../services/userService");

exports.getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.session.user.id);
    res.render("users/profile", { user: user, error: undefined });
  } catch (error) {
    console.error("Error getting profile:", error);
    res.status(500).render("users/profile", {
      user: req.session.user,
      error: "Error loading profile",
    });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    await userService.updateProfile(req.session.user.id, req.body);
    const updatedUser = await userService.getProfile(req.session.user.id);
    req.session.user = updatedUser;
    res.redirect("/user/profile");
  } catch (error) {
    console.error("Error updating profile:", error);
    const user = await userService.getProfile(req.session.user.id);
    res.render("users/profile", {
      user: user,
      error: "Error updating profile: " + error.message,
    });
  }
};

exports.deleteProfile = async (req, res, next) => {
  try {
    await userService.deleteProfile(req.session.user.id);
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
      }
      res.redirect("/auth/login");
    });
  } catch (error) {
    console.error("Error deleting profile:", error);
    const user = await userService.getProfile(req.session.user.id);
    res.render("users/profile", {
      user: user,
      error: "Error deleting profile: " + error.message,
    });
  }
};
