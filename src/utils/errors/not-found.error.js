const { NOT_FOUND_ERROR } = require("../../constants/errors/error.enum");

function NotFoundError(message = "Resource Not Found") {
  return {
    name: NOT_FOUND_ERROR,
    message,
    statusCode: 404,
    isOperational: true,
  };
}

module.exports = NotFoundError;
