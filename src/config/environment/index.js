const environment = {
  port: process.env.PORT || 3000,
  database: {
    name: process.env.DATABASE_NAME || "hydra",
    username: process.env.DATABASE_USER || "hydra",
    password: process.env.DATABASE_PASSWORD || "secret",
    host: process.env.DATABASE_HOST || "localhost",
    dialect: "postgres",
  },
  jwtSecret: process.env.JWT_SECRET || "defaultsecretkey",
  jwtTime: process.env.JWT_TIME || "1h",
  logLevel: process.env.LOG_LEVEL || "info",
  nodeEnv: process.env.NODE_ENV || "development",
};

module.exports = environment;
