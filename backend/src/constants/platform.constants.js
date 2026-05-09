import * as platformsFetching from '../utils/fetching/platforms.fetch.util.js';

export const LEETCODE_GRAPHQL_ENDPOINT = 'https://leetcode.com/graphql';

export const GITHUB_TOTAL_COMMITS_LIMIT = 25;

export const GITHUB_REPO_DATA_PAGE_SIZE = 100;

export const PLATFORMS = {
  gfg: {
    field: 'gfgUsername',
    fetchFunction: platformsFetching.fetchGfgData,
  },
  codechef: {
    field: 'codechefUsername',
    fetchFunction: platformsFetching.fetchCodeChefData,
  },
  interviewbit: {
    field: 'interviewbitUsername',
    fetchFunction: platformsFetching.fetchInterviewbitData,
  },
  leetcode: {
    field: 'leetCodeUsername',
    fetchFunction: platformsFetching.fetchLeetCodeData,
  },
  github: {
    field: 'githubUsername',
    fetchFunction: platformsFetching.fetchGitHubData,
  },
  code360: {
    field: 'code360Username',
    fetchFunction: platformsFetching.fetchCode360Data,
  },
  hackerrank: {
    field: 'hackerrankUsername',
    fetchFunction: platformsFetching.fetchHackerRankData,
  },
};

export const CODE360_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  Referer: 'https://www.naukri.com/code360/',
  Accept: 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
};

export const GFG_HEADERS = {
  'Content-Type': 'application/json',
  Referer: 'https://practice.geeksforgeeks.org',
  'User-Agent': 'Mozilla/5.0',
  Accept: 'application/json',
};

export const HACKERRANK_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  Referer: 'https://www.hackerrank.com/',
};

export const INTERVIEWBIT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  Referer: 'https://www.interviewbit.com/',
  Accept: 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
};

export const LEETCODE_HEADERS = {
  'Content-Type': 'application/json',
  Referer: 'https://leetcode.com/',
  Origin: 'https://leetcode.com/',
  'User-Agent': 'Mozilla/5.0',
};

export const LEETCODE_GRAPHQL_QUERIES = {
  userProfile: `
        query userProfileInfo($username: String!) {
            matchedUser(username: $username) {
                username
                githubUrl
                twitterUrl
                linkedinUrl
                profile {
                    ranking
                    userAvatar
                    realName
                    aboutMe
                    school
                    websites
                    countryName
                    company
                    jobTitle
                    skillTags
                    postViewCount
                    postViewCountDiff
                    reputation
                    reputationDiff
                    solutionCount
                    solutionCountDiff
                    categoryDiscussCount
                    categoryDiscussCountDiff
                    certificationLevel
                }
            }
        }
    `,

  userLanguageStats: `
        query languageStats($username: String!) {
            matchedUser(username: $username){
                languageProblemCount {
                    languageName
                    problemsSolved
                }
            }
        }
    `,

  userContestRankings: `
        query userContestRankingInfo($username: String!) {
            userContestRanking(username: $username) {
                attendedContestsCount
                rating
                globalRanking
                totalParticipants
                topPercentage
                badge {
                    name
                    icon
                }
            }
            userContestRankingHistory(username: $username) {
                attended
                trendDirection
                problemsSolved
                totalProblems
                finishTimeInSeconds
                rating
                ranking
                contest {
                    title
                    startTime
                }
            }
        }
    `,

  userProfileUserQuestionProgressV2: `
        query userProfileUserQuestionProgressV2($userSlug: String!) {
            userProfileUserQuestionProgressV2(userSlug: $userSlug) {
                numAcceptedQuestions {
                    count
                    difficulty
                }
                numFailedQuestions {
                    count
                    difficulty
                }
                numUntouchedQuestions {
                    count
                    difficulty
                }
                userSessionBeatsPercentage {
                    difficulty
                    percentage
                }
                totalQuestionBeatsPercentage
            }
        }
    `,

  userSessionProgress: `
        query userSessionProgress($username: String!) {
            allQuestionsCount {
                difficulty
                count
            }
            matchedUser(username: $username) {
                submitStats {
                    acSubmissionNum {
                        difficulty
                        count
                        submissions
                    }
                    totalSubmissionNum {
                        difficulty
                        count
                        submissions
                    }
                }
            }
        }
    `,

  userBadges: `
        query userBadges($username: String!) {
            matchedUser(username: $username) {
                activeBadge {
                    displayName
                    icon
                }
                badges {
                    id
                    name
                    shortName
                    displayName
                    icon
                    hoverText
                    medal {
                        slug
                        config {
                            iconGif
                            iconGifBackground
                        }
                    }
                    creationDate
                    category
                }
            }
        }
    `,

  userProfileCalendar: `
        query userProfileCalendar($username: String!, $year: Int) {
            matchedUser(username: $username) {
                userCalendar(year: $year) {
                    activeYears
                    streak
                    totalActiveDays
                    dccBadges {
                        timestamp
                        badge {
                            name
                            icon
                        }
                    }
                    submissionCalendar
                }
            }
        }
    `,

  recentAcSubmissions: `
        query recentAcSubmissions($username: String!, $limit: Int!) {
            recentAcSubmissionList(username: $username, limit: $limit) {
                id
                title
                titleSlug
                timestamp
            }
        }
    `,

  questionOfToday: `
        query questionOfToday {
            activeDailyCodingChallengeQuestion {
                date
                userStatus
                link
                question {
                    titleSlug
                    title
                    translatedTitle
                    acRate
                    difficulty
                    freqBar
                    frontendQuestionId: questionFrontendId
                    isFavor
                    paidOnly: isPaidOnly
                    status
                    hasVideoSolution
                    hasSolution
                    topicTags {
                        name
                        id
                        slug
                    }
                }
            }
        }
    `,

  skillStats: `
        query skillStats($username: String!) {
            matchedUser(username: $username) {
                tagProblemCounts {
                    advanced {
                        tagName
                        tagSlug
                        problemsSolved
                    }
                    intermediate {
                        tagName
                        tagSlug
                        problemsSolved
                    }
                    fundamental {
                        tagName
                        tagSlug
                        problemsSolved
                    }
                }
            }
        }
    `,

  upcomingContests: `
        query upcomingContests {
            upcomingContests {
                title
                titleSlug
                startTime
                duration
                originStartTime
                isVirtual
            }
        }
    `,

  globalTopRankers: `
        query globalRankingPaginated($page: Int) {
            globalRanking(page: $page) {
                totalUsers
                userPerPage
                totalPages
                rankingNodes {
                    ranking
                    currentRating
                    currentGlobalRanking
                    dataRegion
                    user {
                        username
                        nameColor
                        activeBadge {
                            displayName
                            icon
                        }
                        profile {
                            userSlug
                            userAvatar
                            countryCode
                            countryName
                            realName
                        }
                    }
                }
            }
        }
    `,

  codingChallengeMedal: `
        query codingChallengeMedal($year: Int!, $month: Int!) {
            dailyChallengeMedal(year: $year, month: $month) {
                name
                config {
                    icon
                }
            }
        }
    `,

  contestRatingHistogram: `
        query contestRatingHistogram {
            contestRatingHistogram {
                userCount
                ratingStart
                ratingEnd
                topPercentage
            }
        }
    `,

  createdPublicFavoriteList: `
        query createdPublicFavoriteList($userSlug: String!) {
            createdPublicFavoriteList(userSlug: $userSlug) {
                hasMore
                totalLength
                favorites {
                    slug
                    coverUrl
                    coverEmoji
                    coverBackgroundColor
                    name
                    isPublicFavorite
                    lastQuestionAddedAt
                    hasCurrentQuestion
                    viewCount
                    description
                    questionNumber
                    isDefaultList
                }
            }
        }
    `,
};

