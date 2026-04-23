import * as Code360Service from '../../services/platforms/code360.service.js';
import asyncHandler from '../../utils/async-handler.util.js';

const getUserInfo = asyncHandler(async (req, res) => {
  const { username, includeContests } = req.query;
  const data = await Code360Service.getUserInfo(
    username,
    includeContests === 'true',
  );
  return res.status(200).json(data);
});

const getUserSubmissions = asyncHandler(async (req, res) => {
  const { username, year } = req.query;
  const data = await Code360Service.getUserSubmissions(username, year);
  return res.status(200).json(data);
});

export { getUserInfo, getUserSubmissions };
