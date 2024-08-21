const express = require("express");
const tradeController = require("../controllers/trade.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const PermissionEnum = require("../constants/permissions/permission.enum");

const tradeRouter = express.Router();

tradeRouter.post(
  "/buy",
  authMiddleware(PermissionEnum.TRADE.BUY),
  tradeController.buyShares
);
tradeRouter.post(
  "/sell",
  authMiddleware(PermissionEnum.TRADE.SELL),
  tradeController.sellShares
);

module.exports = tradeRouter;
