const PermissionEnum = require("../../constants/permissions/permission.enum");

const hasPermission = (user, requiredPermission, targetUserId = null) => {
  const hasRequiredPermission = user.permissions.includes(requiredPermission);
  const canManage = user.permissions.includes(PermissionEnum.USER.MANAGE);

  if (targetUserId) {
    return hasRequiredPermission && (canManage || user.id === targetUserId);
  }

  return hasRequiredPermission && canManage;
};

module.exports = {
  hasPermission,
};
