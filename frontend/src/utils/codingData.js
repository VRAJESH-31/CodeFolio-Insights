import { COLOR_MAP } from '@/constants/colors.js';
import { URL } from '@/constants/url.js';

export const getBadges = (data) => {
    return {
        // Leetcode
        "Leetcode": (data?.leetcode?.badges?.badges?.map((badge) => ({ icon: badge.icon, name: badge.displayName, subTitle: null, subTitleIcon: null })) || []),

        // Codechef
        "Codechef": (data?.codechef?.profile?.badges?.map((badge) => ({ icon: badge.badgeImage, name: badge.badgeTitle, subTitle: null, subTitleIcon: null })) || []),

        // Interviewbit
        "Interviewbit": (data?.interviewbit?.badges?.map((badge) => ({ icon: badge.image, name: badge.title, subTitle: null, subTitleIcon: null })) || []),

        // hackerrank
        "Hackerrank": (data?.hackerrank?.profile.badges?.filter((badge) => badge?.stars > 0)?.map((badge) => ({ stars: badge?.stars || 0, name: badge?.badge_name || "NA", subTitle: null, subTitleIcon: null, isHackerrankBadge: true })) || []),

        // Code360
        "Code360": [...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.achiever?.gp?.map((badge) => ({ icon: "/Images/Code360 Badges/Guided Path/achiever.svg", name: badge, subTitle: "Achiever", subTitleIcon: null })) || []),
        ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.achiever?.ptm?.map((badge) => ({ icon: "/Images/Code360 Badges/Practice/achiever.svg", name: badge, subTitle: "Achiever", subTitleIcon: null })) || []),
        ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.achiever?.sgp?.map((badge) => ({ icon: "/Images/Code360 Badges/Special Guided Path/achiever.svg", name: badge, subTitle: "Achiever", subTitleIcon: null })) || []),
        ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.specialist?.gp?.map((badge) => ({ icon: "/Images/Code360 Badges/Guided Path/specialist.svg", name: badge, subTitle: "Specialist", subTitleIcon: null })) || []),
        ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.specialist?.ptm?.map((badge) => ({ icon: "/Images/Code360 Badges/Practice/specialist.svg", name: badge, subTitle: "Specialist", subTitleIcon: null })) || []),
        ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.specialist?.sgp?.map((badge) => ({ icon: "/Images/Code360 Badges/Special Guided Path/specialist.svg", name: badge, subTitle: "Specialist", subTitleIcon: null })) || []),
        ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.master?.gp?.map((badge) => ({ icon: "/Images/Code360 Badges/Guided Path/master.svg", name: badge, subTitle: "Master", subTitleIcon: null })) || []),
        ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.master?.ptm?.map((badge) => ({ icon: "/Images/Code360 Badges/Practice/master.svg", name: badge, subTitle: "Master", subTitleIcon: null })) || []),
        ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.master?.sgp?.map((badge) => ({ icon: "/Images/Code360 Badges/Special Guided Path/master.svg", name: badge, subTitle: "Master", subTitleIcon: null })) || [])],
    };
};

export const getTotalProblems = (data) => {
    return (data?.gfg?.profile?.totalProblemsSolved || 0)
        + (data?.leetcode?.problems?.acSubmissionNum?.find(item => item.difficulty === 'All')?.count || 0)
        + (data?.codechef?.profile?.problemsSolved || 0)
        + (data?.interviewbit?.profile?.problems?.total_problems_solved || 0)
        + (data?.code360?.profile?.dsa_domain_data?.problem_count_data?.total_count || 0)
        + (data?.hackerrank?.profile?.badges?.reduce((total, badge) => total + badge.solved, 0) || 0);
};

