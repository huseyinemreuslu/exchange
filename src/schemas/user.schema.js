const { z } = require("zod");
const RoleEnum = require("../constants/permissions/role.enum");

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  roles: z.array(z.enum(Object.values(RoleEnum))).optional(),
  balance: z.number().gte(0).optional(),
});

const userListSchema = z.array(userSchema);

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  roles: z.array(z.enum(Object.values(RoleEnum))).optional(),
  balance: z.number().gte(0).optional(),
});

module.exports = {
  userSchema,
  userListSchema,
  updateUserSchema,
};
