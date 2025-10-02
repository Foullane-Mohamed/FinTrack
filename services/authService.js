const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const User = require("../models/User");

async function registerUser(username, email, password, currency = "MAD") {
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email }, { username }],
    },
  });

  if (existingUser) {
    throw new Error("User with this email or username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    currency,
  });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    currency: user.currency,
  };
}

async function loginUser(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Invalid email or password");

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new Error("Invalid email or password");

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    currency: user.currency,
  };
}

module.exports = {
  registerUser,
  loginUser,
};
