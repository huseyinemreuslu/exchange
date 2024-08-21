const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Portfolio extends Model {}

Portfolio.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Portfolio",
    tableName: "portfolios",
    schema: "public",
  }
);

module.exports = Portfolio;
