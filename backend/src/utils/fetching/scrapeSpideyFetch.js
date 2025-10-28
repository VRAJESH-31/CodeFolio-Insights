import { SCRAPE_SPIDEY_API_KEY } from '../../config/config.js';
import { scrapeSpideyApiQuery } from '../../api/axiosInstance.js';

const fetchGfgUserData = async (username) => {
    return await scrapeSpideyApiQuery(`/api/v1/gfg/user/profile?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}&includeContest=true`);
};

const fetchGfgUserSubmissionData = async (username) => {
    return await scrapeSpideyApiQuery(`/api/v1/gfg/user/submissions?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}`);
};

const fetchCodeChefUserData = async (username) => {
    return await scrapeSpideyApiQuery(`/api/v1/codechef/user/profile?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}&includeContests=true&includeAchievements=true`);
};

const fetchCodeChefUserSubmissionData = async (username) => {
    return await scrapeSpideyApiQuery(`/api/v1/codechef/user/submissions?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}`);
};

const fetchInterviewbitUserData = async (username) => {
    return await scrapeSpideyApiQuery(`/api/v1/interviewbit/user/profile?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}&includeSubmissionStats=true&includeBadges=true`);
};

export {
    fetchGfgUserData,
    fetchGfgUserSubmissionData,
    fetchCodeChefUserData,
    fetchCodeChefUserSubmissionData,
    fetchInterviewbitUserData,
};