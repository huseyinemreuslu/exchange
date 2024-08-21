const { Sequelize } = require("sequelize");
const config = require("../environment");

const isLog = config.nodeEnv === "development";
const sequelize = new Sequelize(
  config.database.name,
  config.database.username,
  config.database.password,
  {
    host: config.database.host,
    dialect: config.database.dialect,
    logging: isLog,
  }
);

module.exports = sequelize;
