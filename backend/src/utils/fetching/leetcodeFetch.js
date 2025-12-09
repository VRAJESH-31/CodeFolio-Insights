import { leetCodeQuery } from "../../api/axiosInstance.js";
import { leetCodeApiQueries } from "../../constant/constants.js";

const getNormalizedLeetCodeHeatmap = (heatmap, year) => {
    if (!heatmap || typeof heatmap !== 'object' || Array.isArray(heatmap) || typeof year !== 'number' || year < 1900) {
        return {}; 
    }

    const completedHeatmap = {};
    for (const timestampKey in heatmap) {
        if (heatmap.hasOwnProperty(timestampKey)) {
            const timestampSeconds = parseInt(timestampKey, 10);
            const timestampMilliseconds = timestampSeconds * 1000;
            const date = new Date(timestampMilliseconds);
            
            const y = date.getUTCFullYear();
            const m = String(date.getUTCMonth() + 1).padStart(2, '0');
            const d = String(date.getUTCDate()).padStart(2, '0');

            const normalizedKey = `${y}-${m}-${d}`;
            completedHeatmap[normalizedKey] = heatmap[timestampKey];
        }
    }

    const startDate = new Date(Date.UTC(year, 0, 1));
    const endDate = new Date(Date.UTC(year, 11, 31));
    
    for (let currentDate = startDate; currentDate <= endDate; currentDate.setUTCDate(currentDate.getUTCDate() + 1)) {

        const currentYear = currentDate.getUTCFullYear();
        
        if (currentYear === year) {
            const currentMonth = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
            const currentDay = String(currentDate.getUTCDate()).padStart(2, '0');
            const dateKey = `${currentYear}-${currentMonth}-${currentDay}`;

            if (!completedHeatmap.hasOwnProperty(dateKey)) {
                completedHeatmap[dateKey] = 0;
            }
        }
    }

    return completedHeatmap;
};

const getLeetCodeProblemsCount = async (username) => {
    const query = leetCodeApiQueries.LEETCODE_USER_PROBLEMS_SOLVED_QUERY;
    const variables = { username };
    const data = (await leetCodeQuery(query, variables)).data;
    if (data) return data["matchedUser"]["submitStats"];
    return null;
}

const getLeetCodeUserStreaksAndCalendar = async (username, year) => {
    const query = leetCodeApiQueries.LEETCODE_USER_STREAKS_CALENDAR_QUERY;
    const variables = { username, year };
    const data = (await leetCodeQuery(query, variables)).data;
    data["matchedUser"]["userCalendar"]["submissionCalendar"] = getNormalizedLeetCodeHeatmap(JSON.parse(data["matchedUser"]["userCalendar"]["submissionCalendar"]), year);
    if (data) return data["matchedUser"]["userCalendar"];
    return data;
}

const getLeetCodeContestData = async (username) => {
    const query = leetCodeApiQueries.LEETCODE_CONTEST_DATA_QUERY;
    const variables = { username };
    const data = (await leetCodeQuery(query, variables)).data;
    if (data) return data;
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