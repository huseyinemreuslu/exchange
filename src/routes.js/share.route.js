const express = require("express");
const shareController = require("../controllers/share.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const PermissionEnum = require("../constants/permissions/permission.enum");

const shareRouter = express.Router();

shareRouter.post(
  "/",
  authMiddleware(PermissionEnum.SHARE.CREATE),
  shareController.createShare
);

shareRouter.put(
  "/:shareId",
  authMiddleware(PermissionEnum.SHARE.UPDATE),
  shareController.updateShare
);

shareRouter.get(
  "/:shareId",
  authMiddleware(PermissionEnum.SHARE.VIEW),
  shareController.getShare
);

shareRouter.delete(
  "/:shareId",
  authMiddleware(PermissionEnum.SHARE.DELETE),
  shareController.deleteShare
);

module.exports = shareRouter;
