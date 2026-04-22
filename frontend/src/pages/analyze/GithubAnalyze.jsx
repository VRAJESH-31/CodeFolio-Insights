import { useState } from "react";
import { TrendingUp, Code, Zap, FolderOpen, GitCommit, Star, GitFork, Users, UserPlus, GitPullRequest, AlertCircle, CheckCircle, Target, BarChart3, Shield, FileText, Sparkles, Search, Loader2 } from 'lucide-react';
import { useQueryClient } from "@tanstack/react-query";
import { useGithubAnalysis } from "../../hooks/useAnalyzer.js";
import { useAuthStore } from '../../store/export.js';
import { useProfileLinks } from '../../hooks/useProfiles.js';
import { StatCard, AnalysisCard, VideoSuggestionCard } from '../../components/card/export.js';
import { SubmissionHeatmap, DistributionChart } from '../../components/charts/export.js';
import { ErrorContainer, ScoreMeter, MemeContainer, BadgeCollection } from '../../components/export.js';
import { LANGUAGE_COLORS } from '../../constants/index.js';

const GithubAnalyse = () => {
    const user = useAuthStore((state) => state.user);
    const { data: profile } = useProfileLinks(user?._id);
    const [username, setUsername] = useState(profile?.githubUsername || "");
    const queryClient = useQueryClient();

    const { data: analysisData, isError, error, refetch, isFetching } = useGithubAnalysis(username.trim());

    const handleAnalyze = async () => {
        if (!username.trim()) return;
        await refetch();
    };

    const suggestedVideo = analysisData?.profileAnalysis?.video;

    const totalBytes = analysisData?.languageStats ? Object.values(analysisData.languageStats).reduce((a, b) => a + b, 0) : 0;

    const languageData = analysisData?.languageStats ? Object.entries(analysisData.languageStats).map(([name, bytes], idx) => ({
        name,
        value: totalBytes > 0 ? Number(((bytes / totalBytes) * 100).toFixed(1)) : 0,
        color: LANGUAGE_COLORS[idx % LANGUAGE_COLORS.length]
    })).sort((a, b) => b.value - a.value) : [];

    const repoTypeData = [
        { name: 'Personal', value: analysisData?.userRepos?.filter((repo) => !repo.fork)?.length || 0, color: '#10b981' },
        { name: 'Forked', value: analysisData?.userRepos?.filter((repo) => repo.fork)?.length || 0, color: '#6366f1' },
    ];

    const gitHubStats = [
        { title: "Total Repos", value: analysisData?.userData?.public_repos || 0, color: "green", Icon: FolderOpen },
        { title: "Total Commits", value: analysisData?.contributionCount?.commitsCount || 0, color: "blue", Icon: GitCommit },
        { title: "Total Stars", value: analysisData?.starsCount || 0, color: "amber", Icon: Star },
        { title: "Total Forks", value: analysisData?.forksCount || 0, color: "purple", Icon: GitFork },
        { title: "Followers", value: analysisData?.userData?.followers || 0, color: "blue", Icon: Users },
        { title: "Following", value: analysisData?.userData?.following || 0, color: "purple", Icon: UserPlus },
        { title: "Pull Requests", value: analysisData?.contributionCount?.pullRequestsCount || 0, color: "green", Icon: GitPullRequest },
        { title: "Contributions", value: (analysisData?.totalContributions || 0), color: "amber", Icon: Zap },
    ]

    let content;

    if (isError) {
        content = (
            <ErrorContainer
                error={error} onRetry={handleAnalyze} isLoading={isFetching}
                onBack={() => {
                    queryClient.resetQueries({ queryKey: ["githubData", username.trim()] });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                errorAdditionalHelp={["Check if username is correct", "Ensure profile is public", "Try again in a few minutes"]}
            />
        );
    } else {
        content = (
            <div className="w-full">
                {/* Initial Screen / Header Area */}
                {!analysisData ? (
                    <div className="min-h-[70vh] flex flex-col justify-center items-center w-full">
                        <div className="w-full mx-auto p-6 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/60 space-y-8 animate-float-in">
                            <div className="text-center space-y-2">
                                <Code className="h-10 w-10 text-blue-600 mx-auto" />
                                <h1 className="text-3xl font-black text-gray-800">GitHub Analytics</h1>
                                <p className="text-gray-500 max-w-xl mx-auto">Enter your GitHub username to unlock AI-powered insights and contribution analysis.</p>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Search className="h-4 w-4 text-blue-500" /> GitHub Username
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="e.g. torvalds"
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-medium"
                                    onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                                    <div className="flex items-center gap-2 mb-2"><Sparkles className="h-4 w-4 text-blue-600" /><span className="font-semibold text-blue-800 text-sm">Key Benefits</span></div>
                                    <ul className="text-xs text-blue-700 space-y-1"><li>• Contribution metrics</li><li>• Profile strengths</li><li>• Areas for improvement</li></ul>
                                </div>
                                <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
                                    <div className="flex items-center gap-2 mb-2"><Target className="h-4 w-4 text-purple-600" /><span className="font-semibold text-purple-800 text-sm">Focus Areas</span></div>
                                    <ul className="text-xs text-purple-700 space-y-1"><li>• Language insights</li><li>• Commit history</li><li>• Repository types</li></ul>
                                </div>
                            </div>

                            <button
                                onClick={handleAnalyze} disabled={!username || isFetching}
                                className={`w-full flex items-center justify-center gap-3 font-bold py-4 px-6 rounded-2xl shadow-lg transition-all transform group ${username && !isFetching ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:shadow-xl hover:-translate-y-1' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                            >
                                {isFetching ? (
                                    <><Loader2 className="h-5 w-5 animate-spin" /><span className="text-lg">Analyzing...</span></>
                                ) : (
                                    <><Shield className="h-5 w-5 group-hover:scale-110 transition-transform" /><span className="text-lg">Analyze Profile</span><FileText className="h-5 w-5 group-hover:rotate-12 transition-transform" /></>
                                )}
                            </button>
                        </div>
                    </div>
                ) : null}

                {/* Analysis Data */}
                {analysisData && (
                    <div className="space-y-8 animate-fade-in-up mt-8">
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
                                            points={analysisData?.profileAnalysis?.analysis}
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
                                                points={analysisData?.profileAnalysis?.strongPoints || []}
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
                                                points={analysisData?.profileAnalysis?.improvementAreas || []}
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
                                        We couldn&apos;t generate a detailed profile analysis at this time. This might be due to insufficient public activity or API limitations.
                                    </p>
                                </div>
                            )}
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

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                            <DistributionChart
                                title="Language Distribution"
                                data={languageData}
                                className="col-span-1"
                                includeLabels={true}
                            />

                            <DistributionChart
                                title="Repo Type Distribution"
                                data={repoTypeData}
                                className="col-span-1"
                                includeLabels={true}
                            />
                        </div>

                        <SubmissionHeatmap
                            calendar={analysisData?.multiYearContributionCalendar}
                        />

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                            <BadgeCollection
                                badges={analysisData?.contributionBadges || []}
                                title="GitHub Badges"
                            />

                            {suggestedVideo && (
                                <VideoSuggestionCard
                                    suggestedVideo={suggestedVideo}
                                />
                            )}
                        </div>

                        <div className="sticky bottom-2 w-full flex justify-end z-50 pointer-events-none">
                            <button
                                onClick={() => {
                                    queryClient.resetQueries({ queryKey: ["githubData", username.trim()] });
                                    setUsername("");
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="pointer-events-auto flex items-center gap-0 hover:gap-3 px-4 py-4 hover:px-8 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-bold rounded-full hover:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 group"
                            >
                                <Search className="w-6 h-6 group-hover:scale-110 transition-transform shrink-0" />
                                <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                                    Analyze Another Profile
                                </span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="flex-1 w-full">
            {content}
        </div>
    );
};

export default GithubAnalyse;