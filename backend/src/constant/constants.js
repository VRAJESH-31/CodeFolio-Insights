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

export {
    MAX_PDF_SIZE,
    gitHubApiQueries,
}