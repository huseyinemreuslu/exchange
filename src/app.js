const express = require("express");
const errorHandler = require("./middlewares/error-handler.middleware");
const NotFoundError = require("./utils/errors/not-found.error");
const router = require("./routes.js");
const environment = require("./config/environment/index.js");
const syncDatabase = require("./models/index.js");

syncDatabase(false);

const app = express();

app.use(express.json());

app.use("/api", router);

app.use((req, res, next) => {
  next(NotFoundError("Route not found"));
});

app.use(errorHandler);

const PORT = environment.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