export const GITHUB_API_QUERIES = {
  GITHUB_TOTAL_PINNED_REPO_COUNT_QUERY: `
        query($username: String!) {
            user(login: $username) {
                pinnedItems(first: 6, types: REPOSITORY) {
                    totalCount
                }
            }
        }
    `,

  GITHUB_PINNED_REPOS_QUERY: `
        query($username: String!) {
            user(login: $username) {
                pinnedItems(first: 6, types: REPOSITORY) {
                    nodes {
                        ... on Repository {
                            name
                            description
                            url
                            repositoryTopics(first: 50) {
                                nodes {
                                    topic {
                                        name
                                    }
                                }
                            }
                            readmeFile: object(expression: "HEAD:README.md") {
                                ... on Blob { byteSize }
                            }
                        }
                    }
                }
            }
        }
    `,

  GITHUB_CONTRIBUTION_COUNT_QUERY: `
        query($username: String!, $from: DateTime!, $to: DateTime!) { user(login: $username) { contributionsCollection(from: $from, to: $to) { pullRequestContributions(first: 1) { totalCount } issueContributions(first: 1) { totalCount } totalCommitContributions pullRequestReviewContributions(first: 1) { totalCount } repositoryContributions(first: 1) { totalCount } restrictedContributionsCount } } }
    `,

  GITHUB_LAST_YEAR_CONTRIBUTION_CALENDAR_QUERY: `
        query($username: String!){
            user(login: $username) {
                contributionsCollection {
                    contributionCalendar {
                        weeks {
                            contributionDays {
                                contributionCount
                                date
                            }
                        }
                    }
                }
            }
        }
    `,

  GITHUB_YEARLY_CONTRIBUTION_CALENDAR_QUERY: `
        query($username: String!, $from: DateTime!, $to: DateTime!) { user(login: $username) { contributionsCollection(from: $from, to: $to) { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } } } } }
    `,

  GITHUB_LAST_YEAR_COMMITS_COUNT_QUERY: `
        query($username: String!){
            user(login: $username) {
                contributionsCollection {
                    contributionCalendar {
                        totalContributions
                    }
                }
            }
        }
    `,

  GITHUB_REPO_TOTAL_COMMITS_COUNT_QUERY: `
        query($username: String!, $reponame: String!) {
            repository(owner: $username, name: $reponame) {
                defaultBranchRef {
                    target {
                        ... on Commit {
                            history {
                                totalCount
                            }
                        }
                    }
            }
        }
    }`,

  GITHUB_PROFILE_README_QUERY: `
        query($username: String!) { 
            user(login: $username) { 
                profileReadmeRepo: repository(name: $username) { 
                    isPrivate 
                    readmeFile: object(expression: "HEAD:README.md") { 
                        ... on Blob { byteSize } 
                    } 
                } 
            } 
        }
    `,
};
