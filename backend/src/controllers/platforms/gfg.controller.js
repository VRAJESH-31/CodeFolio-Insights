import * as GfgService from '../../services/platforms/gfg.service.js';
import asyncHandler from '../../utils/async-handler.util.js';

const getUserInfo = asyncHandler(async (req, res) => {
  const { username } = req.query;
  const data = await GfgService.getUserInfo(username);
  return res.status(200).json(data);
});

const getUserSubmissions = asyncHandler(async (req, res) => {
  const { username, year } = req.query;
  const data = await GfgService.getUserSubmissions(username, year);
  return res.status(200).json(data);
});

const getQuestionOfToday = asyncHandler(async (req, res) => {
  const data = await GfgService.getQuestionOfToday();
  return res.status(200).json(data);
});

const getUserProblemsSolved = asyncHandler(async (req, res) => {
  const { username } = req.query;
  const data = await GfgService.getUserProblemsSolved(username);
  return res.status(200).json(data);
});

const getInstitutionTopThreeRankedUsers = asyncHandler(async (req, res) => {
  const { institution } = req.query;
  const data = await GfgService.getInstitutionTopThreeRankedUsers(institution);
  return res.status(200).json(data);
});

const getInstitutionInfo = asyncHandler(async (req, res) => {
  const { institution } = req.query;
  const data = await GfgService.getInstitutionInfo(institution);
  return res.status(200).json(data);
});

const getMonthlyPotds = asyncHandler(async (req, res) => {
  const { year, month } = req.query;
  const data = await GfgService.getMonthlyPotds(year, month);
  return res.status(200).json(data);
});

export {
  getUserInfo,
  getUserSubmissions,
  getQuestionOfToday,
  getUserProblemsSolved,
  getInstitutionTopThreeRankedUsers,
  getInstitutionInfo,
  getMonthlyPotds,
};
