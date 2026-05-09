import conf from "@/config/config.js";

const { SERVER_BASE_URL } = conf;

export const documentationData = [
    {
        category: "GFG",
        endpoints: [
            {
                title: "User Info",
                description: [
                    "Fetches user profile and progress from GeeksforGeeks like total problems solved, streaks, coding score, institution rank, avatar, etc.",
                ],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/gfg/user/profile",
                },
                parameters: [
                    { name: "username", type: "String", example: "ashokbhacjou", description: "GFG username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/gfg/user/profile?username=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Submission History",
                description: ["Fetches submission history for the user in the given year.", "If no year is provided, it fetches the submission history for the current year."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/gfg/user/submissions",
                },
                parameters: [
                    { name: "username", type: "String", example: "ashokbhacjou", description: "GFG username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "year", type: "Number", example: "2024", description: "Year", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/gfg/user/submissions?username=&apiKey=&year=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "User Problems Solved",
                description: ["Fetches the list of problems solved by the user on GFG as per the difficulty level."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/gfg/user/problems",
                },
                parameters: [
                    { name: "username", type: "String", example: "ashokbhacjou", description: "GFG username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/gfg/user/problems?username=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Question of Today",
                description: ["Fetches the GeeksforGeeks problem of the day."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/gfg/potd/today",
                },
                parameters: [
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/gfg/potd/today?apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Monthly POTDs",
                description: ["Fetches the list of POTDs for a specific month and year."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/gfg/potd/monthly",
                },
                parameters: [
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "year", type: "Number", example: "2024", description: "Year", status: "optional" },
                    { name: "month", type: "Number", example: "12", description: "Month number (1-12)", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/gfg/potd/monthly?apiKey=&year=&month=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            // {
            //     title: "Institution Info",
            //     description: ["Fetches basic details about an institution/college on GeeksforGeeks."],
            //     request: {
            //         type: "GET",
            //         colorClass: { text: "text-green-800", bg: "bg-green-100" },
            //         url: SERVER_BASE_URL + "/api/platform/gfg/institution/info",
            //     },
            //     parameters: [
            //         { name: "institution", type: "String", example: "Indian Institute of Technology IIT Varanasi", description: "Institution name slug", status: "required" },
            //         { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
            //     ],
            //     example: {
            //         text: "Try example (But use your api key first)",
            //         request: SERVER_BASE_URL + "/api/platform/gfg/institution/info?institution=&apiKey=",
            //         response: {},
            //     },
            //     quotasInfo: "Calling this endpoint costs 1 API Point.",
            // },
            // {
            //     title: "Institution Top Rankers",
            //     description: ["Fetches top three ranked users of a specific institution/college on GeeksforGeeks."],
            //     request: {
            //         type: "GET",
            //         colorClass: { text: "text-green-800", bg: "bg-green-100" },
            //         url: SERVER_BASE_URL + "/api/platform/gfg/institution/top-rankers",
            //     },
            //     parameters: [
            //         { name: "institution", type: "String", example: "Indian Institute of Technology IIT Varanasi", description: "Institution name slug", status: "required" },
            //         { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
            //     ],
            //     example: {
            //         text: "Try example (But use your api key first)",
            //         request: SERVER_BASE_URL + "/api/platform/gfg/institution/top-rankers?institution=&apiKey=",
            //         response: {},
            //     },
            //     quotasInfo: "Calling this endpoint costs 1 API Point.",
            // },
        ],
    },
    {
        category: "LeetCode",
        endpoints: [
            {
                title: "User Profile",
                description: ["Fetches user profile and stats from LeetCode."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/user/profile",
                },
                parameters: [
                    { name: "username", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/user/profile?username=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Language Stats",
                description: ["Fetches language problem counts for the user."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/user/language-stats",
                },
                parameters: [
                    { name: "username", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/user/language-stats?username=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "User Calendar",
                description: ["Fetches the user's calendar data (submission streaks, etc)."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/user/calendar",
                },
                parameters: [
                    { name: "username", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "year", type: "Number", example: "2025", description: "The year for which heatmap is generated", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/user/calendar?username=&apiKey=&year=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Recent Accepted Submissions",
                description: ["Fetches recent accepted submissions for the user."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/user/recent-submissions",
                },
                parameters: [
                    { name: "username", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "limit", type: "Number", example: "10", description: "The number of submissions we want", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/user/recent-submissions?username=&apiKey=&limit=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Badges",
                description: ["Fetches user badges from LeetCode."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/user/badges",
                },
                parameters: [
                    { name: "username", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/user/badges?username=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Contest Ranking",
                description: ["Fetches contest ranking for the user."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/user/contest-ranking",
                },
                parameters: [
                    { name: "username", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/user/contest-ranking?username=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Skill Stats",
                description: ["Fetches skill stats for the user."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/user/skill-stats",
                },
                parameters: [
                    { name: "username", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/user/skill-stats?username=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Question Progress",
                description: ["Fetches question progress for the user."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/user/question-progress",
                },
                parameters: [
                    { name: "username", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/user/question-progress?username=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Session Progress",
                description: ["Fetches session progress for the user."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/user/session-progress",
                },
                parameters: [
                    { name: "username", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/user/session-progress?username=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Contest Rating Distribution",
                description: ["Fetches contest rating distribution data."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/contest/rating-distribution",
                },
                parameters: [
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/contest/rating-distribution?apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Question of Today",
                description: ["Fetches the question of the day from LeetCode."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/potd/today",
                },
                parameters: [
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/potd/today?apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Coding Challenge Medal",
                description: ["Fetches coding challenge medal info."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/coding-challenge/medal",
                },
                parameters: [
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "year", type: "Integer", example: "2025", description: "Year", status: "required" },
                    { name: "month", type: "Integer", example: "12", description: "Month number (1-12)", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/coding-challenge/medal?apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Favorite Public Lists",
                description: ["Fetches a list of public favorite problem lists created by the user."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/user/favorite-list",
                },
                parameters: [
                    { name: "username", type: "String", example: "ashokbhatt2048", description: "LeetCode username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/user/favorite-list?username=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Upcoming Contests",
                description: ["Fetches a list of upcoming contests on LeetCode."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/contests/upcoming",
                },
                parameters: [
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/contests/upcoming?apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "Global Top Rankers",
                description: ["Fetches the global top rankers on LeetCode."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/leetcode/rankings/global",
                },
                parameters: [
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "page", type: "Number", example: "1", description: "Page number", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/leetcode/rankings/global?apiKey=&page=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
        ],
    },
    {
        category: "Codechef",
        endpoints: [
            {
                title: "User Info",
                description: ["Fetches user profile and progress from CodeChef like problems solved, contest performance, badges, skill tests, etc."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/codechef/user/profile",
                },
                parameters: [
                    { name: "username", type: "String", example: "ashokbhatt", description: "CodeChef username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "includeContests", type: "Boolean", example: "true", description: "Include contest data.", status: "optional" },
                    { name: "includeAchievements", type: "Boolean", example: "true", description: "Include achievements data.", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/codechef/user/profile?username=&apiKey=&includeContests=&includeAchievements=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 3 API Points. If includeContests is set to true, it costs an additional 1 API Points. If includeAchievements is set to true, it costs an additional 1 API Point.",
            },
            {
                title: "Submission History",
                description: ["Fetches submission history for the user for the current year and the previous year."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/codechef/user/submissions",
                },
                parameters: [
                    { name: "username", type: "String", example: "ashokbhatt", description: "CodeChef username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "year", type: "Number", example: "2024", description: "Year", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/codechef/user/submissions?username=&apiKey=&year=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 3 API Points.",
            },
        ],
    },
    {
        category: "Code360",
        endpoints: [
            {
                title: "User Info",
                description: ["Fetches user profile and progress from Code360 (formaly known as codestudios) like user details, avatar, streaks, badges, problems solved, contests performance, etc."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/code360/user/profile",
                },
                parameters: [
                    { name: "username", type: "String", example: "AshokBhatt", description: "Code360 UUID", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "includeContests", type: "Boolean", example: "true", description: "Include contest data.", status: "optional" },
                    { name: "includeAchievements", type: "Boolean", example: "true", description: "Include achievements data.", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/code360/user/profile?username=&apiKey=&includeContests=&includeAchievements=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point. If includeContests is set to true, it costs an additional 0.5 API Points. If includeAchievements is set to true, it costs an additional 0.5 API Point.",
            },
            {
                title: "User Submissions",
                description: ["Fetches submission history for the user on Code360 in the given year. If year is not provided, it fetches the submission history for the current year."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/code360/user/submissions",
                },
                parameters: [
                    { name: "username", type: "String", example: "AshokBhatt", description: "Code360 UUID", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "year", type: "Number", example: "2024", description: "Year", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/code360/user/submissions?username=&apiKey=&year=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
        ],
    },
    {
        category: "Hackerrank",
        endpoints: [
            {
                title: "User Info",
                description: ["Fetches user profile data, badges, and certificates from Hackerrank."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/hackerrank/user/profile",
                },
                parameters: [
                    { name: "username", type: "String", example: "ashokbhatt2048", description: "Hackerrank username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/hackerrank/user/profile?username=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
        ],
    },
    {
        category: "Interviewbit",
        endpoints: [
            {
                title: "User Info",
                description: ["Fetches user info like profile data, problems solved as per difficulty level, and as per category, submission analysis, etc."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/interviewbit/user/profile",
                },
                parameters: [
                    { name: "username", type: "String", example: "ashok-bhatt", description: "InterviewBit username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "includeSubmissionStats", type: "Boolean", example: "true", description: "Include submission statistics.", status: "optional" },
                    { name: "includeBadges", type: "Boolean", example: "true", description: "Include earned badges.", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/interviewbit/user/profile?username=&apiKey=&includeSubmissionStats=&includeBadges=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point. If includeSubmissionStats is set to true, it costs an additional 0.5 API Points. If includeBadges is set to true, it costs an additional 0.5 API Point.",
            },
            {
                title: "User Submissions",
                description: ["Fetches user submission data from the given year. If year is not provided, it fetches the submission history for the current year."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/interviewbit/user/submissions",
                },
                parameters: [
                    { name: "username", type: "String", example: "ashok-bhatt", description: "InterviewBit username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                    { name: "year", type: "Number", example: "2024", description: "Year", status: "optional" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/interviewbit/user/submissions?username=&apiKey=&year=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
            {
                title: "User Badges",
                description: ["Fetches badges earned by the user on InterviewBit."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/interviewbit/user/badges",
                },
                parameters: [
                    { name: "username", type: "String", example: "ashok-bhatt", description: "InterviewBit username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/interviewbit/user/badges?username=&apiKey=",
                    response: {},
                },
                quotasInfo: "Calling this endpoint costs 1 API Point.",
            },
        ],
    },
    {
        category: "Github",
        endpoints: [
            {
                title: "User Contribution Badges",
                description: ["Fetches all contribution badges shown on the user's GitHub profile page."],
                request: {
                    type: "GET",
                    colorClass: { text: "text-green-800", bg: "bg-green-100" },
                    url: SERVER_BASE_URL + "/api/platform/github/user/badges",
                },
                parameters: [
                    { name: "username", type: "String", example: "Ashok-Bhatt", description: "GitHub username", status: "required" },
                    { name: "apiKey", type: "String", example: "your-api-key", description: "Your API Key.", status: "required" },
                ],
                example: {
                    text: "Try example (But use your api key first)",
                    request: SERVER_BASE_URL + "/api/platform/github/user/badges?username=&apiKey=",
                    response: [],
                },
                quotasInfo: "Calling this endpoint costs 2 API Points.",
            },
        ],
    }
];
