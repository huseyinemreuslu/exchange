const tradeService = require("../services/trade.service");
const wrapAsyncHandler = require("../utils/wrappers/async-handler.wrapper");

const buyShares = async (req, res) => {
  const result = await tradeService.buyShares(req.body, req.user);
  res.status(200).json(result);
};

const sellShares = async (req, res) => {
  const result = await tradeService.sellShares(req.body, req.user);
  res.status(200).json(result);
};

module.exports = wrapAsyncHandler({
  buyShares,
  sellShares,
});
