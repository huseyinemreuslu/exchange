const { INTERNAL_SERVER_ERROR } = require("../../constants/errors/error.enum");

function InternalServerError(message = "Internal Server Error") {
  return {
    name: INTERNAL_SERVER_ERROR,
    message,
    statusCode: 500,
    isOperational: true,
  };
}

module.exports = InternalServerError;
