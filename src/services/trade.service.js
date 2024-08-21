const transactionService = require("./transaction.service");
const portfolioService = require("./portfolio.service");
const shareService = require("./share.service");
const userService = require("./user.service");
const BadRequestError = require("../utils/errors/bad-request.error");
const logger = require("../utils/logs");
const { NOT_FOUND_ERROR } = require("../constants/errors/error.enum");
const buyShares = async (tradeData, user) => {
  const { shareId, amount } = tradeData;

  logger.info({
    message: "User is trying to buy share",
    meta: { user, tradeData },
  });
  const userBalance = await userService.getUserBalance(user.id);

  const share = await shareService.getShare(shareId);
  const cost = Number(share.rate) * Number(amount);

  checkUserBalance(userBalance, share.amount, share.usedAmount, cost, amount);

  const portfolio = await portfolioService.getPortfolioByUserId(user.id);

  const newUserBalance = Number(userBalance) - cost;

  await userService.updateUser({ balance: newUserBalance }, user.id);

  const newUsedShareAmount = Number(amount) + Number(share.usedAmount);
  await shareService.updateShare(share.id, { usedAmount: newUsedShareAmount });

  try {
    const portfolioShare = await portfolioService.getPortfolioShare(
      portfolio.id,
      share.id
    );
    const newAmount = Number(amount) + Number(portfolioShare.amount);
    await portfolioService.updatePortfolioShare(portfolioShare.id, {
      amount: newAmount,
    });
  } catch (error) {
    console.log(error);

    if (error.name === NOT_FOUND_ERROR) {
      await portfolioService.createPortfolioShare({
        portfolioId: portfolio.id,
        shareId: share.id,
        amount: amount,
      });
    }
    throw error;
  }

  const transaction = await transactionService.createTransaction({
    userId: user.id,
    shareId,
    type: "BUY",
    amount,
    price: cost,
  });

  logger.info({
    message: "User buy share successfully",
    meta: { user, tradeData },
  });

  return transaction;
};

const sellShares = async (tradeData, user) => {
  const { shareId, amount } = tradeData;

  logger.info({
    message: "User is trying to sell share",
    meta: { user, tradeData },
  });

  const userBalance = await userService.getUserBalance(user.id);

  const userPortfolio = await portfolioService.getPortfolioByUserId(user.id);

  const userPortfolioShare = await portfolioService.getPortfolioShare(
    userPortfolio.id,
    shareId
  );

  const share = await shareService.getShare(shareId);

  checkUserPortfolioShareAmount(userPortfolioShare.amount, amount);

  const newUserPortfolioShareAmount =
    Number(userPortfolioShare.amount) - Number(amount);

  await portfolioService.updatePortfolioShare(userPortfolioShare.id, {
    amount: newUserPortfolioShareAmount,
  });

  const earnings = Number(share.rate) + Number(amount);
  const userNewBalance = earnings + Number(userBalance);
  await userService.updateUser({ balance: userNewBalance }, user.id);

  const newShareUsedAmount = Number(share.usedAmount) + Number(amount);

  await shareService.updateShare(share.id, { usedAmount: newShareUsedAmount });

  const transaction = await transactionService.createTransaction({
    userId: user.id,
    shareId,
    type: "SELL",
    amount,
    price: earnings,
  });

  return transaction;
};

const checkUserBalance = (
  userBalance,
  shareAmount,
  shareUsedAmount,
  cost,
  desiredAmount
) => {
  if (shareAmount - shareUsedAmount < desiredAmount) {
    throw new BadRequestError("Not enough share");
  }

  if (userBalance < cost) {
    throw new BadRequestError("Not enough money");
  }
};

const checkUserPortfolioShareAmount = (userShareAmount, desiredAmount) => {
  if (userShareAmount < desiredAmount) {
    throw new BadRequestError(
      "You do not have enough share amount for selling"
    );
  }
};
module.exports = {
  buyShares,
  sellShares,
};
