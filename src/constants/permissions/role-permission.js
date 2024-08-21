const PermissionEnum = require("./permission.enum");
const RoleEnum = require("./role.enum");

const rolePermissions = {
  [RoleEnum.USER]: [
    PermissionEnum.USER.UPDATE,
    PermissionEnum.PORTFOLIO.CREATE,
    PermissionEnum.PORTFOLIO.UPDATE,
    PermissionEnum.PORTFOLIO.VIEW,
    PermissionEnum.SHARE.VIEW,
  ],
  [RoleEnum.ADMIN]: [
    PermissionEnum.USER.CREATE,
    PermissionEnum.USER.UPDATE,
    PermissionEnum.USER.DELETE,
    PermissionEnum.USER.MANAGE,
    PermissionEnum.PORTFOLIO.CREATE,
    PermissionEnum.PORTFOLIO.UPDATE,
    PermissionEnum.PORTFOLIO.DELETE,
    PermissionEnum.PORTFOLIO.VIEW,
    PermissionEnum.SHARE.CREATE,
    PermissionEnum.SHARE.UPDATE,
    PermissionEnum.SHARE.DELETE,
    PermissionEnum.SHARE.VIEW,
    PermissionEnum.TRADE.BUY,
    PermissionEnum.TRADE.SELL,
  ],
};

module.exports = rolePermissions;
