import {
  githubGraphQlQuery,
  githubRestApiQuery,
} from '../../api/axiosInstance.js';
import { getGithubBadges } from '../../services/platforms/github.service.js';
import {
  GITHUB_API_QUERIES,
  GITHUB_REPO_DATA_PAGE_SIZE,
} from '../../constants/index.js';
import { getNormalizedGithubHeatmap } from '../calendar.util.js';

const getUserProfileData = async (username) => {
  const data = await githubRestApiQuery(`/users/${username}`);
  if (data == null) return null;
  return data;
};

const getCommitsPerRepo = async (reponame, username) => {
  const query = GITHUB_API_QUERIES.GITHUB_REPO_TOTAL_COMMITS_COUNT_QUERY;
  const commitCount = await githubGraphQlQuery(query, { username, reponame });
  if (commitCount == null) return 0;
  return commitCount;
};

const getGithubPinnedRepos = async (username) => {
  const query = GITHUB_API_QUERIES.GITHUB_PINNED_REPOS_QUERY;
  const pinnedRepoData = await githubGraphQlQuery(query, { username });
  if (
    pinnedRepoData == null ||
    pinnedRepoData['data']['user']['pinnedItems']['nodes'] == null
  )
    return [];
  return pinnedRepoData['data']['user']['pinnedItems']['nodes'];
};

const getYearlyContributionCount = async (username, year) => {
  const query = GITHUB_API_QUERIES.GITHUB_CONTRIBUTION_COUNT_QUERY;
  const contributionCountData = await githubGraphQlQuery(query, {
    username,
    from: `${year}-01-01T00:00:00Z`,
    to: `${year}-12-31T23:59:59Z`,
  });
  if (contributionCountData == null) return null;
  return contributionCountData['data']['user']['contributionsCollection'];
};

const getMultiYearContributionCount = async (username, startYear, endYear) => {
  let contributionCount = {
    pullRequestsCount: 0,
    issuesCount: 0,
    commitsCount: 0,
    pullRequestReviewsCount: 0,
    repositoriesCount: 0,
    restrictedContributionCount: 0,
  };

  const start = parseInt(startYear);
  const end = parseInt(endYear);

  for (let year = start; year <= end; year++) {
    const yearlyContributions = await getYearlyContributionCount(
      username,
      year,
    );
    if (!yearlyContributions) continue;

    contributionCount.pullRequestsCount +=
      yearlyContributions.pullRequestContributions?.totalCount || 0;
    contributionCount.issuesCount +=
      yearlyContributions.issueContributions?.totalCount || 0;
    contributionCount.commitsCount +=
      yearlyContributions.totalCommitContributions || 0;
    contributionCount.pullRequestReviewsCount +=
      yearlyContributions.pullRequestReviewContributions?.totalCount || 0;
    contributionCount.repositoriesCount +=
      yearlyContributions.repositoryContributions?.totalCount || 0;
    contributionCount.restrictedContributionCount +=
      yearlyContributions.restrictedContributionsCount || 0;
  }
  return contributionCount;
};

const getLastYearContributionCalendar = async (username) => {
  const query = GITHUB_API_QUERIES.GITHUB_LAST_YEAR_CONTRIBUTION_CALENDAR_QUERY;
  const contributionCalendarData = await githubGraphQlQuery(query, {
    username,
  });
  if (contributionCalendarData == null) return {};
  else
    return getNormalizedGithubHeatmap(
      contributionCalendarData['data']['user']['contributionsCollection'][
        'contributionCalendar'
      ]['weeks'],
    );
};

const getYearlyContributionCalendar = async (username, year) => {
  const query = GITHUB_API_QUERIES.GITHUB_YEARLY_CONTRIBUTION_CALENDAR_QUERY;
  const contributionCalendarData = await githubGraphQlQuery(query, {
    username,
    from: `${year}-01-01T00:00:00Z`,
    to: `${year}-12-31T23:59:59Z`,
  });
  if (contributionCalendarData == null) return {};
  return getNormalizedGithubHeatmap(
    contributionCalendarData['data']['user']['contributionsCollection'][
      'contributionCalendar'
    ]['weeks'],
  );
};

