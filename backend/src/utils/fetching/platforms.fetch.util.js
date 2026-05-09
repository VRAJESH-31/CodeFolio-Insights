import * as gfgService from '../../services/platforms/gfg.service.js';
import * as codeChefService from '../../services/platforms/codechef.service.js';
import * as interviewbitService from '../../services/platforms/interviewbit.service.js';
import * as code360Service from '../../services/platforms/code360.service.js';
import * as leetcodeService from '../../services/platforms/leetcode.service.js';
import * as hackerrankService from '../../services/platforms/hackerrank.service.js';
import * as githubFetching from './github.fetch.util.js';
import ApiError from '../../utils/api-error.util.js';

const fetchMultiYearSubmissionData = async (username, startYear, fetchFunction) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);

  const results = await Promise.all(
    years.map(async (year) => {
      try {
        const data = await fetchFunction(username, year);
        return { year, data };
      } catch (error) {
        console.error(`Error fetching data for year ${year}:`, error.message);
        return { year, data: null };
      }
    }),
  );

  return results.reduce((acc, { year, data }) => {
    acc[year] = data;
    return acc;
  }, {});
};

const fetchGfgData = async (username, year = null) => {
  const profile = await gfgService.getUserInfo(username);
  if (!profile) throw new ApiError(404, 'GeeksForGeeks profile does not exist or something went wrong.');

  const submissionPromise = year
    ? (async () => ({
        [year]: await gfgService.getUserSubmissions(username, year),
      }))()
    : fetchMultiYearSubmissionData(username, 2016, gfgService.getUserSubmissions);

  const [submission] = await Promise.all([submissionPromise]);

  return { profile, submission };
};

const fetchCodeChefData = async (username) => {
  const profile = await codeChefService.getUserInfo(username, true, true);
  if (!profile) throw new ApiError(404, 'CodeChef profile does not exist or something went wrong.');

  const [submission] = await Promise.all([codeChefService.getUserSubmissions(username)]);

  return { profile, submission };
};

const fetchInterviewbitData = async (username, year = null) => {
  const profile = await interviewbitService.getUserInfo(username, true, true);
  if (!profile) throw new ApiError(404, 'InterviewBit profile does not exist or something went wrong.');

  const submissionPromise = year
    ? (async () => ({
        [year]: await interviewbitService.getUserSubmissions(username, year),
      }))()
    : fetchMultiYearSubmissionData(username, 2015, interviewbitService.getUserSubmissions);

  const [badges, submission] = await Promise.all([interviewbitService.getUserBadges(username), submissionPromise]);

  return { profile, badges, submission };
};

const fetchCode360Data = async (username, year = null) => {
  const profile = await code360Service.getUserInfo(username, true);
  if (!profile) throw new ApiError(404, 'Code360 profile does not exist or something went wrong.');

  const submissionPromise = year
    ? (async () => ({
        [year]: await code360Service.getUserSubmissions(username, year),
      }))()
    : fetchMultiYearSubmissionData(username, 2020, code360Service.getUserSubmissions);

  const [submission] = await Promise.all([submissionPromise]);

  return { profile, submission };
};

const fetchLeetCodeData = async (username, year = null) => {
  const profile = await leetcodeService.getUserProfile(username);
  if (!profile) throw new ApiError(404, 'LeetCode profile does not exist or something went wrong.');

  const submissionPromise = year
    ? (async () => ({
        [year]: await leetcodeService.getUserCalendar(username, year),
      }))()
    : fetchMultiYearSubmissionData(username, 2015, leetcodeService.getUserCalendar);

  const [sessionProgress, badges, contest, submission, topicStats] = await Promise.all([leetcodeService.getUserSessionProgress(username), leetcodeService.getUserBadges(username), leetcodeService.getContestRanking(username), submissionPromise, leetcodeService.getSkillStats(username)]);

  return {
    profile,
    badges,
    contest,
    problems: sessionProgress?.userStats,
    submission,
    topicStats,
  };
};

const fetchHackerRankData = async (username) => {
  const profile = await hackerrankService.getUserInfo(username);
  if (!profile) throw new ApiError(404, 'HackerRank profile does not exist or something went wrong.');
  return { profile };
};

const fetchGitHubData = async (username) => {
  const profile = await githubFetching.getUserProfileData(username);
  if (!profile) throw new ApiError(404, 'GitHub profile does not exist or something went wrong.');

  const startYear = profile?.created_at ? new Date(profile.created_at).getFullYear() : null;
  const currentYear = new Date().getFullYear();

  const [contributions, calendar, badges, languageStats, starsAndForks] = await Promise.all([startYear ? githubFetching.getMultiYearContributionCount(username, startYear, currentYear) : Promise.resolve(null), startYear ? githubFetching.getMultiYearContributionCalendar(username, startYear, currentYear) : Promise.resolve(null), githubFetching.getGithubContributionBadges(username), githubFetching.getUserLanguageStats(username), githubFetching.getUserStarsAndForks(username)]);

  return {
    profile,
    contributions,
    calendar,
    badges,
    languageStats,
    starsAndForks,
  };
};

export { fetchGfgData, fetchCodeChefData, fetchInterviewbitData, fetchCode360Data, fetchLeetCodeData, fetchHackerRankData, fetchGitHubData };
