// src/pages/GitHub.jsx
import React, { useState, useEffect } from 'react';
import {
    Search,
    GitBranch,
    GitCommit,
    GitPullRequest,
    Star,
    Users,
    Eye,
    Code,
    Calendar,
    TrendingUp,
    Award,
    Crown,
    Sparkles,
    Rocket,
    Brain,
    Lightbulb,
    Shield,
    FolderOpen,
    Clock,
    Zap
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
} from 'recharts';

const GitHub = () => {
    const [username, setUsername] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const commitData = [
        { name: 'Jan', commits: 45, additions: 1200, deletions: 400 },
        { name: 'Feb', commits: 62, additions: 1800, deletions: 600 },
        { name: 'Mar', commits: 38, additions: 950, deletions: 300 },
        { name: 'Apr', commits: 85, additions: 2200, deletions: 800 },
        { name: 'May', commits: 72, additions: 1900, deletions: 550 },
        { name: 'Jun', commits: 98, additions: 2800, deletions: 900 },
        { name: 'Jul', commits: 65, additions: 1700, deletions: 500 },
        { name: 'Aug', commits: 112, additions: 3200, deletions: 1100 },
        { name: 'Sep', commits: 88, additions: 2400, deletions: 700 },
    ];

    const languageData = [
        { name: 'JavaScript', value: 35, color: '#F7DF1E' },
        { name: 'TypeScript', value: 25, color: '#3178C6' },
        { name: 'Python', value: 20, color: '#3776AB' },
        { name: 'Java', value: 12, color: '#ED8B00' },
        { name: 'Go', value: 8, color: '#00ADD8' },
    ];

    const repoTypeData = [
        { name: 'Public', value: 15, color: '#10B981' },
        { name: 'Private', value: 8, color: '#F59E0B' },
        { name: 'Forked', value: 6, color: '#3B82F6' },
    ];

    const activityData = [
        { name: 'Mon', commits: 12, prs: 3, issues: 2 },
        { name: 'Tue', commits: 8, prs: 5, issues: 1 },
        { name: 'Wed', commits: 15, prs: 2, issues: 4 },
        { name: 'Thu', commits: 6, prs: 4, issues: 3 },
        { name: 'Fri', commits: 18, prs: 6, issues: 2 },
        { name: 'Sat', commits: 4, prs: 1, issues: 0 },
        { name: 'Sun', commits: 2, prs: 0, issues: 1 },
    ];

    const handleAnalyze = () => {
        if (!username.trim()) return;
        
        setIsLoading(true);
        setTimeout(() => {
            setAnalysis({
                totalRepos: 23,
                totalCommits: 685,
                totalStars: 156,
                totalForks: 42,
                followers: 89,
                following: 45,
                profileScore: 78,
                contributions: '1,245',
                pullRequests: 67,
                issues: 23,
                weeklyActivity: 'High',
                accountAge: '2.5 years'
            });
            setIsLoading(false);
        }, 2000);
    };

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
        <div className="flex min-h-screen bg-gradient-to-br from-green-50/30 via-white to-blue-50/30 font-sans">
            <style>{animationStyles}</style>
            
            <Sidebar
                isSidebarCollapsed={false}
                activeMenu="GitHub"
                setActiveMenu={() => {}}
                user={{ name: 'John Doe', jobTitle: 'Developer' }}
                handleLogout={() => alert('Logged out')}
            />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4 animate-float-in">
                    <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                        GitHub Analytics
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Dive deep into your GitHub activity with AI-powered insights and contribution analysis
                    </p>
                </div>

                {/* Input Section */}
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '100ms'}}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl shadow-lg">
                            <Code className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-black text-gray-800">Analyze Your Profile</h3>
                            <p className="text-gray-500 text-sm mt-1">Enter your GitHub username to unlock insights</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your GitHub username..."
                                className="w-full p-4 pl-12 text-lg border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-green-300"
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                        <button
                            onClick={handleAnalyze}
                            disabled={isLoading}
                            className={`flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-black px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed ${
                                isLoading ? 'cursor-wait' : 'hover:from-green-600 hover:to-blue-700'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span className="text-lg">Analyzing...</span>
                                </>
                            ) : (
                                <>
                                    <Brain className="w-5 h-5" />
                                    <span className="text-lg">Deep Analysis</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Results Section */}
                {analysis && (
                    <div className="space-y-8">
                        {/* Score and Meme Section - Top Position */}
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                            {/* Score Circle - Left Side */}
                            <div className="xl:col-span-1 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in">
                                <div className="text-center space-y-6">
                                    <div className="flex items-center justify-center gap-3 mb-4">
                                        <Crown className="h-8 w-8 text-yellow-500" />
                                        <h3 className="text-2xl font-black text-gray-800">GitHub Score</h3>
                                    </div>
                                    
                                    <div className="relative inline-block">
                                        <div className="w-48 h-48 relative">
                                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                                {/* Background Circle */}
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="45"
                                                    fill="none"
                                                    stroke="#e5e7eb"
                                                    strokeWidth="8"
                                                />
                                                {/* Progress Circle */}
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="45"
                                                    fill="none"
                                                    stroke="url(#githubScoreGradient)"
                                                    strokeWidth="8"
                                                    strokeLinecap="round"
                                                    strokeDasharray="283"
                                                    strokeDashoffset={283 - (283 * analysis.profileScore) / 100}
                                                    className="animate-score-progress"
                                                />
                                                <defs>
                                                    <linearGradient id="githubScoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                        <stop offset="0%" stopColor="#10b981" />
                                                        <stop offset="100%" stopColor="#3b82f6" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-5xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                                    {analysis.profileScore}
                                                </span>
                                                <span className="text-lg text-gray-500 font-semibold">/100</span>
                                                <div className="flex items-center gap-1 mt-2">
                                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                                    <span className="text-sm text-green-600 font-semibold">+8% this month</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600">Progress to Expert</span>
                                            <span className="font-semibold text-green-600">78%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full transition-all duration-1000 animate-shimmer"
                                                style={{ width: '78%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Meme and Review - Right Side */}
                            <div className="xl:col-span-2 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '200ms'}}>
                                <GitHubScoreReview score={analysis.profileScore} />
                            </div>
                        </div>

                        {/* Enhanced Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: FolderOpen, title: "Total Repositories", value: analysis.totalRepos, change: "+3", color: "green" },
                                { icon: GitCommit, title: "Total Commits", value: analysis.totalCommits, change: "+45", color: "blue" },
                                { icon: Star, title: "Total Stars", value: analysis.totalStars, change: "+12", color: "yellow" },
                                { icon: GitBranch, title: "Total Forks", value: analysis.totalForks, change: "+5", color: "purple" },
                            ].map((stat, index) => (
                                <GitHubStatCard key={stat.title} {...stat} delay={index * 100} />
                            ))}
                        </div>

                        {/* Additional Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: Users, title: "Followers", value: analysis.followers, change: "+8", color: "indigo" },
                                { icon: Eye, title: "Following", value: analysis.following, change: "+2", color: "pink" },
                                { icon: GitPullRequest, title: "Pull Requests", value: analysis.pullRequests, change: "+7", color: "orange" },
                                { icon: Zap, title: "Contributions", value: analysis.contributions, change: "+89", color: "cyan" },
                            ].map((stat, index) => (
                                <GitHubStatCard key={stat.title} {...stat} delay={(index + 4) * 100} />
                            ))}
                        </div>

                        {/* Charts Grid */}
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                            {/* Commit Activity */}
                            <div className="xl:col-span-2 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '300ms'}}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl">
                                        <Calendar className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-800">Commit Activity</h3>
                                </div>
                                <div style={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <LineChart data={commitData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                                            <YAxis stroke="#6b7280" fontSize={12} />
                                            <Tooltip 
                                                contentStyle={{ 
                                                    background: 'rgba(255, 255, 255, 0.9)', 
                                                    backdropFilter: 'blur(10px)',
                                                    border: '1px solid #e5e7eb',
                                                    borderRadius: '12px'
                                                }}
                                            />
                                            <Legend />
                                            <Line 
                                                type="monotone" 
                                                dataKey="commits" 
                                                stroke="#10b981" 
                                                strokeWidth={3} 
                                                dot={{ fill: '#10b981', r: 4 }} 
                                                activeDot={{ r: 6, fill: '#059669' }}
                                            />
                                            <Line 
                                                type="monotone" 
                                                dataKey="additions" 
                                                stroke="#3b82f6" 
                                                strokeWidth={2}
                                                dot={{ fill: '#3b82f6', r: 3 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Language Distribution */}
                            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '400ms'}}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                                        <Code className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-800">Language Distribution</h3>
                                </div>
                                <div style={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <PieChart>
                                            <Pie
                                                data={languageData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={100}
                                                paddingAngle={2}
                                                dataKey="value"
                                            >
                                                {languageData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip 
                                                contentStyle={{ 
                                                    background: 'rgba(255, 255, 255, 0.9)', 
                                                    backdropFilter: 'blur(10px)',
                                                    border: '1px solid #e5e7eb',
                                                    borderRadius: '12px'
                                                }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    {languageData.slice(0, 4).map((item, index) => (
                                        <div key={item.name} className="text-center p-3 rounded-2xl bg-gray-50/80">
                                            <div className="text-sm font-semibold text-gray-600">{item.name}</div>
                                            <div className="text-xl font-black text-gray-800">{item.value}%</div>
                                            <div className="text-xs text-gray-500">usage</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Additional Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Repository Types */}
                            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '500ms'}}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                                        <GitBranch className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-800">Repository Types</h3>
                                </div>
                                <div style={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <BarChart data={repoTypeData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                                            <YAxis stroke="#6b7280" fontSize={12} />
                                            <Tooltip 
                                                contentStyle={{ 
                                                    background: 'rgba(255, 255, 255, 0.9)', 
                                                    backdropFilter: 'blur(10px)',
                                                    border: '1px solid #e5e7eb',
                                                    borderRadius: '12px'
                                                }}
                                            />
                                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                                {repoTypeData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Weekly Activity */}
                            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '600ms'}}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl">
                                        <Zap className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-800">Weekly Activity</h3>
                                </div>
                                <div style={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <BarChart data={activityData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                                            <YAxis stroke="#6b7280" fontSize={12} />
                                            <Tooltip 
                                                contentStyle={{ 
                                                    background: 'rgba(255, 255, 255, 0.9)', 
                                                    backdropFilter: 'blur(10px)',
                                                    border: '1px solid #e5e7eb',
                                                    borderRadius: '12px'
                                                }}
                                            />
                                            <Legend />
                                            <Bar dataKey="commits" fill="#10b981" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="prs" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="issues" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* AI Recommendations */}
                        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '700ms'}}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                                    <Lightbulb className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-800">AI Recommendations</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5 text-green-500" />
                                        Strengths
                                    </h4>
                                    <ul className="space-y-2 text-gray-600">
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            Consistent commit activity throughout the year
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            Strong presence in JavaScript and TypeScript
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            Active in open source contributions
                                        </li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                        <Zap className="h-5 w-5 text-amber-500" />
                                        Areas to Improve
                                    </h4>
                                    <ul className="space-y-2 text-gray-600">
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                            Increase documentation in repositories
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                            More engagement with community projects
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                            Diversify into backend technologies
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

/* --- Enhanced GitHub Score & Meme Review --- */
const GitHubScoreReview = ({ score }) => {
    const getMemeForScore = (score) => {
        if (score <= 10) return { 
            text: "Bro, do you even commit?", 
            meme: "https://media1.tenor.com/m/5cIs6QvX3uMAAAAC/gajab-bezzati-salman-khan.gif",
            comment: "Time to start your GitHub journey!",
            bg: "from-red-50 to-orange-50",
            border: "border-red-200"
        };
        if (score <= 30) return { 
            text: "Getting there! Baby steps...", 
            meme: "https://media1.tenor.com/m/6gB-_c6lVqoAAAAC/baburao-style-hai.gif",
            comment: "Consistency is key. Keep pushing!",
            bg: "from-orange-50 to-yellow-50",
            border: "border-orange-200"
        };
        if (score <= 60) return { 
            text: "Solid contributor in the making!", 
            meme: "https://media1.tenor.com/m/6vEVb2uGj8kAAAAC/50-ruppee-kat-rajkumar-hirani.gif",
            comment: "You're building great momentum!",
            bg: "from-yellow-50 to-lime-50",
            border: "border-yellow-200"
        };
        if (score <= 80) return { 
            text: "GitHub warrior in action! 💪", 
            meme: "https://media1.tenor.com/m/9rWnSoV8cU0AAAAC/ab-sale.gif",
            comment: "Impressive activity and contributions!",
            bg: "from-green-50 to-emerald-50",
            border: "border-green-200"
        };
        if (score <= 100) return { 
            text: "Open Source Legend! 🏆", 
            meme: "https://media1.tenor.com/m/4zRz1b9W1bAAAAAC/maula-mere-maula.gif",
            comment: "You're crushing the GitHub game!",
            bg: "from-blue-50 to-purple-50",
            border: "border-blue-200"
        };
        return { text: "", meme: "", comment: "", bg: "", border: "" };
    };

    const review = getMemeForScore(score);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
                <Sparkles className="h-7 w-7 text-blue-600" />
                <h3 className="text-2xl font-black text-gray-800">AI GitHub Review</h3>
            </div>
            
            <div className={`rounded-3xl p-6 border-2 ${review.border} bg-gradient-to-br ${review.bg} shadow-lg animate-bounce-in`}>
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm border">
                        <Code className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-semibold text-gray-700">GitHub Performance Review</span>
                    </div>
                    
                    <div className="rounded-2xl overflow-hidden shadow-lg mx-auto max-w-md">
                        <img 
                            src={review.meme} 
                            alt="GitHub performance meme" 
                            className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                    
                    <div className="space-y-3">
                        <p className="text-2xl font-black text-gray-800 italic leading-tight">
                            "{review.text}"
                        </p>
                        <p className="text-gray-600 font-medium">
                            {review.comment}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gradient-to-br from-green-50 to-cyan-50 p-4 rounded-2xl border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-800">GitHub Strengths</span>
                    </div>
                    <ul className="text-sm text-green-700 space-y-1">
                        <li>• Consistent commit history</li>
                        <li>• Active in multiple repositories</li>
                        <li>• Good mix of personal and contributed projects</li>
                    </ul>
                </div>
                
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-amber-600" />
                        <span className="font-semibold text-amber-800">Growth Opportunities</span>
                    </div>
                    <ul className="text-sm text-amber-700 space-y-1">
                        <li>• Increase repository documentation</li>
                        <li>• More engagement with issues</li>
                        <li>• Diversify technology stack</li>
                    </ul>
                </div>
            </div>

            <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                <Shield className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-lg">Get Detailed GitHub Report</span>
                <GitBranch className="h-5 w-5 group-hover:rotate-12 transition-transform" />
            </button>
        </div>
    );
};

/* --- Enhanced GitHub Stat Card --- */
const GitHubStatCard = ({ icon: Icon, title, value, change, color, delay }) => {
    const colorClasses = {
        green: { bg: 'from-green-500 to-emerald-600', text: 'text-green-600', bgLight: 'bg-green-100' },
        blue: { bg: 'from-blue-500 to-cyan-600', text: 'text-blue-600', bgLight: 'bg-blue-100' },
        yellow: { bg: 'from-yellow-500 to-amber-600', text: 'text-yellow-600', bgLight: 'bg-yellow-100' },
        purple: { bg: 'from-purple-500 to-indigo-600', text: 'text-purple-600', bgLight: 'bg-purple-100' },
        indigo: { bg: 'from-indigo-500 to-purple-600', text: 'text-indigo-600', bgLight: 'bg-indigo-100' },
        pink: { bg: 'from-pink-500 to-rose-600', text: 'text-pink-600', bgLight: 'bg-pink-100' },
        orange: { bg: 'from-orange-500 to-red-600', text: 'text-orange-600', bgLight: 'bg-orange-100' },
        cyan: { bg: 'from-cyan-500 to-blue-600', text: 'text-cyan-600', bgLight: 'bg-cyan-100' },
    };

    const colors = colorClasses[color] || colorClasses.green;

    return (
        <div 
            className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-2xl border border-white/60 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 animate-float-in"
            style={{animationDelay: `${delay}ms`}}
        >
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${colors.bg} shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-bold ${colors.text} bg-white/80 px-2 py-1 rounded-full border`}>
                    {change}
                </span>
            </div>
            <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{title}</p>
                <p className="text-3xl font-black text-gray-800">{value}</p>
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5">
                <div 
                    className={`h-1.5 rounded-full bg-gradient-to-r ${colors.bg} transition-all duration-1000 animate-shimmer`}
                    style={{ width: '75%' }}
                ></div>
            </div>
        </div>
    );
};

export default GitHub;