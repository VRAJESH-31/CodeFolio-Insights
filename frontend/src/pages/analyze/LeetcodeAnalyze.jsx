import { useState } from 'react';
import { CheckCircle, Target, Zap, Award, Rocket, BarChart3, TrendingUp, AlertCircle } from 'lucide-react';
import { useQueryClient } from "@tanstack/react-query";
import { getRandomHexColor } from '../../utils/colors.js';
import { BadgeCollection, ScoreMeter, TopicStats, ErrorContainer, MemeContainer, UsernameInput } from '../../components/export.js';
import { StatCard, VideoSuggestionCard, AnalysisCard } from '../../components/card/export.js';
import { SubmissionHeatmap, DistributionChart } from "../../components/charts/export.js"
import { useAuthStore } from '../../store/export.js';
import { useLeetcodeAnalysis } from '../../hooks/useAnalyzer.js';
import { useProfileLinks } from '../../hooks/useProfiles.js';
import { getStreaksAndActiveDays } from '../../utils/calendar.js';

const LeetcodeAnalyse = () => {
    const user = useAuthStore((state) => state.user);
    const { data: profile } = useProfileLinks(user?._id);
    const [userId, setUserId] = useState(profile?.leetCodeUsername || "");
    const queryClient = useQueryClient();

    const { data: analysisData, isError, error, refetch, isFetching } = useLeetcodeAnalysis(userId.trim());

    const handleAnalyze = () => {
        if (!userId.trim()) return;
        refetch();
    };

    const { currentStreak, maxStreak, activeDays, totalContributions } = getStreaksAndActiveDays(analysisData?.multiYearSubmissionCalendar || {});

    const getLeetcodeDifficultyData = (difficultyData) => [
        { name: 'Easy', value: difficultyData?.[1]?.count, color: '#34D399' },
        { name: 'Medium', value: difficultyData?.[2]?.count, color: '#F59E0B' },
        { name: 'Hard', value: difficultyData?.[3]?.count, color: '#EF4444' }
    ];

    const getLeetcodeTopicData = (topicData) => {
        if (!topicData) return [];
        const responseTopicData = [];
        const topicDataArray = Object.entries(topicData).map((topicLevelData) => topicLevelData[1]);
        for (let i = 0; i < topicDataArray.length; i++) {
            for (let j = 0; j < topicDataArray[i].length; j++) {
                responseTopicData.push({
                    name: topicDataArray[i][j].tagName,
                    value: topicDataArray[i][j].problemsSolved,
                    mastery: Math.min(100, topicDataArray[i][j].problemsSolved * 2),
                    color: getRandomHexColor(),
                });
            }
        }
        return responseTopicData.sort(() => Math.random() - 0.5).slice(0, 10);
    };

    const getLeetCodeStats = (analysisData) => {
        return [
            { title: "Total Solved", value: analysisData?.problemsCount?.userStats?.acSubmissionNum?.[0]?.count ?? 0, color: "green", Icon: CheckCircle },
            { title: "Acceptance", value: `${((analysisData?.acceptanceRate || 0) * 100).toFixed(1)}%`, color: "blue", Icon: Target },
            { title: "Current Streak", value: currentStreak ?? 0, color: "amber", Icon: Zap },
            { title: "Badges Earned", value: analysisData?.badges?.badges?.length ?? 0, color: "purple", Icon: Award },
            ...(analysisData?.contestData?.userContestRanking ? [
                { title: "Contest Rating", value: Math.round(analysisData?.contestData?.userContestRanking?.rating ?? 0), color: "purple", Icon: Award },
                { title: "Global rank", value: analysisData?.contestData?.userContestRanking?.globalRanking ?? 0, color: "purple", Icon: Award },
                { title: "Top Percentage", value: analysisData?.contestData?.userContestRanking?.topPercentage ?? 0, color: "purple", Icon: Award },
                { title: "Contests Attended", value: analysisData?.contestData?.userContestRanking?.attendedContestsCount ?? 0, color: "purple", Icon: Award },
            ] : [])
        ]
    }

    return (
        <div className="flex-1 animate-float-in space-y-8">
            <div className="text-center space-y-4 animate-float-in">
                <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight h-20">
                    LeetCode Analytics
                </h1>
                <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-bold italic">
                    Master your coding journey with AI-powered insights and personalized recommendations
                </p>
            </div>

            <UsernameInput
                value={userId}
                onChange={setUserId}
                onAnalyze={handleAnalyze}
                isFetching={isFetching}
                placeholder="Enter your LeetCode UserID..."
                title="Analyze Your Profile"
                subtitle="Enter LeetCode username"
                Icon={Rocket}
            />

            {analysisData && (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <ScoreMeter
                            score={analysisData?.scoreData?.overall}
                            scoreComparison={analysisData?.scoreComparison}
                        />

                        <MemeContainer
                            score={analysisData?.scoreData?.overall ?? 0}
                            className="lg:col-span-2"
                        />

                        {Object.keys(analysisData?.profileAnalysis || {}).length > 0 ? (
                            <div className="lg:col-span-3 animate-float-in" style={{ animationDelay: '300ms' }}>
                                <div className="space-y-6">
                                    <AnalysisCard
                                        title="Profile Analysis"
                                        points={analysisData?.profileAnalysis?.analysis || []}
                                        Icon={BarChart3}
                                        PointIcon={CheckCircle}
                                        iconBg="bg-purple-100"
                                        iconColor="text-purple-600"
                                        pointIconColor="text-green-500"
                                        pointColor="text-purple-700"
                                        titleColor="text-purple-800"
                                        className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-purple-200"
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <AnalysisCard
                                            title="Strengths"
                                            points={analysisData?.profileAnalysis?.strongPoints}
                                            Icon={TrendingUp}
                                            PointIcon={CheckCircle}
                                            iconBg="bg-blue-100"
                                            iconColor="text-blue-600"
                                            pointIconColor="text-green-500"
                                            pointColor="text-blue-700"
                                            className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-blue-200"
                                        />

                                        <AnalysisCard
                                            title="Areas to Improve"
                                            points={analysisData?.profileAnalysis?.improvementAreas}
                                            Icon={Target}
                                            PointIcon={AlertCircle}
                                            iconBg="bg-amber-100"
                                            iconColor="text-amber-600"
                                            pointIconColor="text-amber-500"
                                            pointColor="text-amber-700"
                                            titleColor="text-amber-800"
                                            className="bg-gradient-to-br from-amber-50 via-white to-orange-50 border-amber-200"
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="lg:col-span-3 bg-white/90 backdrop-blur-sm p-12 rounded-3xl shadow-xl border border-dashed border-gray-200 text-center animate-float-in" style={{ animationDelay: '300ms' }}>
                                <div className="mx-auto w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                                    <AlertCircle className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Analysis Not Available</h3>
                                <p className="text-gray-500 max-w-md mx-auto">
                                    We couldn't generate a detailed profile analysis at this time. This might be due to insufficient public activity or API limitations.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {getLeetCodeStats(analysisData).map((stat, index) => (
                            <StatCard
                                key={stat.title}
                                {...stat}
                                index={index}
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        <BadgeCollection
                            badges={analysisData?.badges?.badges}
                            defaultBadgesCount={6}
                        />

                        <DistributionChart
                            title="Difficulty Breakdown"
                            data={getLeetcodeDifficultyData(analysisData?.problemsCount?.userStats?.acSubmissionNum)}
                        />
                    </div>

                    <SubmissionHeatmap
                        calendar={analysisData?.multiYearSubmissionCalendar}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <TopicStats
                            topicData={getLeetcodeTopicData(analysisData?.topicWiseProblems)}
                        />

                        {analysisData?.profileAnalysis?.video && (
                            <VideoSuggestionCard
                                suggestedVideo={analysisData?.profileAnalysis?.video}
                            />
                        )}
                    </div>
                </div>
            )}

            {isError && (
                <ErrorContainer
                    error={error} onRetry={handleAnalyze} isLoading={isFetching}
                    onBack={() => {
                        queryClient.resetQueries({ queryKey: ["leetcodeData", userId.trim()] });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    errorAdditionalHelp={["Check if username is correct", "Ensure profile is public", "Try again in a few minutes"]}
                />
            )}
        </div>
    );
};

export default LeetcodeAnalyse;