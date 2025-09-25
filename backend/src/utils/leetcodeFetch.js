import { leetCodeQuery } from "./axiosInstance.js";
import { leetCodeApiQueries } from "./constants.js";

const getLeetCodeProblemsCount = async (username) => {
    const query = leetCodeApiQueries.LEETCODE_USER_PROBLEMS_SOLVED_QUERY;
    const variables = { username };
    const data = (await leetCodeQuery(query, variables)).data;
    if (data) return data["matchedUser"]["submitStats"];
    return data;
}

const getLeetCodeUserStreaksAndCalendar = async (username) => {
    const query = leetCodeApiQueries.LEETCODE_USER_STREAKS_CALENDAR_QUERY;
    const variables = { username };
    const data = (await leetCodeQuery(query, variables)).data;
    if (data) return data["matchedUser"]["userCalendar"];
    return data;
}

const getLeetCodeContestData = async (username) => {
    const query = leetCodeApiQueries.LEETCODE_CONTEST_DATA_QUERY;
    const variables = { username };
    const data = (await leetCodeQuery(query, variables)).data;
    if (data) return data["userContestRanking"];
    return data;
}

const getLeetCodeProfileInfo = async (username) => {
    const query = leetCodeApiQueries.LEETCODE_PROFILE_INFO_QUERY;
    const variables = { username };
    const data = (await leetCodeQuery(query, variables)).data;
    if (data) return data["matchedUser"]["profile"];
    return data;
}

const getLeetCodeBadges = async (username) => {
    const query = leetCodeApiQueries.LEETCODE_BADGES_QUERY;
    const variables = { username };
    const data = (await leetCodeQuery(query, variables)).data;
    if (data) return data["matchedUser"];
    return data;
}

const getLeetCodeTopicWiseProblems = async (username) => {
    const query = leetCodeApiQueries.LEETCODE_TOPIC_WISE_PROBLEMS_QUERY;
    const variables = { username };
    const data = (await leetCodeQuery(query, variables)).data;
    if (data) return data["matchedUser"]["tagProblemCounts"];
    return data;
}

export {
    getLeetCodeProblemsCount,
    getLeetCodeUserStreaksAndCalendar,
    getLeetCodeContestData,
    getLeetCodeProfileInfo,
    getLeetCodeBadges,
    getLeetCodeTopicWiseProblems,
}