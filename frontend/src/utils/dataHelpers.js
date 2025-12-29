import React from 'react';

export const getPolishedGithubHeatmap = (githubData) => {
    const zeroPad = (numStr) => {
        const num = parseInt(numStr, 10);
        return num.toString().padStart(2, '0');
    };

    const polishedHeatmap = {};

    if (!githubData) return {};

    for (const week of githubData) {
        const days = week.contributionDays;

        if (!days || !Array.isArray(days)) continue;

        for (const day of days) {
            const { contributionCount, date } = day;

            if (contributionCount === undefined || !date) continue;

            const parts = date.split('-');

            if (parts.length === 3) {
                const year = parts[0];
                const month = parts[1];
                const dayOfMonth = parts[2];

                const polishedMonth = zeroPad(month);
                const polishedDay = zeroPad(dayOfMonth);
                const polishedDate = `${year}-${polishedMonth}-${polishedDay}`;

                if (!polishedHeatmap[year]) {
                    polishedHeatmap[year] = {};
                }
                polishedHeatmap[year][polishedDate] = contributionCount;
            }
        }
    }
    return polishedHeatmap;
};

export const getCombinedHeatmap = (...heatmaps) => {
    const combinedHeatmap = {};

    for (const heatmap of heatmaps) {
        if (!heatmap) continue;

        for (const year in heatmap) {
            if (Object.hasOwnProperty.call(heatmap, year)) {
                if (!combinedHeatmap[year]) {
                    combinedHeatmap[year] = {};
                }
                const yearData = heatmap[year];
                for (const date in yearData) {
                    if (Object.hasOwnProperty.call(yearData, date)) {
                        const count = yearData[date];
                        if (combinedHeatmap[year][date]) {
                            combinedHeatmap[year][date] += count;
                        } else {
                            combinedHeatmap[year][date] = count;
                        }
                    }
                }
            }
        }
    }
    return combinedHeatmap;
};

export const getBadges = (data) => {
    return [
        ...(data?.leetcode?.badges?.badges?.map((badge) => ({ icon: badge.icon, name: badge.displayName, subTitle: null, subTitleIcon: null })) || []),
        ...(data?.codechef?.profile?.badges?.map((badge) => ({ icon: badge.badgeImage, name: badge.badgeTitle, subTitle: null, subTitleIcon: null })) || []),
        ...(data?.interviewbit?.profile?.badges?.map((badge) => ({ icon: badge.image, name: badge.title, subTitle: null, subTitleIcon: null })) || []),
        ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.achiever?.gp?.map((badge) => ({ icon: "/Images/Code360 Badges/Guided Path/achiever.svg", name: badge, subTitle: "Achiever", subTitleIcon: null })) || []),
        ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.achiever?.ptm?.map((badge) => ({ icon: "/Images/Code360 Badges/Practice/achiever.svg", name: badge, subTitle: "Achiever", subTitleIcon: null })) || []),
        ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.achiever?.sgp?.map((badge) => ({ icon: "/Images/Code360 Badges/Special Guided Path/achiever.svg", name: badge, subTitle: "Achiever", subTitleIcon: null })) || []),
        ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.specialist?.gp?.map((badge) => ({ icon: "/Images/Code360 Badges/Guided Path/specialist.svg", name: badge, subTitle: "Specialist", subTitleIcon: null })) || []),
        ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.specialist?.ptm?.map((badge) => ({ icon: "/Images/Code360 Badges/Practice/specialist.svg", name: badge, subTitle: "Specialist", subTitleIcon: null })) || []),
        ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.specialist?.sgp?.map((badge) => ({ icon: "/Images/Code360 Badges/Special Guided Path/specialist.svg", name: badge, subTitle: "Specialist", subTitleIcon: null })) || []),
        ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.master?.gp?.map((badge) => ({ icon: "/Images/Code360 Badges/Guided Path/master.svg", name: badge, subTitle: "Master", subTitleIcon: null })) || []),
        ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.master?.ptm?.map((badge) => ({ icon: "/Images/Code360 Badges/Practice/master.svg", name: badge, subTitle: "Master", subTitleIcon: null })) || []),
        ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.master?.sgp?.map((badge) => ({ icon: "/Images/Code360 Badges/Special Guided Path/master.svg", name: badge, subTitle: "Master", subTitleIcon: null })) || []),
    ];
};

export const getTotalProblems = (data) => {
    return (data?.gfg?.profile?.problemsSolved?.totalProblemsSolved || 0)
        + (data?.leetcode?.problems?.acSubmissionNum?.find(item => item.difficulty === 'All')?.count || 0)
        + (data?.codechef?.profile?.problemsSolved || 0)
        + (data?.interviewbit?.profile?.problems?.total_problems_solved || 0)
        + (data?.code360?.profile?.dsa_domain_data?.problem_count_data?.total_count || 0)
        + (data?.hackerrank?.profile?.badges?.reduce((total, badge) => total + badge.solved, 0) || 0);
};

