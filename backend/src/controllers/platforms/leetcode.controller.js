import * as LeetCodeService from '../../services/platforms/leetcode.service.js';
import asyncHandler from '../../utils/async-handler.util.js';

const getUserProfile = asyncHandler(async (req, res) => {
  const { username } = req.query;
  const data = await LeetCodeService.getUserProfile(username);
  return res.status(200).json(data);
});

const getUserCalendar = asyncHandler(async (req, res) => {
  const { username, year } = req.query;
  const data = await LeetCodeService.getUserCalendar(username, year);
  return res.status(200).json(data);
});

const getUserBadges = asyncHandler(async (req, res) => {
  const { username } = req.query;
  const data = await LeetCodeService.getUserBadges(username);
  return res.status(200).json(data);
});

const getContestRanking = asyncHandler(async (req, res) => {
  const { username } = req.query;
  const data = await LeetCodeService.getContestRanking(username);
  return res.status(200).json(data);
});

const getQuestionOfToday = asyncHandler(async (req, res) => {
  const data = await LeetCodeService.getQuestionOfToday();
  return res.status(200).json(data);
});

const getUpcomingContests = asyncHandler(async (req, res) => {
  const data = await LeetCodeService.getUpcomingContests();
  return res.status(200).json(data);
});

const getGlobalTopRankers = asyncHandler(async (req, res) => {
  const { page } = req.query;
  const data = await LeetCodeService.getGlobalTopRankers(page);
  return res.status(200).json(data);
});

const getLanguageStats = asyncHandler(async (req, res) => {
  const { username } = req.query;
  const data = await LeetCodeService.getLanguageStats(username);
  return res.status(200).json(data);
});

const getRecentAcSubmissions = asyncHandler(async (req, res) => {
  const { username, limit } = req.query;
  const data = await LeetCodeService.getRecentAcSubmissions(username, limit);
  return res.status(200).json(data);
});

const getSkillStats = asyncHandler(async (req, res) => {
  const { username } = req.query;
  const data = await LeetCodeService.getSkillStats(username);
  return res.status(200).json(data);
});

const getUserProfileQuestionProgressV2 = asyncHandler(async (req, res) => {
  const { username } = req.query;
  const data = await LeetCodeService.getUserProfileQuestionProgressV2(username);
  return res.status(200).json(data);
});

const getUserSessionProgress = asyncHandler(async (req, res) => {
  const { username } = req.query;
  const data = await LeetCodeService.getUserSessionProgress(username);
  return res.status(200).json(data);
});

const getContestRatingHistogram = asyncHandler(async (req, res) => {
  const data = await LeetCodeService.getContestRatingHistogram();
  return res.status(200).json(data);
});

const getCodingChallengeMedal = asyncHandler(async (req, res) => {
  const { year, month } = req.query;
  const data = await LeetCodeService.getCodingChallengeMedal(year, month);
  return res.status(200).json(data);
});

const getCreatedPublicFavoriteList = asyncHandler(async (req, res) => {
  const { username } = req.query;
  const data = await LeetCodeService.getCreatedPublicFavoriteList(username);
  return res.status(200).json(data);
});

export { getUserProfile, getLanguageStats, getUserCalendar, getRecentAcSubmissions, getUserBadges, getContestRanking, getSkillStats, getUserProfileQuestionProgressV2, getUserSessionProgress, getContestRatingHistogram, getQuestionOfToday, getCodingChallengeMedal, getUpcomingContests, getGlobalTopRankers, getCreatedPublicFavoriteList };
