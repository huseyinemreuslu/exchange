const shareService = require("../services/share.service");
const asyncHandler = require("../middlewares/async-handler.middleware");
const wrapAsyncHandler = require("../utils/wrappers/async-handler.wrapper");

const createShare = asyncHandler(async (req, res) => {
  const result = await shareService.createShare(req.body);
  res.status(201).json(result);
});

const updateShare = asyncHandler(async (req, res) => {
  const result = await shareService.updateShare(req.params.shareId, req.body);
  res.status(200).json(result);
});

const getShare = asyncHandler(async (req, res) => {
  const result = await shareService.getShare(req.params.shareId);
  res.status(200).json(result);
});

const deleteShare = asyncHandler(async (req, res) => {
  const result = await shareService.deleteShare(req.params.shareId);
  res.status(200).json(result);
});

module.exports = wrapAsyncHandler({
  createShare,
  updateShare,
  getShare,
  deleteShare,
});
