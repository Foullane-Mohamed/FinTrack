const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  console.error("Stack:", err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
  } else if (err.name === "UnauthorizedError") {
    statusCode = 401;
    message = "Unauthorized";
  } else if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = "Database validation error";
  } else if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 400;
    message = "Duplicate entry";
  }

  if (process.env.NODE_ENV === "development") {
    res.status(statusCode).json({
      error: message,
      details: err.message,
      stack: err.stack,
    });
  } else {
    res.status(statusCode).json({
      error: statusCode >= 500 ? "Something went wrong!" : message,
    });
  }
};

const notFoundHandler = (req, res, next) => {
  res.status(404).render("error/404", {
    message: "Page not found",
    url: req.originalUrl,
  });
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
