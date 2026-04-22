import * as GithubService from '../../services/platforms/github.service.js';
import asyncHandler from '../../utils/async-handler.util.js';

const getGithubBadges = asyncHandler(async (req, res) => {
  const { username } = req.query;
  const data = await GithubService.getGithubBadges(username);
  return res.status(200).json(data);
});

export { getGithubBadges };
