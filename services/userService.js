const { User } = require("../models");
const bcrypt = require("bcrypt");

async function getProfile(userId) {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");
  return user;
}

async function updateProfile(userId, profileData) {
  const user = await getProfile(userId);

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
  const user = await getProfile(userId);
  await user.destroy();
  return true;
}

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
};
