import * as CodeChefService from '../../services/platforms/codechef.service.js';
import asyncHandler from '../../utils/async-handler.util.js';

const getUserInfo = asyncHandler(async (req, res) => {
  const { username, includeAchievements, includeContests } = req.query;
  const data = await CodeChefService.getUserInfo(
    username,
    includeAchievements,
    includeContests,
  );
  return res.status(200).json(data);
});

const getUserSubmissions = asyncHandler(async (req, res) => {
  const { username } = req.query;
  const data = await CodeChefService.getUserSubmissions(username);
  return res.status(200).json(data);
});

export { getUserInfo, getUserSubmissions };
