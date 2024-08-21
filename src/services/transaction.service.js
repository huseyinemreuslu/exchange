const { transactionSchema } = require("../schemas/transaction.schema");
const Transaction = require("../models/transaction.model");
const BadRequestError = require("../utils/errors/bad-request.error");

const createTransaction = async (transactionData) => {
  const result = transactionSchema.safeParse(transactionData);

  if (!result.success) {
    throw BadRequestError("Invalid transaction data", {
      errors: result.error.errors,
    });
  }

  const transaction = await Transaction.create(result.data);

  return transaction;
};

module.exports = {
  createTransaction,
};
