import * as HackerRankService from '../../services/platforms/hackerrank.service.js';
import asyncHandler from '../../utils/async-handler.util.js';

const getUserInfo = asyncHandler(async (req, res) => {
  const { username } = req.query;
  const data = await HackerRankService.getUserInfo(username);
  return res.status(200).json(data);
});

export { getUserInfo };
