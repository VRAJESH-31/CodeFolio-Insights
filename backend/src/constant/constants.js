import * as platformsFetching from '../utils/fetching/platformsFetch.js';

const MAX_PDF_SIZE = 5 * 1024 * 1024;

const gitHubApiQueries = {
    GITHUB_TOTAL_PINNED_REPO_COUNT_QUERY : `
        query($username: String!) {
            user(login: $username) {
                pinnedItems(first: 6, types: REPOSITORY) {
                    totalCount
                }
            }
        }
    `,

    GITHUB_FIRST_100_REPOS_CONTRIBUTION_QUERY : `
        query($username: String!){
            user(login: $username) {
                contributionsCollection {
                    pullRequestContributions(first: 100) {
                        totalCount
                    }
                    issueContributions(first: 100) {
                        totalCount
                    }
                }
            }
        }
    `,

    GITHUB_CONTRIBUTION_CALENDAR_QUERY : `
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

    GITHUB_LAST_YEAR_COMMITS_COUNT_QUERY : `
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

    GITHUB_REPO_TOTAL_COMMITS_COUNT_QUERY : `
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
    }`
}

const platforms = {
    "gfg" : {field: "gfgUsername", fetchFunction: platformsFetching.fetchGfgData, isCodingPlatform: true},
    "codechef" : {field: "codechefUsername", fetchFunction: platformsFetching.fetchCodeChefData, isCodingPlatform: true},
    "interviewbit" : {field: "interviewbitUsername", fetchFunction: platformsFetching.fetchInterviewbitData, isCodingPlatform: true},
    "leetcode" : {field: "leetCodeUsername", fetchFunction: platformsFetching.fetchLeetCodeData, isCodingPlatform: true},
    "github" : {field: "githubUsername", fetchFunction: platformsFetching.fetchGitHubData, isCodingPlatform: false},
    "code360" : {field: "code360Username", fetchFunction: platformsFetching.fetchCode360Data, isCodingPlatform: true},
    "hackerrank" : {field: "hackerrankUsername", fetchFunction: platformsFetching.fetchHackerRankData, isCodingPlatform: true},
    "linkedin" : {field: "linkedinUsername", fetchFunction: null, isCodingPlatform: false},
    "twitter" : {field: "twitterUsername", fetchFunction: null, isCodingPlatform: false},
    "portfolio" : {field: "portfolioUsername", fetchFunction: null, isCodingPlatform: false},
    "resume" : {field: "resumeUsername", fetchFunction: null, isCodingPlatform: false}
}

export {
    MAX_PDF_SIZE,
    gitHubApiQueries,
    platforms,
}