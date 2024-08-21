const asyncHandler = require("../../middlewares/async-handler.middleware");

const wrapAsyncHandler = (controller) => {
  Object.keys(controller).forEach((key) => {
    if (typeof controller[key] === "function") {
      controller[key] = asyncHandler(controller[key]);
    }
  });
  return controller;
};

module.exports = wrapAsyncHandler;
