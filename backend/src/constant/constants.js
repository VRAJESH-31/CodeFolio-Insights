const MAX_PDF_SIZE = 5 * 1024 * 1024;

const leetCodeApiQueries = {
    LEETCODE_USER_PROBLEMS_SOLVED_QUERY : `
        query userProfile($username: String!) {
            matchedUser(username: $username) {
                username
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

    LEETCODE_USER_STREAKS_CALENDAR_QUERY: `
        query userCalendar($username: String!, $year: Int) {
            matchedUser(username: $username) {
                username
                userCalendar(year: $year) {
                    streak
                    totalActiveDays
                    submissionCalendar
                }
            }
        }
    `,

    LEETCODE_CONTEST_DATA_QUERY: `
        query userContestRankingInfo($username: String!) {
            userContestRanking(username: $username) {
                rating
                globalRanking
                attendedContestsCount
                topPercentage
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

    LEETCODE_PROFILE_INFO_QUERY: `
        query userProfileInfo($username: String!) {
            matchedUser(username: $username) {
                username
                profile {
                    realName
                    school
                    websites
                    countryName
                    skillTags
                    company
                    jobTitle
                    aboutMe
                }
            }
        }
    `,

    LEETCODE_BADGES_QUERY: `
        query userBadges($username: String!) {
            matchedUser(username: $username) {
                contestBadge {
                    name
                    icon
                    expired
                    hoverText
                }
                badges {
                    id
                    name
                    shortName
                    displayName
                    icon
                    creationDate
                    expired
                    hoverText
                    medal {
                        slug
                        config {
                        icon
                        iconGif
                        }
                    }
                }
            }
        }
    `,

    LEETCODE_TOPIC_WISE_PROBLEMS_QUERY: `
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
};

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

export {
    MAX_PDF_SIZE,
    leetCodeApiQueries,
    gitHubApiQueries,
}