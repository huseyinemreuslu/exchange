const { z } = require("zod");

const transactionSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  shareId: z.string().uuid("Invalid share ID"),
  type: z.enum(["BUY", "SELL"]),
  amount: z.number().positive("Amount must be a positive number"),
  price: z.number().positive("Price must be a positive number"),
});

module.exports = {
  transactionSchema,
};
