const { z } = require("zod");

const shareSchema = z.object({
  name: z.string().min(1, "Name is required"),
  symbol: z
    .string()
    .length(3, "Symbol must be exactly 3 characters")
    .regex(/^[A-Z]+$/, "Symbol must be uppercase letters"),
  rate: z.number().positive("Rate must be a positive number"),
  amount: z.number().gte(0),
  usedAmount: z.number().gte(0).optional(),
});

module.exports = {
  shareSchema,
};
