const express = require("express");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const PermissionEnum = require("../constants/permissions/permission.enum");

const userRouter = express.Router();

userRouter.post(
  "",
  authMiddleware(PermissionEnum.USER.CREATE),
  userController.createUser
);

userRouter.post(
  "/bulk",
  authMiddleware(PermissionEnum.USER.CREATE),
  userController.bulkCreate
);

userRouter.put(
  "/:userId",
  authMiddleware(PermissionEnum.USER.UPDATE),
  userController.updateUser
);

userRouter.delete(
  "/:userId",
  authMiddleware(PermissionEnum.USER.DELETE),
  userController.removeUser
);

userRouter.post("/sign-in", userController.signIn);

module.exports = userRouter;
