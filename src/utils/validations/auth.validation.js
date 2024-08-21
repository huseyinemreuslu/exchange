const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const environment = require("../../config/environment");
const rolePermissions = require("../../constants/permissions/role-permission");
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (user) => {
  const permissions = getUserPermissions(user.roles);
  rolePermissions[user.role] || [];
  return jwt.sign(
    { id: user.id, roles: user.roles, permissions },
    environment.jwtSecret,
    {
      expiresIn: environment.jwtTime,
    }
  );
};

const getUserPermissions = (userRoles) => {
  return userRoles
    .map((role) => {
      return rolePermissions[role];
    })
    .flat(Infinity);
};

const verifyToken = (token) => {
  return jwt.verify(token, environment.jwtSecret);
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
};