const getMultiYearContributionCalendar = async (
  username,
  startYear,
  endYear,
) => {
  let contributionCalendar = {};
  const start = parseInt(startYear);
  const end = parseInt(endYear);

  for (let year = start; year <= end; year++) {
    contributionCalendar[year] = await getYearlyContributionCalendar(
      username,
      year,
    );
  }
  return contributionCalendar;
};

const getUserRepos = async (username, repoCount) => {
  let userReposStat = [];

  for (let i = 0; i < Math.ceil(repoCount / 100); i++) {
    const userRepoData = await githubRestApiQuery(
      `/users/${username}/repos?per_page=${GITHUB_REPO_DATA_PAGE_SIZE}&page=${i + 1}`,
    );
    if (userRepoData != null) {
      for (let j = 0; j < userRepoData.length; j++) {
        const repoData = userRepoData[j];
        userReposStat.push(repoData);
      }
    }
  }

  return userReposStat;
};

const getGithubContributionBadges = async (username) => {
  try {
    const githubBadgesResponse = await getGithubBadges(username);
    return githubBadgesResponse;
  } catch (error) {
    console.log('Error occurred while fetching github badges: ', error.message);
    console.log(error.stack);
    return [];
  }
};

const getRepoLanguages = async (username, repoName) => {
  const data = await githubRestApiQuery(
    `/repos/${username}/${repoName}/languages`,
  );
  if (data == null) return {};
  return data;
};

const getUserLanguageStats = async (username) => {
  try {
    const userData = await getUserProfileData(username);
    const repoCount = userData['public_repos'];

    const userReposStat = await getUserRepos(username, repoCount);

    const userReposLanguageStats = await Promise.all(
      userReposStat.map((repoData) =>
        getRepoLanguages(username, repoData.name),
      ),
    );

    const languageUsageInBytes = {};

    for (let i = 0; i < userReposLanguageStats.length; i++) {
      Object.keys(userReposLanguageStats[i]).forEach((language) => {
        languageUsageInBytes[language] =
          (languageUsageInBytes[language] || 0) +
          userReposLanguageStats[i][language];
      });
    }

    return languageUsageInBytes;
  } catch (error) {
    console.log(
      'Error occurred while fetching github language stats: ',
      error.message,
    );
    console.log(error.stack);
    return [];
  }
};

const getProfileReadme = async (username) => {
  const query = GITHUB_API_QUERIES.GITHUB_PROFILE_README_QUERY;
  const profileReadmeData = await githubGraphQlQuery(query, { username });
  if (
    profileReadmeData == null ||
    profileReadmeData['data']['user']['profileReadmeRepo'] == null
  )
    return null;
  return profileReadmeData['data']['user']['profileReadmeRepo'];
};

const getUserStarsAndForks = async (username) => {
  let starsCount = 0,
    forksCount = 0;
  const repoCount = (await getUserProfileData(username))?.public_repos;

  for (let i = 0; i < Math.ceil(repoCount / GITHUB_REPO_DATA_PAGE_SIZE); i++) {
    const userRepoData = await githubRestApiQuery(
      `/users/${username}/repos?per_page=${GITHUB_REPO_DATA_PAGE_SIZE}&page=${i + 1}`,
    );
    if (userRepoData != null) {
      for (let j = 0; j < userRepoData.length; j++) {
        const repoData = userRepoData[j];
        starsCount += repoData.stargazers_count;
        forksCount += repoData.forks_count;
      }
    }
  }

  return { starsCount, forksCount };
};

export {
  getCommitsPerRepo,
  getUserProfileData,
  getUserRepos,
  getRepoLanguages,
  getGithubContributionBadges,
  getUserLanguageStats,
  getProfileReadme,
  getYearlyContributionCalendar,
  getMultiYearContributionCalendar,
  getGithubPinnedRepos,
  getUserStarsAndForks,
  getMultiYearContributionCount,
  getLastYearContributionCalendar,
};
