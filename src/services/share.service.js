const NotFoundError = require("../utils/errors/not-found.error");
const BadRequestError = require("../utils/errors/bad-request.error");
const Share = require("../models/share.model");
const { shareSchema } = require("../schemas/share.schema");

const createShare = async (shareData) => {
  const result = shareSchema.safeParse(shareData);

  if (!result.success) {
    throw BadRequestError("Invalid share data", {
      errors: result.error.errors,
    });
  }

  const existingShare = await Share.findOne({
    where: { symbol: result.data.symbol },
  });
  if (existingShare) {
    throw BadRequestError("A share with this symbol already exists.");
  }

  const share = await Share.create(result.data);
  return share;
};

const updateShare = async (shareId, shareData) => {
  const result = shareSchema.partial().safeParse(shareData);

  if (!result.success) {
    throw BadRequestError("Invalid share data", {
      errors: result.error.errors,
    });
  }

  const share = await Share.findByPk(shareId);
  if (!share) {
    throw NotFoundError("Share not found.");
  }

  if (result.data.symbol) {
    const existingShareWithSymbol = await Share.findOne({
      where: { symbol: result.data.symbol },
    });
    if (existingShareWithSymbol && existingShareWithSymbol.id !== shareId) {
      throw BadRequestError("A share with this symbol already exists.");
    }
  }

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  console.log(result.data);

  if (
    result.data.rate &&
    (share.updatedAt > oneHourAgo || share.createdAt > oneHourAgo)
  ) {
    throw BadRequestError(
      "Cannot update a share's rate that was created or updated within the last hour."
    );
  }

  share.name = result.data.name || share.name;
  share.symbol = result.data.symbol || share.symbol;
  share.rate = result.data.rate || share.rate;

  await share.save();
  return share;
};

const getShare = async (shareId) => {
  const share = await Share.findByPk(shareId);
  if (!share) {
    throw NotFoundError("Share not found.");
  }
  return share;
};

const deleteShare = async (shareId) => {
  const share = await Share.findByPk(shareId);
  if (!share) {
    throw NotFoundError("Share not found.");
  }

  await Share.destroy({ where: { id: shareId } });
  return { message: "Share deleted successfully" };
};

module.exports = {
  getShare,
  createShare,
  updateShare,
  deleteShare,
};
