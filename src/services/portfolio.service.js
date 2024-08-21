const PortfolioShare = require("../models/portfolio-shares.model");
const Portfolio = require("../models/portfolio.model");
const portfolioShareSchema = require("../schemas/portfolio-share.schema");
const BadRequestError = require("../utils/errors/bad-request.error");
const NotFoundError = require("../utils/errors/not-found.error");

const getPortfolioByUserId = async (userId) => {
  const portfolio = await Portfolio.findOne({ where: { userId } });
  if (!portfolio) {
    throw NotFoundError("Portfolio not found.");
  }
  return portfolio;
};

const bulkCreatePortfolio = async (portfolios) => {
  const portfolio = await Portfolio.bulkCreate(portfolios);
  return portfolio;
};

const createPortfolio = async (userId) => {
  const existingPortfolio = await Portfolio.findOne({ where: { userId } });

  if (existingPortfolio) {
    throw BadRequestError("Portfolio already exists for this user.");
  }

  const result = portfolioSchema.safeParse({ userId });

  if (!result.success) {
    throw BadRequestError("Invalid portfolio data", {
      errors: result.error.errors,
    });
  }

  const portfolio = await Portfolio.create(result.data);
  return portfolio;
};

const createPortfolioWithShare = async (userId, shares) => {
  const portfolio = await Portfolio.create(
    {
      userId,
      PortfolioShares: shares.map((share) => ({
        shareId: share.shareId,
        amount: share.amount,
      })),
    },
    {
      include: [PortfolioShare],
    }
  );

  return portfolio;
};

const getPortfolioShare = async (portfolioId, shareId) => {
  const portfolioShare = await PortfolioShare.findOne({
    where: { portfolioId, shareId },
  });
  if (!portfolioShare) {
    throw NotFoundError("Share not found in portfolio.");
  }
  return portfolioShare;
};

const createPortfolioShare = async (portfolioShareData) => {
  const result = portfolioShareSchema.safeParse(portfolioShareData);

  if (!result.success) {
    throw BadRequestError("Invalid PortfolioShare data", result.error.errors);
  }

  const portfolioShare = await PortfolioShare.create(result.data);

  return portfolioShare;
};

const updatePortfolioShare = async (portfolioShareId, updateData) => {
  return await PortfolioShare.update(updateData, {
    where: { id: portfolioShareId },
  });
};

module.exports = {
  getPortfolioByUserId,
  bulkCreatePortfolio,
  createPortfolio,
  createPortfolioWithShare,
  createPortfolioShare,
  getPortfolioShare,
  updatePortfolioShare,
};
