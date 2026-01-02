import { getStreaksAndActiveDays } from "../utils/calendar.js";
import { getRepoCountScore, getFollowersCountScore, getFollowingRatioScore, getLanguagesCountScore, getStarsCountScore, getForksCountScore, getTotalCommitsScore, getProfileReadmeScore, getPullRequestsCountScore, getIssuesCountScore, getStreakScore, getPinnedReposScore, getRestrictedContributionCountScore } from "../utils/scoring/githubScore.js";
import { getUserProfileData, getGithubContributionBadges, getUserLanguageStats, getProfileReadme, getMultiYearContributionCalendar, getGithubPinnedRepos, getUserStarsAndForks, getMultiYearContributionCount, getLastYearContributionCalendar } from "../utils/fetching/githubFetch.js"
import { fetchLeetCodeProfileData, fetchLeetCodeUserMultiYearSubmissionData, fetchLeetCodeContestData, fetchLeetCodeBadgesData, fetchLeetCodeProblemsCount, fetchLeetCodeTopicWiseProblemsData } from "../utils/fetching/scrapeSpideyFetch.js"
import { getProblemsSolvedCountScore, getAcceptanceRateScore, getContestPerformanceScore, getSubmissionConsistencyScore, getBadgesScore } from "../utils/scoring/leetcodeScore.js";

const getAnalysisGithubData = async (username) => {
    const userData = await getUserProfileData(username);
    if (!userData) return null;

    const contributionBadges = await getGithubContributionBadges(username);
    if (!contributionBadges) return null;

    const [{ starsCount, forksCount }, pinnedRepos, lastYearContributionStats, contributionCalendar, contributionCount, profileReadme, languageStats] = await Promise.all([
        getUserStarsAndForks(username),
        getGithubPinnedRepos(username),
        getLastYearContributionCalendar(username),
        getMultiYearContributionCalendar(username, new Date(userData.created_at).getFullYear(), new Date().getFullYear()),
        getMultiYearContributionCount(username, new Date(userData.created_at).getFullYear(), new Date().getFullYear()),
        getProfileReadme(username),
        getUserLanguageStats(username)
    ]);

    const { currentStreak, maxStreak, activeDays, totalContributions } = getStreaksAndActiveDays(contributionCalendar);

    return { userData, starsCount, forksCount, pinnedRepos, lastYearContributionStats, contributionCount, profileReadme, contributionBadges, languageStats, currentStreak, maxStreak, activeDays, totalContributions };

}

const getAnalysisLeetCodeData = async (username) => {
    const problemsCount = await fetchLeetCodeProblemsCount(username);
    const multiYearSubmissionCalendar = await fetchLeetCodeUserMultiYearSubmissionData(username);
    const submissionCalendar = multiYearSubmissionCalendar[String(new Date().getFullYear())];
    const contestData = await fetchLeetCodeContestData(username);
    const profileInfo = await fetchLeetCodeProfileData(username);
    const badges = await fetchLeetCodeBadgesData(username);
    const topicWiseProblems = await fetchLeetCodeTopicWiseProblemsData(username);

    const acceptanceRate = (problemsCount?.matchedUser?.submitStats?.acSubmissionNum?.[0]?.submissions || 0) / (problemsCount?.matchedUser?.submitStats?.totalSubmissionNum?.[0]?.submissions || 1);

    return { problemsCount, multiYearSubmissionCalendar, submissionCalendar, contestData, profileInfo, badges, topicWiseProblems, acceptanceRate };
}

const getGithubScore = async (githubData) => {

    let score = 0;

    const { userData, starsCount, forksCount, pinnedRepos, lastYearContributionStats, contributionCount, profileReadme, contributionBadges, languageStats, currentStreak, maxStreak, activeDays, totalContributions } = githubData;
    
    const repoCountScore = getRepoCountScore(userData.public_repos);
    const languagesCountScore = getLanguagesCountScore(Object.entries(languageStats).length);
    const totalCommitsScore = getTotalCommitsScore(contributionCount.commitsCount);
    const pullRequestsCountScore = getPullRequestsCountScore(contributionCount.pullRequestsCount);
    const issuesCountScore = getIssuesCountScore(contributionCount.issuesCount);
    const restrictedContributionCountScore = getRestrictedContributionCountScore(contributionCount.restrictedCintributionCount);
    const forksCountScore = getForksCountScore(forksCount);
    const starsCountScore = getStarsCountScore(starsCount);
    const profileReadmeScore = getProfileReadmeScore(profileReadme);
    const pinnedReposScore = getPinnedReposScore(pinnedRepos);
    const streakScore = getStreakScore(maxStreak, currentStreak, activeDays);

    const publicContributionsScore = totalCommitsScore * 0.6 + pullRequestsCountScore * 0.3 + issuesCountScore * 0.1;
    const privateContributionsScore = restrictedContributionCountScore * 0.5 + Math.max(totalCommitsScore, pullRequestsCountScore) * 0.5;
    const contributionsScore = Math.max(publicContributionsScore, privateContributionsScore);

    score = repoCountScore * 0.025 + languagesCountScore * 0.025 + forksCountScore * 0.06 + starsCountScore * 0.09 + profileReadmeScore * 0.05 + pinnedReposScore * 0.05 + streakScore * 0.1 + contributionsScore * 0.6;

    const scoreData = {
        overall: score,
        parameterWise: { repoCountScore, languagesCountScore, forksCountScore, starsCountScore, profileReadmeScore, pinnedReposScore, streakScore, contributionsScore: { overall: contributionsScore, options: { publicContributionsScore, privateContributionsScore }, components: { totalCommitsScore, pullRequestsCountScore, issuesCountScore, restrictedContributionCountScore } } }
    }

    return scoreData;

}

const getLeetCodeScore = async (leetcodeData) => {

    let score = 0;
    const { acceptanceRate, badges, contestData, problemsCount, multiYearSubmissionCalendar } = leetcodeData;

    let acceptanceRateScore = getAcceptanceRateScore(acceptanceRate);
    let badgesScore = getBadgesScore(badges?.matchedUser);
    let contestScore = getContestPerformanceScore(contestData);
    let problemsSolvedScore = getProblemsSolvedCountScore(problemsCount?.matchedUser?.submitStats);
    let submissionConsistencyScore = getSubmissionConsistencyScore(multiYearSubmissionCalendar);

    const contestLessScore = acceptanceRateScore * 0.05 + badgesScore * 0.05 + submissionConsistencyScore * 0.25 + contestScore * 0.15 + problemsSolvedScore * 0.5;
    const contestHeavyScore = acceptanceRateScore * 0.01 + badgesScore * 0.01 + submissionConsistencyScore * 0.04 + contestScore * 0.9 + problemsSolvedScore * 0.04;

    score = Math.max(contestLessScore, contestHeavyScore);

    const scoreData = {
        overall: score,
        parameterWise: { acceptanceRateScore, badgesScore, contestScore, problemsSolvedScore, submissionConsistencyScore },
        categoryWise: { contestLessScore, contestHeavyScore }
    };

    return scoreData;
}


export {
    getAnalysisGithubData,
    getAnalysisLeetCodeData,
    getGithubScore,
    getLeetCodeScore,
}