export const getTopicAnalysis = (data) => {
    let topicStats = {};
    const advanced = data?.leetcode?.topicStats?.advanced || [];
    const intermediate = data?.leetcode?.topicStats?.intermediate || [];
    const fundamental = data?.leetcode?.topicStats?.fundamental || [];
    const allTopics = [...advanced, ...intermediate, ...fundamental];

    for (let i = 0; i < allTopics.length; i++) {
        const topic = allTopics[i];
        topicStats[topic.tagName] = topic?.problemsSolved || 0;
    }

    const interviewbitTopics = data?.interviewbit?.profile?.problems?.topic_problems_solved || [];
    for (let i = 0; i < interviewbitTopics.length; i++) {
        const topic = interviewbitTopics[i];
        topicStats[topic.title] = topic?.solved_problems_count || 0;
    }
    return topicStats;
};

export const getContestData = (data) => {
    const contestData = {};

    const leetcodeContests = data?.leetcode?.contest?.userContestRankingHistory
        ?.filter((contest) => contest.attended === true)
        ?.map((contest) => ({
            title: contest.contest.title,
            rating: contest.rating,
            ranking: contest.ranking,
            date: new Date(contest.contest.startTime * 1000).toISOString().split('T')[0]
        })) || [];

    const code360Contests = data?.code360?.profile?.contests?.user_rating_data?.map((contest) => ({
        title: contest.name,
        rating: contest.rating,
        ranking: contest.rank,
        date: new Date(contest.date * 1000).toISOString().split('T')[0]
    })) || [];

    const codechefContests = data?.codechef?.profile?.contests?.history?.map((contest) => ({
        title: contest.name,
        rating: contest.rating,
        ranking: contest.rank,
        date: contest?.endDate?.split(" ")?.[0] || "",
    })) || [];

    if (leetcodeContests.length > 0) contestData["LeetCode"] = leetcodeContests;
    if (code360Contests.length > 0) contestData["Code360"] = code360Contests;
    if (codechefContests.length > 0) contestData["Codechef"] = codechefContests;

    return contestData;
};

export const getDsaProblemsData = (data) => {
    return [
        {
            name: 'Easy',
            value: (data.leetcode?.problems?.acSubmissionNum[1]?.count || 0) +
                (data.interviewbit?.profile?.problems?.difficulty_problems_solved?.filter(difficulty => difficulty.difficulty_level === 'easy')?.[0]?.solved_problems_count || 0) +
                (data.gfg?.profile?.problemsSolved?.Easy || 0) +
                (data.code360?.profile?.dsa_domain_data?.problem_count_data?.difficulty_data?.[0]?.count || 0),
            color: '#10B981'
        },
        {
            name: 'Medium',
            value: (data.leetcode?.problems?.acSubmissionNum[2]?.count || 0) +
                (data.interviewbit?.profile?.problems?.difficulty_problems_solved?.filter(difficulty => difficulty.difficulty_level === 'medium')?.[0]?.solved_problems_count || 0) +
                (data.gfg?.profile?.problemsSolved?.Medium || 0) +
                (data.code360?.profile?.dsa_domain_data?.problem_count_data?.difficulty_data?.[1]?.count || 0),
            color: '#FBBF24'
        },
        {
            name: 'Hard',
            value: (data.leetcode?.problems?.acSubmissionNum[3]?.count || 0) +
                (data.interviewbit?.profile?.problems?.difficulty_problems_solved?.filter(difficulty => difficulty.difficulty_level === 'hard')?.[0]?.solved_problems_count || 0) +
                (data.gfg?.profile?.problemsSolved?.Hard || 0) +
                (data.code360?.profile?.dsa_domain_data?.problem_count_data?.difficulty_data?.[2]?.count || 0),
            color: '#FF4524'
        }
    ];
};

export const getFundamentalProblemsData = (data) => {
    return [
        {
            name: 'GeeksForGeeks',
            value: (data.gfg?.profile?.problemsSolved?.School || 0) + (data.gfg?.profile?.problemsSolved?.Basic || 0),
            color: '#10B981'
        },
        {
            name: 'HackerRank',
            value: data?.hackerrank?.profile?.badges?.reduce((total, badge) => total + badge.solved, 0) || 0,
            color: '#FBBF24'
        }
    ];
};

