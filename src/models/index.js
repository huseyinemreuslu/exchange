const sequelize = require("../config/database");
const User = require("./user.model");
const Portfolio = require("./portfolio.model");
const Share = require("./share.model");
const Transaction = require("./transaction.model");
const PortfolioShares = require("./portfolio-shares.model");
const logger = require("../utils/logs");

Portfolio.belongsTo(User, { foreignKey: "userId" });
User.hasOne(Portfolio, { foreignKey: "userId" });

PortfolioShares.belongsTo(Portfolio, { foreignKey: "portfolioId" });
Portfolio.hasMany(PortfolioShares, { foreignKey: "portfolioId" });

PortfolioShares.belongsTo(Share, { foreignKey: "shareId" });
Share.hasMany(PortfolioShares, { foreignKey: "shareId" });

Transaction.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Transaction, { foreignKey: "userId" });

Transaction.belongsTo(Share, { foreignKey: "shareId" });
Share.hasMany(Transaction, { foreignKey: "shareId" });

const syncDatabase = async (force = false) => {
  try {
    await User.sync({ force });
    await Share.sync({ force });

    await Portfolio.sync({ force });
    await PortfolioShares.sync({ force });
    await Transaction.sync({ force });

    logger.info("Database sync successfully!");
  } catch (err) {
    logger.error({ message: "Error creating database: ", err });
  }
};

module.exports = syncDatabase;
