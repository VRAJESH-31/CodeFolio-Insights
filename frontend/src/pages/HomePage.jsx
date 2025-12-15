import ProblemsCard from "../components/ProblemsCard";
import BadgeCollection from "../components/BadgeCollection.jsx";
import SubmissionHeatmap from "../components/SubmissionHeatmap.jsx";
import useAuthStore from "../../store/useAuthStore.js";
import { useProfileCache, useProfileRefresh } from "../hooks/useProfiles.js";
import { useEffect, useState, useMemo } from "react";
import Loader from "../components/Loader.jsx";
import GithubStats from "../components/GithubStats.jsx";
import LanguageStats from "../components/LanguageStats.jsx";
import StatCard from "../components/StatCard.jsx";
import { GitCommitHorizontal, GitPullRequest, Ban, FolderGit } from "lucide-react"
import { v4 as uuid } from 'uuid';
import TopicAnalysis from "../components/TopicAnalysis.jsx";
import Contest from "../components/Contest.jsx";
import ContestAchievements from "../components/ContestAchievements.jsx";

const CodingDashboard = () => {

    const user = useAuthStore((state) => state.user);
    const { data: cacheData, isLoading: isLoadingCache, refetch: refetchCache } = useProfileCache(user?._id);
    const { data: refreshData, isLoading: isRefreshing, refetch: triggerRefresh } = useProfileRefresh(user?._id);

    if (refreshData) console.log("refreshData: ", refreshData);
    if (cacheData) console.log("cacheData: ", cacheData);

    // Prefer refreshData if available (latest), else cacheData
    const data = refreshData || cacheData;
    const isLoading = isLoadingCache; // Only "loading" initially if cache is loading. Refresh happens in background.

    const dashboardOptions = ["Problem Solving", "Github"];
    const [dashboardOptionIndex, setDashboardOptionIndex] = useState(0);

    // Stale Check Logic
    useEffect(() => {
        if (!user?._id) return;

        // If we have cacheData, check if it's stale.
        // If cacheData is null (first time ever), we also need to refresh.
        // BUT, wait for isLoadingCache to finish so we know if it's truly null or just loading.
        if (!isLoadingCache) {
            if (!cacheData) {
                // No cache exists -> Fetch fresh
                console.log("No cache found. Triggering refresh.");
                triggerRefresh();
            } else {
                // Cache exists -> Check timestamp
                const lastUpdated = cacheData.lastUpdated;
                const oneHour = 60 * 60 * 1000;
                const now = Date.now();

                // If lastUpdated is missing (legacy) or older than 1 hour, refresh.
                if (!lastUpdated || (now - new Date(lastUpdated).getTime() > oneHour)) {
                    console.log("Cache is stale or missing timestamp. Triggering refresh.");
                    triggerRefresh();
                } else {
                    console.log("Cache is fresh. Using cached data.");
                }
            }
        }
    }, [user, cacheData, isLoadingCache]);

    const getPolishedGithubHeatmap = (githubData) => {
        // Helper function to ensure month and day strings are zero-padded (e.g., '3' -> '03').
        const zeroPad = (numStr) => {
            const num = parseInt(numStr, 10);
            return num.toString().padStart(2, '0');
        };

        const polishedHeatmap = {};

        // 1. Iterate through each week object in the top-level array
        for (const week of githubData) {
            // We only care about the contributionDays array inside the week object
            const days = week.contributionDays;

            if (!days || !Array.isArray(days)) {
                console.warn("Skipping a week object: 'contributionDays' array not found or invalid.");
                continue;
            }

            // 2. Iterate through each day object in the contributionDays array
            for (const day of days) {
                const { contributionCount, date } = day;

                if (contributionCount === undefined || !date) {
                    console.warn("Skipping day object: missing contributionCount or date.");
                    continue;
                }

                // 3. Split and polish the date string (e.g., "2025-5-13" -> "2025-05-13")
                const parts = date.split('-');

                if (parts.length === 3) {
                    const year = parts[0];
                    const month = parts[1];
                    const dayOfMonth = parts[2];

                    // Apply zero-padding
                    const polishedMonth = zeroPad(month);
                    const polishedDay = zeroPad(dayOfMonth);

                    // Reconstruct the date string in the desired YYYY-MM-DD format
                    const polishedDate = `${year}-${polishedMonth}-${polishedDay}`;

                    // 4. Store the data in the result object, nested by year
                    if (!polishedHeatmap[year]) {
                        polishedHeatmap[year] = {};
                    }
                    polishedHeatmap[year][polishedDate] = contributionCount;
                } else {
                    console.warn(`Skipping date: Unexpected date format '${date}'`);
                }
            }
        }

        return polishedHeatmap;
    };

    const getCombinedHeatmap = (...heatmaps) => {
        const combinedHeatmap = {};

        for (const heatmap of heatmaps) {
            if (!heatmap) continue;

            // Iterate over each year in the current heatmap
            for (const year in heatmap) {
                if (Object.hasOwnProperty.call(heatmap, year)) {
                    // Ensure the year object exists in the combined heatmap
                    if (!combinedHeatmap[year]) {
                        combinedHeatmap[year] = {};
                    }

                    // Iterate over each date in the current year
                    const yearData = heatmap[year];
                    for (const date in yearData) {
                        if (Object.hasOwnProperty.call(yearData, date)) {
                            const count = yearData[date];

                            // Add the count to the existing total for that date
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

    const getBadges = (data) => {
        return [
            // Leetcode badges
            ...(data?.leetcode?.badges?.badges?.map((badge) => { return { icon: badge.icon, name: badge.displayName, subTitle: null, subTitleIcon: null } }) || []),

            // Github badges
            ...(data?.github?.badges?.map((badge) => { return { icon: badge.icon, name: badge.name, subTitle: null, subTitleIcon: null } }) || []),

            // Codechef badges
            ...(data?.codechef?.profile?.badges?.map((badge) => { return { icon: badge.badgeImage, name: badge.badgeTitle, subTitle: null, subTitleIcon: null } }) || []),

            // Interviewbit badges
            ...(data?.interviewbit?.profile?.badges?.map((badge) => { return { icon: badge.image, name: badge.title, subTitle: null, subTitleIcon: null } }) || []),

            // Code360 Achiever badges
            ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.achiever?.gp?.map((badge) => { return { icon: "/Images/Code360 Badges/Guided Path/achiever.svg", name: badge, subTitle: "Achiever", subTitleIcon: null } }) || []),
            ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.achiever?.ptm?.map((badge) => { return { icon: "/Images/Code360 Badges/Practice/achiever.svg", name: badge, subTitle: "Achiever", subTitleIcon: null } }) || []),
            ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.achiever?.sgp?.map((badge) => { return { icon: "/Images/Code360 Badges/Special Guided Path/achiever.svg", name: badge, subTitle: "Achiever", subTitleIcon: null } }) || []),

            // Code360 specialist badges
            ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.specialist?.gp?.map((badge) => { return { icon: "/Images/Code360 Badges/Guided Path/specialist.svg", name: badge, subTitle: "Specialist", subTitleIcon: null } }) || []),
            ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.specialist?.ptm?.map((badge) => { return { icon: "/Images/Code360 Badges/Practice/specialist.svg", name: badge, subTitle: "Specialist", subTitleIcon: null } }) || []),
            ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.specialist?.sgp?.map((badge) => { return { icon: "/Images/Code360 Badges/Special Guided Path/specialist.svg", name: badge, subTitle: "Specialist", subTitleIcon: null } }) || []),

            // Code360 master badges
            ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.master?.gp?.map((badge) => { return { icon: "/Images/Code360 Badges/Guided Path/master.svg", name: badge, subTitle: "Master", subTitleIcon: null } }) || []),
            ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.master?.ptm?.map((badge) => { return { icon: "/Images/Code360 Badges/Practice/master.svg", name: badge, subTitle: "Master", subTitleIcon: null } }) || []),
            ...(data?.code360?.profile?.dsa_domain_data?.badges_hash?.master?.sgp?.map((badge) => { return { icon: "/Images/Code360 Badges/Special Guided Path/master.svg", name: badge, subTitle: "Master", subTitleIcon: null } }) || []),

            // Hackerrank Badges
            // ...(data?.hackerrank?.profile?.badges?.map((badge) => { return { icon: `https://hackerrank.com${badge.url}`, name: badge.badge_name, subTitle: null, subTitleIcon: null } }) || []),

        ]
    }

    const getTotalProblems = (data) => {
        return (data?.gfg?.profile?.totalProblemsSolved || 0)
            + (data?.leetcode?.problems?.acSubmissionNum?.find(item => item.difficulty === 'All')?.count || 0)
            + (data?.codechef?.profile?.problemsSolved || 0)
            + (data?.interviewbit?.profile?.problems?.total_problems_solved || 0)
            + (data?.code360?.profile?.dsa_domain_data?.problem_count_data?.total_count || 0)
            + (data?.hackerrank?.profile?.badges?.reduce((total, badge) => total + badge.solved, 0) || 0)
    }

    const getTotalActiveDays = (heatmap) => {
        let activeDays = 0;
        if (!heatmap) return 0;

        for (const year in heatmap) {
            if (Object.hasOwnProperty.call(heatmap, year)) {
                const yearData = heatmap[year];
                for (const date in yearData) {
                    if (Object.hasOwnProperty.call(yearData, date)) {
                        if (yearData[date] > 0) {
                            activeDays++;
                        }
                    }
                }
            }
        }
        return activeDays.toLocaleString();
    };

    const getTopicAnalysis = (data) => {

        let topicStats = {};

        // Topics from leetcode
        const advanced = data?.leetcode?.topicStats?.advanced || [];
        const intermediate = data?.leetcode?.topicStats?.intermediate || [];
        const fundamental = data?.leetcode?.topicStats?.fundamental || [];

        const allTopics = [...advanced, ...intermediate, ...fundamental];

        for (let i = 0; i < allTopics.length; i++) {
            const topic = allTopics[i];
            topicStats[topic.tagName] = topic?.problemsSolved || 0;
        }

        // Topics from interviewbit
        const interviewbitTopics = data?.interviewbit?.profile?.problems?.topic_problems_solved || [];

        for (let i = 0; i < interviewbitTopics.length; i++) {
            const topic = interviewbitTopics[i];
            topicStats[topic.title] = topic?.solved_problems_count || 0;
        }

        return topicStats;
    }

    const getContestCount = (data) => {
        return (data?.leetcode?.contest?.userContestRankingHistory?.filter((contest) => contest.attended === true)?.length || 0)
            + (data?.code360?.profile?.contests?.user_rating_data?.length || 0);
    }

    const getContestData = (data) => {
        return {
            "LeetCode": data?.leetcode?.contest?.userContestRankingHistory
                ?.filter((contest) => contest.attended === true)
                ?.map((contest) => {
                    return {
                        title: contest.contest.title,
                        rating: contest.rating,
                        ranking: contest.ranking,
                        date: new Date(contest.contest.startTime * 1000).toISOString().split('T')[0]
                    }
                }) || [],
            "Code360": data?.code360?.profile?.contests?.user_rating_data?.map((contest) => {
                return {
                    title: contest.name,
                    rating: contest.rating,
                    ranking: contest.rank,
                    date: new Date(contest.date * 1000).toISOString().split('T')[0]
                }
            }) || []
        }
    }

    const getDsaProblemsData = (data) => {
        return [
            { name: 'Easy', value: (data.leetcode?.problems?.acSubmissionNum[1]?.count || 0) + (data.interviewbit?.profile?.problems?.difficulty_problems_solved?.filter(difficulty => difficulty.difficulty_level === 'easy')?.[0]?.solved_problems_count || 0) + (data.gfg?.profile?.problemsSolved?.Easy || 0) + (data.code360?.profile?.dsa_domain_data?.problem_count_data?.difficulty_data?.[0]?.count || 0), color: '#10B981' },
            { name: 'Medium', value: (data.leetcode?.problems?.acSubmissionNum[2]?.count || 0) + (data.interviewbit?.profile?.problems?.difficulty_problems_solved?.filter(difficulty => difficulty.difficulty_level === 'medium')?.[0]?.solved_problems_count || 0) + (data.gfg?.profile?.problemsSolved?.Medium || 0) + (data.code360?.profile?.dsa_domain_data?.problem_count_data?.difficulty_data?.[1]?.count || 0), color: '#FBBF24' },
            { name: 'Hard', value: (data.leetcode?.problems?.acSubmissionNum[3]?.count || 0) + (data.interviewbit?.profile?.problems?.difficulty_problems_solved?.filter(difficulty => difficulty.difficulty_level === 'hard')?.[0]?.solved_problems_count || 0) + (data.gfg?.profile?.problemsSolved?.Hard || 0) + (data.code360?.profile?.dsa_domain_data?.problem_count_data?.difficulty_data?.[2]?.count || 0), color: '#FF4524' }]
    }

    const getContestAchievements = (data) => {
        return [
            {
                platform: 'LeetCode',
                currentRating: Math.round(data?.leetcode?.contest?.userContestRanking?.rating) || 0,
                maxRating: Math.round(data?.leetcode?.contest?.userContestRankingHistory?.reduce((max, contest) => Math.max(max, contest.rating), 0)) || 0,
                achievementBadge: data?.leetcode?.contest?.userContestRanking?.badge?.icon ? <img src={`https://leetcode.com/${data?.leetcode?.contest?.userContestRanking?.badge?.icon}`} className="w-30 h-30" /> : <img src="/Images/Leetcode Badges/knight.png" className="opacity-25 grayscale w-30 h-30" />,
                position: data?.leetcode?.contest?.userContestRanking?.badge?.name,
            },
            {
                platform: 'Code360',
                currentRating: Math.round(data?.code360?.profile?.contests?.current_user_rating) || 0,
                maxRating: Math.round(data?.code360?.profile?.contests?.user_rating_data?.reduce((max, contest) => Math.max(max, contest.rating), 0)) || 0,
                achievementBadge: data?.code360?.profile?.contests?.rating_group?.icon ? <img src={`${data?.code360?.profile?.contests?.rating_group?.icon}`} className="w-30 h-30" /> : <img src="/Images/Default/badge.png" className="opacity-25 grayscale w-40 h-40" />,
                position: data?.code360?.profile?.contests?.rating_group?.group,
            }
        ]
    }

    const combinedHeatmapData = useMemo(() => getCombinedHeatmap(
        data?.leetcode?.submission,
        data?.gfg?.submission,
        data?.codechef?.submission,
        data?.interviewbit?.submission,
        data?.code360?.submission
    ), [data]);

    const animationStyles = `
        @keyframes floatIn {
            0% { opacity: 0; transform: translateY(30px) scale(0.9); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes glowPulse {
            0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.2); }
            50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.4); }
        }
        @keyframes scoreProgress {
            0% { stroke-dashoffset: 283; }
        }
        @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: 200px 0; }
        }
        @keyframes bounceIn {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); opacity: 1; }
        }
        .animate-float-in { animation: floatIn 0.6s ease-out forwards; }
        .animate-glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
        .animate-score-progress { animation: scoreProgress 2s ease-out forwards; }
        .animate-shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
            background-size: 200px 100%;
            animation: shimmer 3s infinite;
        }
        .animate-bounce-in { animation: bounceIn 1s ease-out forwards; }
    `;

    return (
        <>
            <style>{animationStyles}</style>

            {/* Loader Logic:
                1. Initial Cache Load (Blocking) -> Centered Spinner
                2. Background Refresh (Non-blocking) -> Top Right Toast Loader
            */}
            {isLoadingCache && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                    <div className="relative flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                    </div>
                </div>
            )}

            {isRefreshing && <Loader text="Loading the latest coding stats..." showLoading={true} />}

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4 animate-float-in">
                    <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                        Coding Progress Dashboard
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Aggregated stats from multiple competitive platforms.
                    </p>
                </div>

                <div className="space-y-8">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {/* CONDITIONALLY RENDER DATA-DEPENDENT COMPONENTS 
                           We still check 'data' because even if loading stops, 
                           'data' might be null on an error.
                        */}
                        {data ? (
                            <>
                                <div className="flex gap-10 mb-5 xl:col-span-2">
                                    {dashboardOptions.map((option, index) => (
                                        <div onClick={() => setDashboardOptionIndex(index)} className={`text-xl rounded-full py-1 px-5 ${index == dashboardOptionIndex ? 'text-blue-600 bg-blue-100 font-bold' : 'bg-gray-100 text-black'}`} key={uuid()}>
                                            {option}
                                        </div>
                                    ))}
                                </div>
                                {
                                    (dashboardOptionIndex == 0) && <>
                                        <div className="xl:col-span-1">
                                            <div className="grid grid-cols-2 gap-4 mb-6">
                                                <StatCard
                                                    title="Total Problems"
                                                    value={getTotalProblems(data)}
                                                />
                                                <StatCard
                                                    title="Active Days"
                                                    value={getTotalActiveDays(combinedHeatmapData)}
                                                />
                                            </div>

                                            <BadgeCollection title="badges" defaultBadgesCount={2} badges={getBadges(data)} />

                                            <TopicAnalysis
                                                title="DSA Topic Analysis"
                                                data={getTopicAnalysis(data)}
                                            />

                                            {getContestCount(data) > 0 && <Contest
                                                data={getContestData(data)}
                                            />}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <ProblemsCard
                                                title="Fundamentals"
                                                problemsData={
                                                    [{ name: 'GeeksForGeeks', value: (data.gfg?.profile?.problemsSolved?.School || 0) + (data.gfg?.profile?.problemsSolved?.Basic || 0), color: '#10B981' },
                                                    { name: 'HackerRank', value: data?.hackerrank?.profile?.badges?.reduce((total, badge) => total + badge.solved, 0) || 0, color: '#FBBF24' },]
                                                }
                                            />

                                            <ProblemsCard
                                                title="DSA"
                                                problemsData={getDsaProblemsData(data)}
                                            />

                                            <ProblemsCard
                                                title="Competitive Programming"
                                                problemsData={
                                                    [{ name: 'Codechef', value: (data?.codechef?.profile?.problemsSolved || 0), color: '#10B981' },]
                                                }
                                            />

                                            {getContestCount(data) > 0 && <ContestAchievements
                                                achievements={getContestAchievements(data)}
                                            />}
                                        </div>

                                        <SubmissionHeatmap
                                            calendar={combinedHeatmapData}
                                            className="col-span-1 lg:col-span-2"
                                        />
                                    </>
                                }

                                {
                                    (dashboardOptionIndex == 1) && <>
                                        <h2 className="text-3xl mb-5 xl:col-span-2">Github</h2>
                                        <LanguageStats languageStats={data?.github?.languageStats} />
                                        <GithubStats statsArray={[
                                            { icon: <FolderGit className="text-yellow-500" />, name: "Repos", value: data?.github?.profile?.public_repos },
                                            { icon: <GitCommitHorizontal className="text-orange-500" />, name: "Commits", value: data?.github?.commits || 0 },
                                            { icon: <GitPullRequest className="text-green-500" />, name: "PRs", value: data?.github?.contributions?.pullRequestContributions?.totalCount || 0 },
                                            { icon: <Ban className="text-red-500" />, name: "issues", value: data?.github?.contributions?.issueContributions?.totalCount || 0 },
                                        ]} />
                                        <BadgeCollection title="Badges" badges={data?.github?.badges?.map((badge) => { return { icon: badge.icon, name: badge.name } })} defaultBadgesCount={2} />
                                    </>
                                }
                            </>
                        ) : (
                            // Display a placeholder message if loading is done but data is missing (error state)
                            !isLoading && <div className="col-span-2 text-center py-10 text-gray-500">
                                Could not load coding profiles data. Please try refreshing.
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default CodingDashboard;