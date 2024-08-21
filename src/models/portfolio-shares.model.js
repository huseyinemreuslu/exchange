const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class PortfolioShare extends Model {}

PortfolioShare.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    portfolioId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "portfolios",
        key: "id",
      },
    },
    shareId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "shares",
        key: "id",
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PortfolioShare",
    tableName: "portfolioShares",
    schema: "public",
  }
);

module.exports = PortfolioShare;
