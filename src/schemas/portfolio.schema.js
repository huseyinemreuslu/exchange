const { z } = require("zod");

const portfolioSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid("Invalid user ID"),
});

module.exports = {
  portfolioSchema,
};
