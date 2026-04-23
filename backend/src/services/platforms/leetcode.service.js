import axios from 'axios';
import {
  LEETCODE_GRAPHQL_ENDPOINT,
  LEETCODE_GRAPHQL_QUERIES,
  LEETCODE_HEADERS,
} from '../../constants/index.js';
import { getNormalizedLeetCodeHeatmap } from '../../utils/calendar.util.js';

const makeApiCall = async (query, variables = {}) => {
  try {
    const { data } = await axios.post(
      LEETCODE_GRAPHQL_ENDPOINT,
      { query, variables },
      {
        headers: LEETCODE_HEADERS,
        timeout: 30000,
      },
    );
    return data.data;
  } catch (error) {
    console.error('LeetCode Request Error: ', error.message);
    console.log(error.stack);
    return null;
  }
};

const getUserProfile = async (username) => {
  const data = await makeApiCall(LEETCODE_GRAPHQL_QUERIES.userProfile, {
    username,
  });
  return data?.matchedUser;
};

const getLanguageStats = async (username) => {
  const data = await makeApiCall(LEETCODE_GRAPHQL_QUERIES.userLanguageStats, {
    username,
  });
  return data?.matchedUser?.languageProblemCount;
};

const getUserCalendar = async (username, year) => {
  const data = await makeApiCall(LEETCODE_GRAPHQL_QUERIES.userProfileCalendar, {
    username,
    year,
  });
  if (data?.['matchedUser']?.['userCalendar']?.['submissionCalendar']) {
    return getNormalizedLeetCodeHeatmap(
      JSON.parse(data['matchedUser']['userCalendar']['submissionCalendar']),
      year,
    );
  }
  return null;
};

const getRecentAcSubmissions = async (username, limit = 10) => {
  const data = await makeApiCall(LEETCODE_GRAPHQL_QUERIES.recentAcSubmissions, {
    username,
    limit,
  });
  return data?.recentAcSubmissionList;
};

const getUserBadges = async (username) => {
  const data = await makeApiCall(LEETCODE_GRAPHQL_QUERIES.userBadges, {
    username,
  });
  if (
    data?.['matchedUser']?.['activeBadge']?.['icon'] &&
    !data['matchedUser']['activeBadge']['icon'].startsWith('http')
  ) {
    data['matchedUser']['activeBadge']['icon'] =
      'https://leetcode.com' + data['matchedUser']['activeBadge']['icon'];
  }
  data['matchedUser']['badges'].forEach((badge) => {
    if (badge['icon'] && !badge['icon'].startsWith('http')) {
      badge['icon'] = 'https://leetcode.com' + badge['icon'];
    }
  });
  return data?.matchedUser;
};

const getContestRanking = async (username) => {
  const data = await makeApiCall(LEETCODE_GRAPHQL_QUERIES.userContestRankings, {
    username,
  });
  if (
    data?.['userContestRanking']?.['badge']?.['icon'] &&
    !data?.['userContestRanking']?.['badge']?.['icon']?.startsWith('http')
  )
    data['userContestRanking']['badge']['icon'] =
      'https://leetcode.com' + data['userContestRanking']['badge']['icon'];
  return data;
};

const getSkillStats = async (username) => {
  const data = await makeApiCall(LEETCODE_GRAPHQL_QUERIES.skillStats, {
    username,
  });
  return data?.matchedUser?.tagProblemCounts;
};

const getQuestionOfToday = async () => {
  const data = await makeApiCall(LEETCODE_GRAPHQL_QUERIES.questionOfToday, {});
  return data?.activeDailyCodingChallengeQuestion;
};

const getUpcomingContests = async () => {
  const data = await makeApiCall(LEETCODE_GRAPHQL_QUERIES.upcomingContests, {});
  return data?.upcomingContests;
};

const getGlobalTopRankers = async (page = 1) => {
  const data = await makeApiCall(LEETCODE_GRAPHQL_QUERIES.globalTopRankers, {
    page,
  });
  data?.globalRanking?.rankingNodes?.map((node) => {
    node.ranking = JSON.parse(node.ranking);
    node.currentRating = parseInt(node.currentRating);
  });
  return data?.globalRanking;
};

const getUserProfileQuestionProgressV2 = async (userSlug) => {
  const data = await makeApiCall(
    LEETCODE_GRAPHQL_QUERIES.userProfileUserQuestionProgressV2,
    { userSlug },
  );
  return data?.userProfileUserQuestionProgressV2;
};

const getUserSessionProgress = async (username) => {
  const data = await makeApiCall(LEETCODE_GRAPHQL_QUERIES.userSessionProgress, {
    username,
  });
  if (data?.matchedUser?.submitStats)
    data.userStats = data.matchedUser.submitStats;
  delete data.matchedUser;
  return data;
};

const getContestRatingHistogram = async () => {
  const data = await makeApiCall(
    LEETCODE_GRAPHQL_QUERIES.contestRatingHistogram,
    {},
  );
  return data?.contestRatingHistogram;
};

const getCodingChallengeMedal = async (year, month) => {
  const data = await makeApiCall(
    LEETCODE_GRAPHQL_QUERIES.codingChallengeMedal,
    { year, month },
  );
  return data?.dailyChallengeMedal;
};

const getCreatedPublicFavoriteList = async (userSlug) => {
  const data = await makeApiCall(
    LEETCODE_GRAPHQL_QUERIES.createdPublicFavoriteList,
    { userSlug },
  );
  return data?.createdPublicFavoriteList;
};

export {
  getUserProfile,
  getLanguageStats,
  getUserCalendar,
  getRecentAcSubmissions,
  getUserBadges,
  getContestRanking,
  getSkillStats,
  getUserProfileQuestionProgressV2,
  getUserSessionProgress,
  getContestRatingHistogram,
  getQuestionOfToday,
  getCodingChallengeMedal,
  getUpcomingContests,
  getGlobalTopRankers,
  getCreatedPublicFavoriteList,
};
