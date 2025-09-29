const { User } = require("../models");
const bcrypt = require("bcrypt");

async function getProfile(userId) {
  return await User.findByPk(userId);
}

async function updateProfile(userId, profileData) {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  const updateData = {
    username: profileData.username,
    email: profileData.email,
    currency: profileData.currency,
  };

  if (profileData.password && profileData.password.trim() !== "") {
    updateData.password = await bcrypt.hash(profileData.password, 10);
  }

  await user.update(updateData);
  return user;
}

async function deleteProfile(userId) {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");
  await user.destroy();
  return true;
}

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
};