export const getCompetitiveProgrammingProblemsData = (data) => {
    return [
        {
            name: 'Codechef',
            value: data?.codechef?.profile?.problemsSolved || 0,
            color: '#10B981'
        }
    ];
};

export const getContestAchievements = (data) => {
    const achievements = [];

    const leetcodeRating = data?.leetcode?.contest?.userContestRanking?.rating;
    const code360Rating = data?.code360?.profile?.contests?.current_user_rating;
    const codechefRating = data?.codechef?.profile?.contests?.currentRating;

    if (leetcodeRating) {
        achievements.push({
            platform: 'LeetCode',
            currentRating: Math.round(leetcodeRating) || 0,
            maxRating: Math.round(data?.leetcode?.contest?.userContestRankingHistory?.reduce((max, contest) => Math.max(max, contest.rating), 0)) || 0,
            achievement: {
                type: "badge",
                badgeUrl: data?.leetcode?.contest?.userContestRanking?.badge?.icon
                    ? data?.leetcode?.contest?.userContestRanking?.badge?.icon
                    : URL.LEETCODE_KNIGHT_BADGE,
                isDefaultBadge: !data?.leetcode?.contest?.userContestRanking?.badge?.icon,
                position: data?.leetcode?.contest?.userContestRanking?.badge?.name,
            },
        });
    }

    if (code360Rating) {
        achievements.push({
            platform: 'Code360',
            currentRating: Math.round(code360Rating) || 0,
            maxRating: Math.round(data?.code360?.profile?.contests?.user_rating_data?.reduce((max, contest) => Math.max(max, contest.rating), 0)) || 0,
            achievement: {
                type: "badge",
                badgeUrl: data?.code360?.profile?.contests?.rating_group?.icon
                    ? `${data?.code360?.profile?.contests?.rating_group?.icon}`
                    : "/Images/Default/badge.png",
                isDefaultBadge: !data?.code360?.profile?.contests?.rating_group?.icon,
                position: data?.code360?.profile?.contests?.rating_group?.group,
            },
        });
    }

    if (codechefRating) {
        achievements.push({
            platform: 'Codechef',
            currentRating: Math.round(codechefRating) || 0,
            maxRating: Math.round(data?.codechef?.profile?.contests?.highestRating) || 0,
            achievement: {
                type: "stars",
                stars: data?.codechef?.profile?.contests?.stars || 0,
            },
        });
    }

    return achievements;
};

export const getGithubLanguageStats = (languageStats, totalLanguages = 'all') => {
    if (!languageStats) return [];
    const totalBytes = Object.values(languageStats).reduce((sum, bytes) => sum + bytes, 0);
    if (totalBytes === 0) return [];

    const languagesData = Object.keys(languageStats)
        .map((key, index) => {
            const colorInfo = COLOR_MAP[index % COLOR_MAP.length];
            return {
                name: key,
                value: languageStats[key],
                percentage: parseFloat(((languageStats[key] / totalBytes) * 100).toFixed(2)),
                color: colorInfo
            };
        })
        .filter((language) => language.value > 0)
        .sort((a, b) => b.value - a.value);

    // If totalLanguages is 'all' or we have fewer languages than requested, return everything
    if (totalLanguages === 'all' || languagesData.length <= totalLanguages) {
        return languagesData;
    }

    // Otherwise, group the rest into 'Other'
    const topLanguages = languagesData.slice(0, totalLanguages);
    const otherLanguages = languagesData.slice(totalLanguages);

    const otherValue = otherLanguages.reduce((sum, language) => sum + language.value, 0);

    topLanguages.push({
        name: 'Other',
        value: otherValue,
        percentage: parseFloat(((otherValue / totalBytes) * 100).toFixed(2)),
        color: { class: 'bg-gray-400', gradient: '#94a3b8' }
    });


    return topLanguages;
};