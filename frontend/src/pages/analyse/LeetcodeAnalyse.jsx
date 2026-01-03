import { useState } from 'react';
import { Search, CheckCircle, Target, Zap, Award, MessageSquareQuote, Rocket, Brain, RefreshCw, BarChart3, TrendingUp, AlertCircle } from 'lucide-react';
import { getRandomHexColor } from '../../utils/colors.js';
import { BadgeCollection, ScoreMeter, TopicStats, ErrorContainer, MemeContainer } from '../../components/export.js';
import { StatCard, ProblemStatsCard, VideoSuggestionCard, AnalysisCard } from '../../components/card/export.js';
import { SubmissionChart } from "../../components/charts/export.js"
import { useAuthStore } from '../../store/export.js';
import { useLeetcodeAnalysis } from '../../hooks/useAnalyzer.js';
import { useProfileLinks } from '../../hooks/useProfiles.js';

const LeetcodeAnalyse = () => {
    const user = useAuthStore((state) => state.user);
    const { data: profile } = useProfileLinks(user?._id);
    const [userId, setUserId] = useState(profile?.leetCodeUsername || "");

    const { data: analysisData, isLoading, isError, error, refetch, isFetching } = useLeetcodeAnalysis(userId.trim());

    const handleAnalyze = () => {
        if (!userId.trim()) return;
        refetch();
    };

    const getLeetcodeSubmissionData = (submissionData) => {
        return Object.entries(submissionData)
            .sort((x, y) => new Date(x[0]) - new Date(y[0]))
            .map((dailyData) => ({
                name: dailyData[0],
                submissions: dailyData[1],
            }));
    };

    const getLeetcodeDifficultyData = (difficultyData) => [
        { name: 'Easy', value: difficultyData[1].count, color: '#34D399' },
        { name: 'Medium', value: difficultyData[2].count, color: '#F59E0B' },
        { name: 'Hard', value: difficultyData[3].count, color: '#EF4444' }
    ];

    const getLeetcodeTopicData = (topicData) => {
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
            { title: "Total Solved", value: analysisData.problemsCount.acSubmissionNum[0].count, color: "green", Icon: CheckCircle },
            { title: "Acceptance", value: `${(analysisData.acceptanceRate * 100).toFixed(1)}%`, color: "blue", Icon: Target },
            { title: "Current Streak", value: analysisData.submissionCalendar.streak, color: "amber", Icon: Zap },
            { title: "Badges Earned", value: analysisData.badges.badges.length ?? 0, color: "purple", Icon: Award },
            ...(analysisData?.contestData?.userContestRanking ? [
                { title: "Contest Rating", value: Math.round(analysisData?.contestData?.userContestRanking?.rating ?? 0), color: "purple", Icon: Award },
                { title: "Global rank", value: analysisData?.contestData?.userContestRanking?.globalRanking ?? 0, color: "purple", Icon: Award },
                { title: "Top Percentage", value: analysisData?.contestData?.userContestRanking?.topPercentage ?? 0, color: "purple", Icon: Award },
                { title: "Contests Attended", value: analysisData?.contestData?.userContestRanking?.attendedContestsCount ?? 0, color: "purple", Icon: Award },
            ] : [])
        ]
    }

    return (
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8">
            <div className="text-center space-y-4 animate-float-in">
                <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight h-20">
                    LeetCode Analytics
                </h1>
                <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-bold italic">
                    Master your coding journey with AI-powered insights and personalized recommendations
                </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-100 animate-float-in hover:shadow-2xl transition-all" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                        <Rocket className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-gray-800">Analyze Your Profile</h3>
                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Enter LeetCode username</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <input
                            type="text" value={userId} onChange={(e) => setUserId(e.target.value)}
                            placeholder="Enter your LeetCode UserID..."
                            className="w-full p-4 pl-12 text-lg border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-gray-50/50 font-bold"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                    <button
                        onClick={handleAnalyze} disabled={isFetching}
                        className="flex items-center justify-center gap-3 bg-blue-600 text-white font-black px-8 py-4 rounded-2xl shadow-xl hover:shadow-blue-200 transition-all transform hover:-translate-y-1 disabled:opacity-50 uppercase tracking-widest text-sm"
                    >
                        {isFetching ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Brain className="w-5 h-5" />}
                        <span>{isFetching ? 'Analyzing...' : 'Deep Analysis'}</span>
                    </button>
                </div>
            </div>

            {analysisData && (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1 bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-gray-100 animate-float-in">
                            <ScoreMeter
                                score={analysisData.score}
                            />
                        </div>

                        <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-100 animate-float-in" style={{ animationDelay: '200ms' }}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
                                    <MessageSquareQuote className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-800">AI Performance Review</h3>
                            </div>

                            <MemeContainer
                                score={analysisData.score}
                            />
                        </div>

                        <div className="lg:col-span-3 animate-float-in" style={{ animationDelay: '300ms' }}>
                            <div className="space-y-6">
                                <AnalysisCard
                                    title="Profile Analysis"
                                    points={analysisData.profileAnalysis.analysis}
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
                                        points={analysisData.profileAnalysis?.strongPoints}
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
                                        points={analysisData.profileAnalysis?.improvementAreas}
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

                    <BadgeCollection
                        badges={analysisData.badges.badges}
                        defaultBadgesCount={6}
                    />

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        <SubmissionChart
                            title="Submission Activity"
                            submissionData={getLeetcodeSubmissionData(analysisData?.submissionCalendar?.submissionCalendar)}
                        />

                        <ProblemStatsCard
                            title="Difficulty Breakdown"
                            problemsData={getLeetcodeDifficultyData(analysisData?.problemsCount.acSubmissionNum)}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <TopicStats
                            topicData={getLeetcodeTopicData(analysisData?.topicWiseProblems)}
                        />
                        
                        {analysisData?.profileAnalysis?.video && (
                            <VideoSuggestionCard
                                suggestedVideo={analysisData.profileAnalysis.video}
                            />
                        )}
                    </div>
                </div>
            )}

            {isError && (
                <ErrorContainer
                    error={error} onRetry={handleAnalyze} isLoading={isFetching}
                    errorAdditionalHelp={["Check if username is correct", "Ensure profile is public", "Try again in a few minutes"]}
                />
            )}
        </main>
    );
};

export default LeetcodeAnalyse;