const { UNAUTHORIZED_ERROR } = require("../../constants/errors/error.enum");

function UnauthorizedError(message = "Unauthorized") {
  return {
    name: UNAUTHORIZED_ERROR,
    message,
    statusCode: 401,
    isOperational: true,
  };
}

module.exports = UnauthorizedError;
