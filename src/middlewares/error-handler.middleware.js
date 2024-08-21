const logger = require("../utils/logs");

const errorHandler = (err, req, res, next) => {
  logger.warn({ message: "An error occurred:", error: err });

  if (!err.isOperational) {
    res.status(500).json({
      error: "InternalServerError",
      message: "An unexpected error occurred",
    });
  } else {
    res.status(err.statusCode || 500).json({
      error: err.name,
      message: err.message,
    });
  }
};

module.exports = errorHandler;
