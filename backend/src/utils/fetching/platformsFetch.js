import * as scrapeSpideyFetching from './scrapeSpideyFetch.js';
import * as githubFetching from './githubFetch.js';

const fetchGfgData = async (username) => {
    return {
        profile: await scrapeSpideyFetching.fetchGfgUserData(username),
        submission: await scrapeSpideyFetching.fetchGfgUserMultiYearSubmissionData(username),
    }
}

const fetchCodeChefData = async (username) => {
    return {
        profile: await scrapeSpideyFetching.fetchCodeChefUserData(username),
        submission: await scrapeSpideyFetching.fetchCodeChefUserSubmissionData(username),
    }
}

const fetchInterviewbitData = async (username) => {
    return {
        profile: await scrapeSpideyFetching.fetchInterviewbitUserData(username),
        badges: await scrapeSpideyFetching.fetchInterviewbitBadgesData(username),
        submission: await scrapeSpideyFetching.fetchInterviewbitUserMultiYearSubmissionData(username),
    }
}

const fetchCode360Data = async (username) => {
    return {
        profile: await scrapeSpideyFetching.fetchCode360UserData(username),
        submission: await scrapeSpideyFetching.fetchCode360UserMultiYearSubmissionData(username),
    }
}

const fetchLeetCodeData = async (username) => {
    return {
        profile: (await scrapeSpideyFetching.fetchLeetCodeProfileData(username))?.matchedUser,
        badges: (await scrapeSpideyFetching.fetchLeetCodeBadgesData(username))?.matchedUser,
        contest: await scrapeSpideyFetching.fetchLeetCodeContestData(username),
        problems: (await scrapeSpideyFetching.fetchLeetCodeProblemsCount(username))?.matchedUser?.submitStats,
        submission: await scrapeSpideyFetching.fetchLeetCodeUserMultiYearSubmissionData(username),
        topicStats: (await scrapeSpideyFetching.fetchLeetCodeTopicWiseProblemsData(username))?.matchedUser?.tagProblemCounts,
    }
}

const fetchHackerRankData = async (username) => {
    return {
        profile: await scrapeSpideyFetching.fetchHackerRankUserData(username),
    }
}

const fetchGitHubData = async (username) => {
    return {
        profile: await githubFetching.getUserProfileData(username),
        contributions: await githubFetching.getContributionCount(username),
        commits: await githubFetching.getLastYearCommitsCount(username),
        calendar: await githubFetching.getContributionCalendar(username),
        badges: await githubFetching.getGithubContributionBadges(username),
        languageStats: await githubFetching.getUserLanguageStats(username)
    }
}

export { 
    fetchGfgData,
    fetchCodeChefData,
    fetchInterviewbitData,
    fetchCode360Data,
    fetchLeetCodeData,
    fetchHackerRankData,
    fetchGitHubData
};