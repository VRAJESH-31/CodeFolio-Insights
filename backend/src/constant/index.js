import * as platformsFetching from '../utils/fetching/platformsFetch.js';

const MAX_PDF_SIZE = 5 * 1024 * 1024;

const VALID_EXPERIENCE_YEARS_RANGE = [
    "0 - 2 Years (New Grad)",
    "3 - 5 Years (Mid-Level)",
    "6 - 10 Years (Senior)",
    "10+ Years (Lead/Architect)"
];

const GITHUB_API_QUERIES = {
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
        query($username: String!) { user(login: $username) { profileReadmeRepo: repository(name: $username) { isPrivate readmeFile: object(expression: \"HEAD:README.md\") { ... on Blob { byteSize } } } } }
    `,
}

const PLATFORMS = {
    "gfg": { field: "gfgUsername", fetchFunction: platformsFetching.fetchGfgData },
    "codechef": { field: "codechefUsername", fetchFunction: platformsFetching.fetchCodeChefData },
    "interviewbit": { field: "interviewbitUsername", fetchFunction: platformsFetching.fetchInterviewbitData },
    "leetcode": { field: "leetCodeUsername", fetchFunction: platformsFetching.fetchLeetCodeData },
    "github": { field: "githubUsername", fetchFunction: platformsFetching.fetchGitHubData },
    "code360": { field: "code360Username", fetchFunction: platformsFetching.fetchCode360Data },
    "hackerrank": { field: "hackerrankUsername", fetchFunction: platformsFetching.fetchHackerRankData },
}

const VIDEOS = {
    GITHUB: [
        {
            link: "https://www.youtube.com/watch?v=z8UPAVTh2aE",
            title: "How To Make Your GitHub Stand Out (Gets You Hired!)",
            description: ` In this video, I'll show you 
            — How to make your GitHub profile stand out  
            — How to write a good README  
            — How to document your projects like a pro 

            I’ve gotten interviews at companies like Vercel and Amazon just because of my GitHub, so trust me, it matters.`,
            time: 492,
            views: 87816,
        },
        {
            link: "https://www.youtube.com/watch?v=fdDSZGBSeiw&t=615s",
            title: "Make Your GitHub Profile Look INSANE! (Developers Will Be Shocked)",
            description: "🔥 Want to make your GitHub profile stand out? In this video, I'll show you how to transform your GitHub profile with amazing customizations that will leave developers shocked! 😱",
            time: 833,
            views: 29761,
        },
        {
            link: "https://www.youtube.com/watch?v=LlkcvvGbs9I",
            title: "HACK GITHUB CONTRIBUTION GRAPH! (2025)",
            description: "n this video, I'll teach you how you can hack your GitHub contribution graph (Github Activity Generator) in 5 minutes. At the end of this video, you'll be able to generate beautiful art and fill it randomly to make it look like you've been a frequent contributor. ",
            time: 326,
            views: 98000,
        }
    ],
    LEETCODE: [
        {
            link: "https://www.youtube.com/watch?v=2tTQtJzRPjs",
            title: "How I'd Master LeetCode (If I Could Start Over) | LeetCode Guardian ROADMAP | Vivek Gupta",
            description: `In this video, I’ll walk you through the exact step-by-step approach you need to follow to become a Guardian in LeetCode.

            Reaching the Guardian level takes much more than watching tutorials or solving the same type of problems again and again. I’ll break down how improving your speed, debugging ability, strategy, and problem-solving system can take you from a beginner to a Guardian-level competitor.`,
            time: 0,
            views: 0,
        },
        {
            link: "https://www.youtube.com/watch?v=Uni0AldIMLU&t=1s",
            title: "How to give coding contests for DSA preparation ? Codeforces, Leetcode, Codechef, Hackerrank🔥",
            description: "In this video, I have shared a step by step guide on what should be the correct way to give coding contests on platforms like codeforces and leetcode. I have tried to answer all the important questions which beginners have. If you follow what I have told in this video, trust me, you will great results which will eventually help you clear coding rounds. ",
            time: 576,
            views: 27067,
        },
        {
            link: "https://www.youtube.com/watch?v=xo7XrRVxH8Y",
            title: "8 patterns to solve 80% Leetcode problems",
            description: "Learn eight coding patterns to conquer 80% of LeetCode problems. This tutorial explains each pattern with examples, covering techniques like sliding windows and binary search modifications. Master data structures and algorithms to fully utilize these patterns.",
            time: 449,
            views: 1003327,
        }
    ]
}

export {
    MAX_PDF_SIZE,
    VALID_EXPERIENCE_YEARS_RANGE,
    GITHUB_API_QUERIES,
    PLATFORMS,
    VIDEOS,
}