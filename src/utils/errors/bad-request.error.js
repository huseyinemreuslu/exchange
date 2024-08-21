const { BAD_REQUEST_ERROR } = require("../../constants/errors/error.enum");

function BadRequestError(message = "Bad Request") {
  return {
    name: BAD_REQUEST_ERROR,
    message,
    statusCode: 400,
    isOperational: true,
  };
}

module.exports = BadRequestError;
