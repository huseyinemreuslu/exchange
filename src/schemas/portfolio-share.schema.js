const { z } = require("zod");

const portfolioShareSchema = z.object({
  portfolioId: z.string().uuid(),
  shareId: z.string().uuid(),
  amount: z.number().int().min(1),
});

module.exports = portfolioShareSchema;
