import React, { useMemo, useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import useDashboard from '../hooks/useDashboard';
import StatCard from '../components/StatCard';
import TopicStats from '../components/TopicStats';
import RepoTable from '../components/RepoTable';
import DifficultyChart from '../components/DifficultyChart';
import LanguageChart from '../components/LanguageChart';
import { Loader2, AlertCircle, Code, Calendar, Flame, Award, GitCommit, Layers, ExternalLink, Trophy, Target, Zap } from 'lucide-react';
import { getRandomHexColor } from '../utils/helper';

// --- Utility Components ---

const PlatformCard = ({ platform, data, icon, color, link }) => {
    if (!data) return null;
    const Icon = icon;

    return (
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group animate-float-in">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <Icon className="w-6 h-6" style={{ color }} />
                    </div>
                    <h3 className="text-gray-900 font-black text-lg capitalize">{platform}</h3>
                </div>
                {link && (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                    </a>
                )}
            </div>

            <div className="space-y-4 flex-1">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center text-sm border-b border-gray-100 pb-3 last:border-0 last:pb-0 hover:bg-gray-50/50 px-2 py-1 rounded transition-colors">
                        <span className="text-gray-600 font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-gray-900 font-black font-mono">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Main Component ---

const HomePage = () => {
    const [activeMenu, setActiveMenu] = useState('Dashboard');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const { dashboardData, isLoading, error } = useDashboard();

    // Debug: Log data when it changes
    useEffect(() => {
        if (dashboardData) {
            console.log('=== DASHBOARD DATA ===');
            console.log('Full Data:', dashboardData);
            console.log('LeetCode:', dashboardData.leetcode);
            console.log('  - Profile:', dashboardData.leetcode?.profile);
            console.log('  - Submission:', dashboardData.leetcode?.submission);
            console.log('  - Contest:', dashboardData.leetcode?.contest);
            console.log('  - Badges:', dashboardData.leetcode?.badges);
            console.log('  - Problems:', dashboardData.leetcode?.problems);
            console.log('  - ProblemsCount:', dashboardData.leetcode?.problemsCount);
            console.log('  - TopicWiseProblems:', dashboardData.leetcode?.topicWiseProblems);
            console.log('GitHub:', dashboardData.github);
            console.log('  - Profile:', dashboardData.github?.profile);
            console.log('  - Commits:', dashboardData.github?.commits);
            console.log('  - Contributions:', dashboardData.github?.contributions);
            console.log('  - Calendar:', dashboardData.github?.calendar);
            console.log('  - Badges:', dashboardData.github?.badges);
            console.log('  - LanguageStats:', dashboardData.github?.languageStats);
            console.log('  - LanguageUsageInBytes:', dashboardData.github?.languageUsageInBytes);
            console.log('  - UserReposStat:', dashboardData.github?.userReposStat);
            console.log('GFG:', dashboardData.gfg);
            console.log('CodeChef:', dashboardData.codechef);
            console.log('InterviewBit:', dashboardData.interviewbit);
        }
    }, [dashboardData]);

    // --- Client-Side Aggregation ---
    const stats = useMemo(() => {
        if (!dashboardData) return null;

        const { leetcode, github, gfg, codechef, interviewbit } = dashboardData;

        const totalQuestions = (
            (leetcode?.submission?.totalSolved || 0) +
            (gfg?.submission?.totalSolved || 0) +
            (codechef?.submission?.totalSolved || 0) +
            (interviewbit?.profile?.totalSolved || 0)
        );

        const githubActiveDays = github?.calendar?.totalActiveDays || 0;
        const totalActiveDays = Math.max(githubActiveDays, 0);

        const currentStreak = Math.max(
            github?.calendar?.currentStreak || 0,
            leetcode?.submission?.streak || 0,
            gfg?.submission?.streak || 0
        );

        const totalBadges = (
            (leetcode?.badges?.length || 0) +
            (github?.badges?.length || 0) +
            (gfg?.profile?.badgesCount || 0)
        );

        return {
            totalQuestions,
            totalActiveDays,
            currentStreak,
            totalBadges
        };
    }, [dashboardData]);

    // Get LeetCode topic data
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
                })
            }
        }
        return responseTopicData.sort(() => Math.random() - 0.5).filter((_, index) => index < 10);
    }

    // Animation styles
    const animationStyles = `
        @keyframes floatIn {
            0% { opacity: 0; transform: translateY(20px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes glowPulse {
            0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.1); }
            50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.2); }
        }
        @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: 200px 0; }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-float-in { animation: floatIn 0.6s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.5s ease-out forwards; }
        .animate-glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
        .animate-shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            background-size: 200px 100%;
            animation: shimmer 2s infinite;
        }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.4s ease-out forwards; }
    `;

    // Common layout wrapper
    const renderLayout = (content) => (
        <div className="flex h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 font-sans text-gray-900 overflow-hidden relative">
            <style>{animationStyles}</style>

            {/* Enhanced Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/10 to-purple-100/10 rounded-full blur-3xl"></div>
            </div>

            <Sidebar
                isSidebarCollapsed={isSidebarCollapsed}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
            />

            <div className="flex-1 flex flex-col overflow-hidden relative">
                <header className="bg-white/70 backdrop-blur-xl shadow-sm border-b border-blue-100/30 z-20 sticky top-0">
                    <div className="flex items-center justify-between p-4 lg:p-6">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                                className="p-3 rounded-2xl text-gray-600 hover:text-blue-600 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-105 group backdrop-blur-sm"
                            >
                                <Layers className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                            <div className="flex flex-col">
                                <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-slide-in-right">
                                    CodeFolio Insights
                                </h1>
                                <p className="text-sm text-gray-500 mt-1 animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                                    Your comprehensive development analytics
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar relative">
                    {content}
                </main>
            </div>
        </div>
    );

    if (isLoading) {
        return renderLayout(
            <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                    <p className="text-gray-500 font-medium">Loading your coding profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return renderLayout(
            <div className="flex h-full items-center justify-center">
                <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md animate-scale-in">
                    <div className="bg-red-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to load dashboard</h2>
                    <p className="text-gray-500 mb-6">We couldn&apos;t fetch your profile data. Please check your connection or try again later.</p>
                    <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return renderLayout(
        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
            {/* Top Stats Row - Using existing StatCard component */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <StatCard
                    title="Total Questions"
                    value={stats?.totalQuestions || 0}
                    change="Across all platforms"
                    icon="fa-code"
                    color="blue"
                    index={0}
                />
                <StatCard
                    title="Active Days"
                    value={stats?.totalActiveDays || 0}
                    change="Consistency is key"
                    icon="fa-calendar-days"
                    color="green"
                    index={1}
                />
                <StatCard
                    title="Current Streak"
                    value={stats?.currentStreak || 0}
                    change="Keep it burning"
                    icon="fa-fire"
                    color="purple"
                    index={2}
                />
                <StatCard
                    title="Total Badges"
                    value={stats?.totalBadges || 0}
                    change="Achievements"
                    icon="fa-award"
                    color="amber"
                    index={3}
                />
            </div>

            {/* Platform Breakdown */}
            <div>
                <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2 animate-fade-in-up">
                    <Zap className="w-5 h-5 text-yellow-500" /> Platform Breakdown
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
                    <PlatformCard
                        platform="LeetCode"
                        icon={Code}
                        color="#ffa116"
                        data={{
                            solved: dashboardData?.leetcode?.submission?.totalSolved || 0,
                            ranking: dashboardData?.leetcode?.profile?.ranking || 'N/A',
                            acceptance: `${dashboardData?.leetcode?.submission?.acceptanceRate || 0}%`,
                            contestRating: Math.round(dashboardData?.leetcode?.contest?.rating) || 'N/A'
                        }}
                    />
                    <PlatformCard
                        platform="GitHub"
                        icon={GitCommit}
                        color="#181717"
                        data={{
                            commits: dashboardData?.github?.commits?.totalCommits || 0,
                            contributions: dashboardData?.github?.contributions?.total || 0,
                            stars: dashboardData?.github?.profile?.stars || 0,
                            prs: dashboardData?.github?.profile?.pullRequests || 0
                        }}
                    />
                    <PlatformCard
                        platform="GeeksforGeeks"
                        icon={Target}
                        color="#2f8d46"
                        data={{
                            solved: dashboardData?.gfg?.submission?.totalSolved || 0,
                            score: dashboardData?.gfg?.profile?.score || 0,
                            rank: dashboardData?.gfg?.profile?.rank || 'N/A',
                            streak: `${dashboardData?.gfg?.submission?.streak || 0} Days`
                        }}
                    />
                    <PlatformCard
                        platform="CodeChef"
                        icon={Trophy}
                        color="#5b4638"
                        data={{
                            solved: dashboardData?.codechef?.submission?.totalSolved || 0,
                            rating: dashboardData?.codechef?.profile?.currentRating || 0,
                            stars: dashboardData?.codechef?.profile?.stars || 'N/A',
                            highest: dashboardData?.codechef?.profile?.highestRating || 0
                        }}
                    />
                    <PlatformCard
                        platform="InterviewBit"
                        icon={Zap}
                        color="#00897b"
                        data={{
                            solved: dashboardData?.interviewbit?.profile?.totalSolved || 0,
                            score: dashboardData?.interviewbit?.profile?.score || 0,
                            rank: dashboardData?.interviewbit?.profile?.rank || 'N/A',
                            streak: `${dashboardData?.interviewbit?.profile?.streak || 0} Days`
                        }}
                    />
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
                {/* Difficulty & Language Charts */}
                <div className="space-y-4 lg:space-y-6">
                    <DifficultyChart leetcodeData={dashboardData?.leetcode} />
                    <LanguageChart githubData={dashboardData?.github} />
                    {dashboardData?.leetcode?.topicWiseProblems && (
                        <TopicStats topicData={getLeetcodeTopicData(dashboardData.leetcode.topicWiseProblems)} />
                    )}
                </div>

                {/* Repository Table */}
                <div className="xl:col-span-2">
                    <RepoTable githubData={dashboardData?.github} />
                </div>
            </div>

            {/* Custom Scrollbar Styles */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(59, 130, 246, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
                    border-radius: 10px;
                    opacity: 0.6;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #2563eb, #7c3aed);
                    opacity: 0.8;
                }
            `}</style>
        </div>
    );
};

export default HomePage;