export const getTotalActiveDays = (heatmap) => {
    let activeDays = 0;
    if (!heatmap) return 0;
    for (const year in heatmap) {
        if (Object.hasOwnProperty.call(heatmap, year)) {
            const yearData = heatmap[year];
            for (const date in yearData) {
                if (Object.hasOwnProperty.call(yearData, date)) {
                    if (yearData[date] > 0) activeDays++;
                }
            }
        }
    }
    return activeDays.toLocaleString();
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

export const getContestCount = (data) => {
    return (data?.leetcode?.contest?.userContestRankingHistory?.filter((contest) => contest.attended === true)?.length || 0)
        + (data?.code360?.profile?.contests?.user_rating_data?.length || 0);
};

export const getContestData = (data) => {
    return {
        "LeetCode": data?.leetcode?.contest?.userContestRankingHistory
            ?.filter((contest) => contest.attended === true)
            ?.map((contest) => ({
                title: contest.contest.title,
                rating: contest.rating,
                ranking: contest.ranking,
                date: new Date(contest.contest.startTime * 1000).toISOString().split('T')[0]
            })) || [],
        "Code360": data?.code360?.profile?.contests?.user_rating_data?.map((contest) => ({
            title: contest.name,
            rating: contest.rating,
            ranking: contest.rank,
            date: new Date(contest.date * 1000).toISOString().split('T')[0]
        })) || []
    };
};

export const getDsaProblemsData = (data) => {
    return [
        { name: 'Easy', value: (data.leetcode?.problems?.acSubmissionNum[1]?.count || 0) + (data.interviewbit?.profile?.problems?.difficulty_problems_solved?.filter(difficulty => difficulty.difficulty_level === 'easy')?.[0]?.solved_problems_count || 0) + (data.gfg?.profile?.problemsSolved?.Easy || 0) + (data.code360?.profile?.dsa_domain_data?.problem_count_data?.difficulty_data?.[0]?.count || 0), color: '#10B981' },
        { name: 'Medium', value: (data.leetcode?.problems?.acSubmissionNum[2]?.count || 0) + (data.interviewbit?.profile?.problems?.difficulty_problems_solved?.filter(difficulty => difficulty.difficulty_level === 'medium')?.[0]?.solved_problems_count || 0) + (data.gfg?.profile?.problemsSolved?.Medium || 0) + (data.code360?.profile?.dsa_domain_data?.problem_count_data?.difficulty_data?.[1]?.count || 0), color: '#FBBF24' },
        { name: 'Hard', value: (data.leetcode?.problems?.acSubmissionNum[3]?.count || 0) + (data.interviewbit?.profile?.problems?.difficulty_problems_solved?.filter(difficulty => difficulty.difficulty_level === 'hard')?.[0]?.solved_problems_count || 0) + (data.gfg?.profile?.problemsSolved?.Hard || 0) + (data.code360?.profile?.dsa_domain_data?.problem_count_data?.difficulty_data?.[2]?.count || 0), color: '#FF4524' }
    ];
};

export const getContestAchievements = (data) => {
    return [
        {
            platform: 'LeetCode',
            currentRating: Math.round(data?.leetcode?.contest?.userContestRanking?.rating) || 0,
            maxRating: Math.round(data?.leetcode?.contest?.userContestRankingHistory?.reduce((max, contest) => Math.max(max, contest.rating), 0)) || 0,
            badgeUrl: data?.leetcode?.contest?.userContestRanking?.badge?.icon
                ? `https://leetcode.com/${data?.leetcode?.contest?.userContestRanking?.badge?.icon}`
                : "/Images/Leetcode Badges/knight.png",
            isDefaultBadge: !data?.leetcode?.contest?.userContestRanking?.badge?.icon,
            position: data?.leetcode?.contest?.userContestRanking?.badge?.name,
        },
        {
            platform: 'Code360',
            currentRating: Math.round(data?.code360?.profile?.contests?.current_user_rating) || 0,
            maxRating: Math.round(data?.code360?.profile?.contests?.user_rating_data?.reduce((max, contest) => Math.max(max, contest.rating), 0)) || 0,
            badgeUrl: data?.code360?.profile?.contests?.rating_group?.icon
                ? `${data?.code360?.profile?.contests?.rating_group?.icon}`
                : "/Images/Default/badge.png",
            isDefaultBadge: !data?.code360?.profile?.contests?.rating_group?.icon,
            position: data?.code360?.profile?.contests?.rating_group?.group,
        }
    ];
};
