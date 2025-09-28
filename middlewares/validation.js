const { body, validationResult } = require("express-validator");

const validateRegistration = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),

  body("currency")
    .optional()
    .isIn(["MAD", "USD", "EUR"])
    .withMessage("Currency must be MAD, USD, or EUR"),
];

const validateLogin = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),

  body("password").notEmpty().withMessage("Password is required"),
];

const validateTransaction = [
  body("category")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Category must be between 1 and 50 characters"),

  body("type")
    .isIn(["income", "expense"])
    .withMessage("Type must be either 'income' or 'expense'"),

  body("amount")
    .isFloat({ min: 0.01 })
    .withMessage("Amount must be a positive number"),

  body("date").isISO8601().withMessage("Please provide a valid date"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    req.validationErrors = errorMessages;
    return next();
  }
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateTransaction,
  handleValidationErrors,
};
