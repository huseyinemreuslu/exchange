const express = require("express");

const userRouter = require("./user.route");
const tradeRouter = require("./trade.route");
const shareRouter = require("./share.route");

const router = express.Router();

router.use("/users", userRouter);

router.use("/trades", tradeRouter);

router.use("/shares", shareRouter);

module.exports = router;
