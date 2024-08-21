const ForbiddenError = require("../utils/errors/forbidden.error");
const UnauthorizedError = require("../utils/errors/unauthorized.error");
const logger = require("../utils/logs");
const { verifyToken } = require("../utils/validations/auth.validation");
const { hasPermission } = require("../utils/validations/permission.validation");

const authMiddleware = (requiredPermission) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      logger.warn("No token provided in request headers.");
      return next(UnauthorizedError("No token provided"));
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = verifyToken(token);

      const userData = {
        id: decoded.id,
        roles: decoded.roles,
        permissions: decoded.permissions,
      };
      req.user = JSON.parse(JSON.stringify(userData));

      const targetUserId = req.params.userId || req.body.userId;

      if (!hasPermission(userData, requiredPermission, targetUserId)) {
        logger.warn({
          message: "User does not have permission to this action, user: ",
          userData,
        });
        return next(
          ForbiddenError("You do not have permission to perform this action")
        );
      }

      next();
    } catch (err) {
      return next(UnauthorizedError("Invalid token"));
    }
  };
};

module.exports = authMiddleware;
