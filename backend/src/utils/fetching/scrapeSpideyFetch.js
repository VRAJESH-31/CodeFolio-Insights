import { SCRAPE_SPIDEY_API_KEY } from '../../config/config.js';
import { scrapeSpideyApiQuery } from '../../api/axiosInstance.js';

const fetchGfgUserData = async (username) => {
    const data = await scrapeSpideyApiQuery(`/api/v1/gfg/user/profile?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}&includeContest=true`);
    return data;
};

const fetchGfgUserSubmissionData = async (username, year) => {
    const data = await scrapeSpideyApiQuery(`/api/v2/gfg/user/submissions?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}&year=${year}`);
    return data;
};

const fetchGfgUserMultiYearSubmissionData = async (username) => {
    const startYear = 2016;
    const currentYear = new Date().getFullYear();

    const years = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => startYear + i
    );

    const submissionData = {};
    for (const year of years) {
        try {
            const result = await fetchGfgUserSubmissionData(username, year);
            submissionData[year] = result;
        } catch (error) {
            console.error(`Error fetching GFG data for year ${year}:`, error.message);
            submissionData[year] = null;
        }
    }

    return submissionData;
};

const fetchCode360UserData = async (username) => {
    const data = await scrapeSpideyApiQuery(`/api/v1/code360/user/profile?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}&includeContests=true&includeAchievements=true`);
    return data;
};

const fetchCode360UserSubmissionData = async (username, year) => {
    const data = await scrapeSpideyApiQuery(`/api/v1/code360/user/submission?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}&year=${year}`);
    return data;
};

const fetchCode360UserMultiYearSubmissionData = async (username) => {
    const startYear = 2020;
    const currentYear = new Date().getFullYear();

    const years = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => startYear + i
    );

    const submissionData = {};
    for (const year of years) {
        try {
            const result = await fetchCode360UserSubmissionData(username, year);
            submissionData[year] = result;
        } catch (error) {
            console.error(`Error fetching Code360 data for year ${year}:`, error.message);
            submissionData[year] = null;
        }
    }

    return submissionData;
};

const fetchCodeChefUserData = async (username) => {
    const data = await scrapeSpideyApiQuery(`/api/v1/codechef/user/profile?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}&includeContests=true&includeAchievements=true`);
    return data;
};

const fetchCodeChefUserSubmissionData = async (username) => {
    const data = await scrapeSpideyApiQuery(`/api/v1/codechef/user/submissions?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}`);
    return data;
};

const fetchInterviewbitUserData = async (username) => {
    const data = await scrapeSpideyApiQuery(`/api/v2/interviewbit/user/profile?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}`);
    return data;
};

const fetchInterviewbitBadgesData = async (username) => {
    const data = await scrapeSpideyApiQuery(`/api/v1/interviewbit/user/badges?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}`);
    return data;
};

const fetchInterviewbitUserSubmissionData = async (username, year) => {
    const data = await scrapeSpideyApiQuery(`/api/v2/interviewbit/user/submissions?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}&year=${year}`);
    return data;
};

const fetchInterviewbitUserMultiYearSubmissionData = async (username) => {
    const startYear = 2015;
    const currentYear = new Date().getFullYear();

    const years = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => startYear + i
    );

    const submissionData = {};
    for (const year of years) {
        try {
            const result = await fetchInterviewbitUserSubmissionData(username, year);
            submissionData[year] = result;
        } catch (error) {
            console.error(`Error fetching Interviewbit data for year ${year}:`, error.message);
            submissionData[year] = null;
        }
    }

    return submissionData;
};

const fetchHackerRankUserData = async (username) => {
    const data = await scrapeSpideyApiQuery(`/api/v2/hackerrank/user/profile?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}`);
    return data;
};

const fetchLeetCodeProfileData = async (username) => {
    const data = await scrapeSpideyApiQuery(`/api/v1/leetcode/user/profile?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}`);
    return data;
};

const fetchLeetCodeUserSubmissionData = async (username, year) => {
    const data = await scrapeSpideyApiQuery(`/api/v1/leetcode/user/calendar?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}&year=${year}`);
    return data;
};

const fetchLeetCodeUserMultiYearSubmissionData = async (username) => {
    const startYear = 2015;
    const currentYear = new Date().getFullYear();

    const years = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => startYear + i
    );

    const submissionData = {};
    for (const year of years) {
        try {
            const result = await fetchLeetCodeUserSubmissionData(username, year);
            submissionData[year] = result?.matchedUser?.userCalendar?.submissionCalendar;
        } catch (error) {
            console.error(`Error fetching LeetCode data for year ${year}:`, error.message);
            submissionData[year] = null;
        }
    }

    return submissionData;
};

const fetchLeetCodeProblemsCount = async (username) => {
    const data = await scrapeSpideyApiQuery(`/api/v1/leetcode/user/session-progress?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}`);
    return data;
};

const fetchLeetCodeContestData = async (username) => {
    const data = await scrapeSpideyApiQuery(`/api/v1/leetcode/user/contest-ranking?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}`);
    return data;
};

const fetchLeetCodeBadgesData = async (username) => {
    const data = await scrapeSpideyApiQuery(`/api/v1/leetcode/user/badges?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}`);
    return data;
};

const fetchLeetCodeTopicWiseProblemsData = async (username) => {
    const data = await scrapeSpideyApiQuery(`/api/v1/leetcode/user/skill-stats?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}`);
    return data;
};

export {
    fetchGfgUserData,
    fetchGfgUserSubmissionData,
    fetchGfgUserMultiYearSubmissionData,
    fetchCodeChefUserData,
    fetchCodeChefUserSubmissionData,
    fetchInterviewbitUserData,
    fetchInterviewbitBadgesData,
    fetchInterviewbitUserSubmissionData,
    fetchInterviewbitUserMultiYearSubmissionData,
    fetchHackerRankUserData,
    fetchCode360UserData,
    fetchCode360UserMultiYearSubmissionData,
    fetchLeetCodeProfileData,
    fetchLeetCodeUserSubmissionData,
    fetchLeetCodeUserMultiYearSubmissionData,
    fetchLeetCodeContestData,
    fetchLeetCodeBadgesData,
    fetchLeetCodeProblemsCount,
    fetchLeetCodeTopicWiseProblemsData
};