export const PLATFORM_TO_BACKEND_KEY = {
    'leetcode': 'leetCodeUsername',
    'interviewbit': 'interviewbitUsername',
    'github': 'githubUsername',
    'linkedin': 'linkedinUsername',
    'gfg': 'gfgUsername',
    'hackerrank': 'hackerrankUsername',
    'code360': 'code360Username',
    'codechef': 'codechefUsername',
    'codeforces': 'codeForcesUsername',
    'twitter': 'twitterUsername',
    'portfolio': 'portfolioWebsiteLink',
    'resume': 'resumeLink',
};

export const getDefaultUrl = (platform, username) => {
    const urlMap = {
        leetcode: `https://leetcode.com/${username}`,
        github: `https://github.com/${username}`,
        linkedin: `https://linkedin.com/in/${username}`,
        gfg: `https://auth.geeksforgeeks.org/user/${username}`,
        hackerrank: `https://hackerrank.com/${username}`,
        codechef: `https://codechef.com/users/${username}`,
        codeforces: `https://codeforces.com/profile/${username}`,
        twitter: `https://twitter.com/${username}`,
        interviewbit: `https://www.interviewbit.com/profile/${username}`,
        code360: `https://www.naukri.com/code360/profile/${username}`,
    };
    return urlMap[platform] || username;
};

export const transformBackendToFrontend = (backendData, platforms) => {
    const links = [];
    Object.keys(PLATFORM_TO_BACKEND_KEY).forEach(key => {
        const username = backendData[PLATFORM_TO_BACKEND_KEY[key]];
        if (username) {
            const config = platforms.find(p => p.value === key);
            links.push({
                id: `${key}_${Date.now()}_${Math.random()}`,
                platform: key,
                username: username,
                url: getDefaultUrl(key, username),
                label: config?.label || key,
                color: config?.color || 'from-gray-500 to-gray-600',
                bgColor: config?.bgColor || 'bg-gray-500/10'
            });
        }
    });
    return links;
};

export const transformFrontendToBackend = (linksArray) => {
    const backendData = {};
    const seenPlatforms = new Set();
    linksArray.forEach(link => {
        const backendKey = PLATFORM_TO_BACKEND_KEY[link.platform];
        if (backendKey && !seenPlatforms.has(link.platform)) {
            backendData[backendKey] = link.username;
            seenPlatforms.add(link.platform);
        }
    });
    return backendData;
};
