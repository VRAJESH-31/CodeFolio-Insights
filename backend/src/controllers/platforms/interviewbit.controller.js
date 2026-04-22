import * as InterviewBitService from '../../services/platforms/interviewbit.service.js';
import asyncHandler from '../../utils/async-handler.util.js';

const getUserInfo = asyncHandler(async (req, res) => {
  const { username } = req.query;
  const data = await InterviewBitService.getUserInfo(username);
  return res.status(200).json(data);
});

const getUserSubmissions = asyncHandler(async (req, res) => {
  const { username, year } = req.query;
  const data = await InterviewBitService.getUserSubmissions(username, year);
  return res.status(200).json(data);
});

const getUserBadges = asyncHandler(async (req, res) => {
  const { username } = req.query;
  const data = await InterviewBitService.getUserBadges(username);
  return res.status(200).json(data);
});

export { getUserInfo, getUserSubmissions, getUserBadges };
