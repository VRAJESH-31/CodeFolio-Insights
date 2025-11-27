import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import useDashboard from '../hooks/useDashboard';
import { Loader2, AlertCircle } from 'lucide-react';
import StatCard from '../components/StatCard';
import ActivityChart from '../components/ActivityChart';
import LanguageChart from '../components/LanguageChart';
import DifficultyChart from '../components/DifficultyChart';
import RepoTable from '../components/RepoTable';
import TopicStats from '../components/TopicStats';
import { getRandomHexColor } from '../utils/helper';

const App = () => {
    const [activeMenu, setActiveMenu] = useState('Dashboard');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const navigate = useNavigate();

    const { githubData, leetcodeData, resumeData, profiles, isLoading } = useDashboard();

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

    // Check if profiles are linked
    const hasGithub = !!profiles?.githubUsername;
    const hasLeetcode = !!profiles?.leetCodeUsername;

    return (
        <div className="flex h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 font-sans overflow-hidden relative">
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
                {/* Enhanced Header with Glass Morphism */}
                <header className="bg-white/70 backdrop-blur-xl shadow-sm border-b border-blue-100/30 z-20 sticky top-0">
                    <div className="flex items-center justify-between p-4 lg:p-6">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                                className="p-3 rounded-2xl text-gray-600 hover:text-blue-600 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-105 group backdrop-blur-sm"
                            >
                                <i className="fa-solid fa-bars text-lg group-hover:rotate-90 transition-transform duration-300"></i>
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

                        <div className="flex items-center space-x-3 lg:space-x-6">
                            {/* Enhanced Date Filter */}
                            <div className="relative">
                                <details className="group [&[open]>summary>i]:-rotate-180">
                                    <summary className="flex items-center gap-2 lg:gap-3 text-sm cursor-pointer list-none p-2.5 lg:p-3 rounded-2xl border border-blue-100/50 hover:border-blue-200 hover:bg-white/80 transition-all duration-300 backdrop-blur-sm bg-white/50">
                                        <i className="fa-solid fa-calendar-days text-blue-500 text-sm"></i>
                                        <span className="font-semibold text-gray-700 hidden sm:inline">Last 30 days</span>
                                        <i className="fa-solid fa-chevron-down transition-transform duration-300 text-xs text-blue-500"></i>
                                    </summary>
                                    <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-100/50 z-30 animate-scale-in overflow-hidden">
                                        <div className="py-2">
                                            {['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'This month', 'Custom range'].map((item, index) => (
                                                <a key={item} href="#" className={`flex items-center gap-3 px-4 py-3 text-sm transition-all duration-300 hover:bg-blue-50/80 group/item ${item === 'Last 30 days' ? 'text-blue-600 bg-blue-50/50' : 'text-gray-700'
                                                    }`}>
                                                    <i className={`fa-solid ${['fa-sun', 'fa-clock-rotate-left', 'fa-calendar-week', 'fa-calendar-days', 'fa-chart-column', 'fa-sliders'][index]
                                                        } w-4 text-center group-hover/item:scale-110 transition-transform text-blue-400`}></i>
                                                    <span className="font-medium">{item}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </details>
                            </div>

                            {/* Enhanced Search */}
                            <div className="relative hidden sm:block">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search analytics..."
                                        className="py-2.5 pl-10 pr-4 text-sm border border-blue-100/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 transition-all duration-300 w-48 lg:w-56 bg-white/80 backdrop-blur-sm"
                                    />
                                    <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400"></i>
                                </div>
                            </div>

                            {/* Notification Bell */}
                            <button className="p-2.5 rounded-2xl text-gray-600 hover:text-blue-600 hover:bg-white/80 transition-all duration-300 relative group">
                                <i className="fa-solid fa-bell text-lg"></i>
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Enhanced Main Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-6 xl:p-8 custom-scrollbar relative">
                    {isLoading && (
                        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
                            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                        </div>
                    )}

                    {(!hasGithub || !hasLeetcode) && !isLoading && (
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg shadow-sm flex items-center justify-between animate-fade-in-up">
                            <div className="flex items-center">
                                <AlertCircle className="w-6 h-6 text-blue-500 mr-3" />
                                <div>
                                    <h3 className="font-bold text-blue-900">Complete your profile</h3>
                                    <p className="text-sm text-blue-700">
                                        {!hasGithub && !hasLeetcode ? "Link your GitHub and LeetCode profiles" :
                                            !hasGithub ? "Link your GitHub profile" : "Link your LeetCode profile"}
                                        to see full analytics.
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate('/profile')}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md"
                            >
                                Connect Now
                            </button>
                        </div>
                    )}

                    {/* Stats Grid with Enhanced Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                        {[
                            {
                                title: "LeetCode Problems",
                                value: leetcodeData?.problemsCount?.acSubmissionNum?.[0]?.count || 0,
                                change: "Total Solved",
                                icon: "fa-code",
                                color: "blue"
                            },
                            {
                                title: "Acceptance Rate",
                                value: leetcodeData?.acceptanceRate ? `${(leetcodeData.acceptanceRate * 100).toFixed(1)}%` : "N/A",
                                change: "LeetCode",
                                icon: "fa-check-double",
                                color: "green"
                            },
                            {
                                title: "GitHub Commits",
                                value: githubData?.lastYearCommitsCount || 0,
                                change: "Last Year",
                                icon: "fa-code-commit",
                                color: "purple"
                            },
                            {
                                title: "GitHub Stars",
                                value: githubData?.starsCount || 0,
                                change: "Total Earned",
                                icon: "fa-star",
                                color: "yellow"
                            },
                            {
                                title: "Current Streak",
                                value: githubData?.currentStreak ? `${githubData.currentStreak} Days` : "0 Days",
                                change: "GitHub Activity",
                                icon: "fa-fire",
                                color: "orange"
                            },
                            {
                                title: "Resume Score",
                                value: resumeData?.score ? `${Math.round(resumeData.score)}/100` : "N/A",
                                change: "Latest Scan",
                                icon: "fa-file-lines",
                                color: "teal"
                            }
                        ].map((stat, index) => (
                            <StatCard
                                key={stat.title}
                                {...stat}
                                index={index}
                            />
                        ))}
                    </div>

                    {/* Charts Grid with Improved Spacing */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
                        {/* Main Chart */}
                        <ActivityChart githubData={githubData} leetcodeData={leetcodeData} />

                        {/* Side Charts */}
                        <div className="space-y-4 lg:space-y-6">
                            <LanguageChart githubData={githubData} />
                            <DifficultyChart leetcodeData={leetcodeData} />
                            {leetcodeData?.topicWiseProblems && (
                                <TopicStats topicData={getLeetcodeTopicData(leetcodeData.topicWiseProblems)} />
                            )}
                        </div>
                    </div>

                    {/* Enhanced Repositories Table */}
                    <RepoTable githubData={githubData} />
                </main>
            </div>

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

export default App;