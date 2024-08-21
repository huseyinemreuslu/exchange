const { FORBIDDEN_ERROR } = require("../../constants/errors/error.enum");

function ForbiddenError(message = "Forbidden") {
  return {
    name: FORBIDDEN_ERROR,
    message,
    statusCode: 403,
    isOperational: true,
  };
}

module.exports = ForbiddenError;
