import { useState } from "react";
import { TrendingUp, Code, Zap, FolderOpen, GitCommit, Star, GitFork, Users, UserPlus, GitPullRequest, AlertCircle, CheckCircle, Target, BarChart3 } from 'lucide-react';
import { useQueryClient } from "@tanstack/react-query";
import { useGithubAnalysis } from "../../hooks/useAnalyzer.js";
import { useAuthStore } from '../../store/export.js';
import { useProfileLinks } from '../../hooks/useProfiles.js';
import { StatCard, AnalysisCard, VideoSuggestionCard } from '../../components/card/export.js';
import { SubmissionHeatmap, DistributionChart } from '../../components/charts/export.js';
import { ErrorContainer, ScoreMeter, MemeContainer, BadgeCollection, UsernameInput } from '../../components/export.js';
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

    return (
        <div className="flex-1 space-y-8">
            <div className="text-center space-y-4 animate-float-in">
                <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight h-20">
                    GitHub Analytics
                </h1>
                <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-bold italic">
                    Dive deep into your GitHub activity with AI-powered insights and contribution analysis
                </p>
            </div>

            <UsernameInput
                value={username}
                onChange={setUsername}
                onAnalyze={handleAnalyze}
                isFetching={isFetching}
                placeholder="Enter your GitHub username..."
                title="Analyze Your Profile"
                subtitle="Enter GitHub username"
                Icon={Code}
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
                                    We couldn't generate a detailed profile analysis at this time. This might be due to insufficient public activity or API limitations.
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
                </div>
            )}

            {isError && (
                <ErrorContainer
                    error={error} onRetry={handleAnalyze} isLoading={isFetching}
                    onBack={() => {
                        queryClient.resetQueries({ queryKey: ["githubData", username.trim()] });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    errorAdditionalHelp={["Check if username is correct", "Ensure profile is public", "Try again in a few minutes"]}
                />
            )}
        </div>
    );
};

export default GithubAnalyse;