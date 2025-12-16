import { SCRAPE_SPIDEY_API_KEY } from '../../config/config.js';
import { scrapeSpideyApiQuery } from '../../api/axiosInstance.js';

const fetchGfgUserData = async (username) => {
    const data = await scrapeSpideyApiQuery(`/api/v1/gfg/user/profile?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}&includeContest=true`);
    console.log('fetchGfgUserData execution complete');
    return data;
};

const fetchGfgUserMultiYearSubmissionData = async (username) => {
    const startYear = 2016;
    const currentYear = new Date().getFullYear();

    const years = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => startYear + i
    );

    const fetchPromises = years.map(year =>
        scrapeSpideyApiQuery(`/api/v2/gfg/user/submissions?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}&year=${year}`)
            .then(data => ({ year, data }))
    );

    const results = await Promise.all(fetchPromises);

    const submissionData = {};
    results.forEach(({ year, data }) => {
        submissionData[year] = data;
    });

    console.log('fetchGfgUserMultiYearSubmissionData execution complete');
    return submissionData;
};

const fetchCode360UserData = async (username) => {
    const data = await scrapeSpideyApiQuery(`/api/v1/code360/user/profile?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}&includeContests=true&includeAchievements=true`);
    console.log('fetchCode360UserData execution complete');
    return data;
};

const fetchCode360UserMultiYearSubmissionData = async (username) => {
    const startYear = 2020;
    const currentYear = new Date().getFullYear();

    const years = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => startYear + i
    );

    const fetchPromises = years.map(year =>
        scrapeSpideyApiQuery(`/api/v1/code360/user/submission?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}&year=${year}`)
            .then(data => ({ year, data }))
    );

    const results = await Promise.all(fetchPromises);

    const submissionData = {};
    results.forEach(({ year, data }) => {
        submissionData[year] = data;
    });

    console.log('fetchCode360UserMultiYearSubmissionData execution complete');
    return submissionData;
};

const fetchCodeChefUserData = async (username) => {
    const data = await scrapeSpideyApiQuery(`/api/v1/codechef/user/profile?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}&includeContests=true&includeAchievements=true`);
    console.log('fetchCodeChefUserData execution complete');
    return data;
};

const fetchCodeChefUserSubmissionData = async (username) => {
    const data = await scrapeSpideyApiQuery(`/api/v1/codechef/user/submissions?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}`);
    console.log('fetchCodeChefUserSubmissionData execution complete');
    return data;
};

const fetchInterviewbitUserData = async (username) => {
    const data = await scrapeSpideyApiQuery(`/api/v2/interviewbit/user/profile?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}`);
    console.log('fetchInterviewbitUserData execution complete');
    return data;
};

const fetchInterviewbitBadgesData = async (username) => {
    const data = await scrapeSpideyApiQuery(`/api/v1/interviewbit/user/badges?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}`);
    console.log('fetchInterviewbitBadgesData execution complete');
    return data;
};

const fetchInterviewbitUserMultiYearSubmissionData = async (username) => {
    const startYear = 2015;
    const currentYear = new Date().getFullYear();

    const years = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => startYear + i
    );

    const fetchPromises = years.map(year =>
        scrapeSpideyApiQuery(`/api/v2/interviewbit/user/submissions?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}&year=${year}`)
            .then(data => ({ year, data }))
    );

    const results = await Promise.all(fetchPromises);

    const submissionData = {};
    results.forEach(({ year, data }) => {
        submissionData[year] = data;
    });

    console.log('fetchInterviewbitUserMultiYearSubmissionData execution complete');
    return submissionData;
};

const fetchHackerRankUserData = async (username) => {
    const data = await scrapeSpideyApiQuery(`/api/v2/hackerrank/user/profile?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}`);
    console.log('fetchHackerRankUserData execution complete');
    return data;
};

export {
    fetchGfgUserData,
    fetchGfgUserMultiYearSubmissionData,
    fetchCodeChefUserData,
    fetchCodeChefUserSubmissionData,
    fetchInterviewbitUserData,
    fetchInterviewbitBadgesData,
    fetchInterviewbitUserMultiYearSubmissionData,
    fetchHackerRankUserData,
    fetchCode360UserData,
    fetchCode360UserMultiYearSubmissionData,
};