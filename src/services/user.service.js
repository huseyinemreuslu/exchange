const logger = require("../utils/logs");
const User = require("../models/user.model");
const BadRequestError = require("../utils/errors/bad-request.error");
const NotFoundError = require("../utils/errors/not-found.error");
const UnauthorizedError = require("../utils/errors/unauthorized.error");

const {
  userListSchema,
  userSchema,
  updateUserSchema,
} = require("../schemas/user.schema");
const {
  comparePassword,
  generateToken,
  hashPassword,
} = require("../utils/validations/auth.validation");

const bulkCreate = async (userList) => {
  const result = userListSchema.safeParse(userList);
  if (!result.success) {
    logger.error({
      message: "Invalid user data for bulk create",
      errors: result.error.errors,
    });
    throw BadRequestError("Invalid user data for bulk create");
  }

  const usersWithHashedPasswords = await Promise.all(
    result.data.map(async (user) => {
      const hashedPassword = await hashPassword(user.password);
      return {
        ...user,
        password: hashedPassword,
      };
    })
  );

  const createdUsers = await User.bulkCreate(usersWithHashedPasswords);
  logger.info({ message: "Bulk users created successfully", createdUsers });
  return createdUsers;
};

const createUser = async (user) => {
  const result = userSchema.safeParse(user);
  if (!result.success) {
    logger.error({ message: "Invalid user data", errors: result.error.errors });
    throw BadRequestError("Invalid user data");
  }
  const hashedPassword = await hashPassword(user.password);
  const createdUser = await User.create({ ...user, password: hashedPassword });
  logger.info({ message: "User created successfully", createdUser });
  return createdUser;
};

const updateUser = async (userData, userId) => {
  const result = updateUserSchema.safeParse(userData);
  if (!result.success) {
    logger.error({
      message: "Invalid user data for update",
      errors: result.error.errors,
    });
    throw BadRequestError("Invalid user data for update");
  }

  console.log(result);

  const [updatedRows] = await User.update(result.data, {
    where: { id: userId },
  });
  if (updatedRows === 0) {
    logger.warn({ message: "User not found", userId });
    throw NotFoundError("User not found");
  }
  logger.info({ message: "User updated successfully", userId });
  return updatedRows;
};

const removeUser = async (userId) => {
  const deletedRows = await User.destroy({ where: { id: userId } });
  if (deletedRows === 0) {
    logger.warn({ message: "User not found", userId });
    throw NotFoundError("User not found");
  }
  logger.info({ message: "User removed successfully", userId });
  return deletedRows;
};

const signIn = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    logger.warn({ message: "User not found with this email", email });
    throw UnauthorizedError("Invalid email or password");
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    logger.warn({ message: "Invalid password for this email", email });
    throw UnauthorizedError("Invalid email or password");
  }

  logger.info({ message: "User successfully logged in", userId: user.id });

  const token = generateToken(user);
  return { token };
};

const getUserBalance = async (userId) => {
  const user = await User.findByPk(userId, { attributes: ["balance"] });

  if (!user) {
    logger.warn({ message: "User not found with id", userId });
    throw NotFoundError("User not found");
  }

  logger.info({
    message: "User balance retrieved successfully",
    userId,
    balance: user.balance,
  });

  return user.balance;
};

const getUserList = async () => {
  return await User.findAll();
};

module.exports = {
  bulkCreate,
  createUser,
  updateUser,
  removeUser,
  getUserList,
  getUserBalance,
  signIn,
};
