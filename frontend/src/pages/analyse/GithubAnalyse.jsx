import { useState } from "react";
import { Search, GitBranch, TrendingUp, Code, Zap, Brain, FolderOpen, GitCommit, Star, GitFork, Users, UserPlus, GitPullRequest, MessageSquareQuote, AlertCircle, CheckCircle, Target, BarChart3 } from 'lucide-react';
import { useGithubAnalysis } from "../../hooks/useAnalyzer.js";
import { useAuthStore } from '../../store/export.js';
import { useProfileLinks } from '../../hooks/useProfiles.js';
import { StatCard, AnalysisCard, VideoSuggestionCard, ProblemStatsCard } from '../../components/card/export.js';
import { SubmissionChart, BarChartDistribution } from '../../components/charts/export.js';
import { ErrorContainer, ScoreMeter, MemeContainer } from '../../components/export.js';
import { LANGUAGE_COLORS } from '../../constants/index.js';
import { getPolishedGithubHeatmap } from "../../utils/dataHelpers.js";

const GithubAnalyse = () => {
    const user = useAuthStore((state) => state.user);
    const { data: profile } = useProfileLinks(user?._id);
    const [username, setUsername] = useState(profile?.githubUsername || "");

    const { data: analysisData, isLoading, isError, error, refetch, isFetching } = useGithubAnalysis(username.trim());

    const handleAnalyze = async () => {
        if (!username.trim()) return;
        await refetch();
    };

    const commitData = Object.entries(Object.entries(getPolishedGithubHeatmap(analysisData?.contributionCalendar)).map(x=>x[1]).reduce((a,b)=>({...a, ...b}),{})).map(date=> {return {name: date[0], submissions: date[1]}}) || [];

    const suggestedVideo = analysisData?.profileAnalysis?.video;

    const totalBytes = analysisData?.languageUsageInBytes ? Object.values(analysisData.languageUsageInBytes).reduce((a, b) => a + b, 0) : 0;

    const languageData = analysisData?.languageUsageInBytes
        ? Object.entries(analysisData.languageUsageInBytes).map(([name, bytes], idx) => ({
            name,
            value: Math.round((bytes / totalBytes) * 100),
            color: LANGUAGE_COLORS[idx % LANGUAGE_COLORS.length]
        }))
        : [];

    const repoTypeData = [
        { name: 'Personal', value: analysisData?.public_repos || 0, color: '#10b981' },
        { name: 'Forked', value: analysisData?.forksCount || 0, color: '#6366f1' },
        { name: 'Starred', value: analysisData?.starsCount || 0, color: '#f59e0b' }
    ];

    const gitHubStats = [
        { title: "Total Repos", value: analysisData?.public_repos || 0, color: "green", Icon: FolderOpen },
        { title: "Total Commits", value: analysisData?.lastYearCommitsCount || 0, color: "blue", Icon: GitCommit },
        { title: "Total Stars", value: analysisData?.starsCount || 0, color: "amber", Icon: Star },
        { title: "Total Forks", value: analysisData?.forksCount || 0, color: "purple", Icon: GitFork },
        { title: "Followers", value: analysisData?.followersCount || 0, color: "blue", Icon: Users },
        { title: "Following", value: analysisData?.followingCount || 0, color: "purple", Icon: UserPlus },
        { title: "Pull Requests", value: analysisData?.pullRequestsCount || 0, color: "green", Icon: GitPullRequest },
        { title: "Contributions", value: (analysisData?.pullRequestsCount || 0) + (analysisData?.issueRequestsCount || 0), color: "amber", Icon: Zap },
    ]

    return (
        <main className="flex-1 overflow-y-auto p-8 space-y-8">
            <div className="text-center space-y-4 animate-float-in">
                <h1 className="text-6xl font-black bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight h-20">
                    GitHub Analytics
                </h1>
                <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-bold italic">
                    Dive deep into your GitHub activity with AI-powered insights and contribution analysis
                </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-100 animate-float-in" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl shadow-lg">
                        <Code className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-gray-800">Analyze Your Profile</h3>
                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Enter GitHub username</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <input
                            type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your GitHub username..."
                            className="w-full p-4 pl-12 text-lg border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all bg-gray-50/50 font-bold"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                    <button
                        onClick={handleAnalyze} disabled={isFetching}
                        className="flex items-center justify-center gap-3 bg-green-600 text-white font-black px-8 py-4 rounded-2xl shadow-xl hover:shadow-green-200 transition-all transform hover:-translate-y-1 disabled:opacity-50 uppercase tracking-widest text-sm"
                    >
                        {isFetching ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Brain className="w-5 h-5" />}
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
                        {gitHubStats.map((stat, index) => (
                            <StatCard
                                key={stat.title}
                                {...stat}
                                index={index}
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        <SubmissionChart
                            title="Commit Activity"
                            submissionData={commitData}
                        />

                        <ProblemStatsCard
                            title="Language Distribution"
                            problemsData={languageData}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <BarChartDistribution
                            title={<><GitBranch className="w-5 h-5 text-orange-500" /> Repositories</>}
                            data={repoTypeData}
                        />

                        {suggestedVideo && (
                            <VideoSuggestionCard
                                suggestedVideo={suggestedVideo}
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

export default GithubAnalyse;