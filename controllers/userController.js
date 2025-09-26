const User = require("../models");
const bcrypt = require("bcrypt");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user.id);
    if (!user) {
      return res.redirect("/auth/login");
    }

    res.render("user/profile", {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        currency: user.currency,
      },
      success: undefined,
      error: undefined,
    });
  } catch (error) {
    res.render("user/profile", {
      user: req.session.user,
      error: error.message,
      success: undefined,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { username, email, currency } = req.body;
    const userId = req.session.user.id;

    const existingUser = await User.findOne({
      where: {
        [require("sequelize").Op.or]: [{ email }, { username }],
        id: { [require("sequelize").Op.ne]: userId },
      },
    });

    if (existingUser) {
      const user = await User.findByPk(userId);
      return res.render("user/profile", {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          currency: user.currency,
        },
        error: "Username or email already exists",
        success: undefined,
      });
    }

    await User.update({ username, email, currency }, { where: { id: userId } });

    req.session.user.username = username;
    req.session.user.email = email;

    const updatedUser = await User.findByPk(userId);
    res.render("user/profile", {
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        currency: updatedUser.currency,
      },
      success: "Profile updated successfully",
      error: undefined,
    });
  } catch (error) {
    const user = await User.findByPk(req.session.user.id);
    res.render("user/profile", {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        currency: user.currency,
      },
      error: error.message,
      success: undefined,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.session.user.id;

    if (newPassword !== confirmPassword) {
      const user = await User.findByPk(userId);
      return res.render("user/profile", {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          currency: user.currency,
        },
        error: "New passwords do not match",
        success: undefined,
      });
    }

    const user = await User.findByPk(userId);
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isValidPassword) {
      return res.render("user/profile", {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          currency: user.currency,
        },
        error: "Current password is incorrect",
        success: undefined,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update({ password: hashedPassword }, { where: { id: userId } });

    res.render("user/profile", {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        currency: user.currency,
      },
      success: "Password changed successfully",
      error: undefined,
    });
  } catch (error) {
    const user = await User.findByPk(req.session.user.id);
    res.render("user/profile", {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        currency: user.currency,
      },
      error: error.message,
      success: undefined,
    });
  }
};

module.exports = {
  getUserProfile,
  updateProfile,
  changePassword,
};
