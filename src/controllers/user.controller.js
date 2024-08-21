const userService = require("../services/user.service");
const wrapAsyncHandler = require("../utils/wrappers/async-handler.wrapper");

const createUser = async (req, res) => {
  const result = await userService.createUser(req.body, req.user);
  res.status(201).json(result);
};

const bulkCreate = async (req, res) => {
  const result = await userService.bulkCreate(req.body, req.user);
  res.status(201).json(result);
};

const updateUser = async (req, res) => {
  const result = await userService.updateUser(
    req.body,
    req.params.userId,
    req.user
  );
  res.status(200).json(result);
};

const removeUser = async (req, res) => {
  const result = await userService.removeUser(req.params.userId, req.user);
  res.status(200).json(result);
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const result = await userService.signIn(email, password);
  res.status(200).json(result);
};

module.exports = wrapAsyncHandler({
  createUser,
  bulkCreate,
  updateUser,
  removeUser,
  signIn,
});
