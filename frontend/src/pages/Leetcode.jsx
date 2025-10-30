// src/pages/LeetCode.jsx
import React, { useState, useEffect } from 'react';
import {
    Search,
    CheckCircle,
    Target,
    Zap,
    Award,
    Trophy,
    ChevronRight,
    PieChart as PieChartIcon,
    BarChart2,
    MessageSquareQuote,
    Star,
    TrendingUp,
    Clock,
    Users,
    Calendar,
    Sparkles,
    Crown,
    Rocket,
    Brain,
    Lightbulb,
    Shield
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

const LeetCode = () => {
    const [userId, setUserId] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const submissionData = [
        { name: 'Mar 18', solved: 2, submissions: 4 },
        { name: 'Jun 10', solved: 5, submissions: 8 },
        { name: 'Jun 18', solved: 2, submissions: 3 },
        { name: 'Jun 26', solved: 3, submissions: 5 },
        { name: 'Jul 3', solved: 1, submissions: 2 },
        { name: 'Jul 4', solved: 1, submissions: 1 },
        { name: 'Jul 23', solved: 1, submissions: 2 },
        { name: 'Aug 5', solved: 1, submissions: 1 },
        { name: 'Aug 21', solved: 2, submissions: 3 },
    ];

    const difficultyData = [
        { name: 'Easy', value: 12, color: '#34D399' },
        { name: 'Medium', value: 6, color: '#F59E0B' },
        { name: 'Hard', value: 1, color: '#EF4444' },
    ];

    const topicData = [
        { name: 'Arrays', value: 8, mastery: 65 },
        { name: 'DP', value: 3, mastery: 40 },
        { name: 'Trees', value: 5, mastery: 75 },
        { name: 'Graphs', value: 2, mastery: 30 },
        { name: 'Strings', value: 6, mastery: 70 },
    ];

    const handleAnalyze = () => {
        if (!userId.trim()) return;
        
        setIsLoading(true);
        setTimeout(() => {
            setAnalysis({
                totalSolved: 19,
                acceptanceRate: '80.77%',
                currentStreak: 0,
                longestStreak: 2,
                ranking: '3,719,824',
                profileScore: 82,
                weeklyRank: 'Top 45%',
                dailyChallenge: '3/7',
                contestRating: 1520,
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
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 font-sans">
            <style>{animationStyles}</style>
            
            <Sidebar
                isSidebarCollapsed={false}
                activeMenu="LeetCode"
                setActiveMenu={() => {}}
                user={{ name: 'John Doe', jobTitle: 'Developer' }}
                handleLogout={() => alert('Logged out')}
            />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4 animate-float-in">
                    <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                        LeetCode Analytics
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Master your coding journey with AI-powered insights and personalized recommendations
                    </p>
                </div>

                {/* Input Section */}
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '100ms'}}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                            <Rocket className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-black text-gray-800">Analyze Your Profile</h3>
                            <p className="text-gray-500 text-sm mt-1">Enter your LeetCode username to get started</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                placeholder="Enter your LeetCode UserID..."
                                className="w-full p-4 pl-12 text-lg border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-blue-300"
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                        <button
                            onClick={handleAnalyze}
                            disabled={isLoading}
                            className={`flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-black px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed ${
                                isLoading ? 'cursor-wait' : 'hover:from-blue-600 hover:to-purple-700'
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
                                        <h3 className="text-2xl font-black text-gray-800">Profile Score</h3>
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
                                                    stroke="url(#scoreGradient)"
                                                    strokeWidth="8"
                                                    strokeLinecap="round"
                                                    strokeDasharray="283"
                                                    strokeDashoffset={283 - (283 * analysis.profileScore) / 100}
                                                    className="animate-score-progress"
                                                />
                                                <defs>
                                                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                        <stop offset="0%" stopColor="#3b82f6" />
                                                        <stop offset="100%" stopColor="#8b5cf6" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                                    {analysis.profileScore}
                                                </span>
                                                <span className="text-lg text-gray-500 font-semibold">/100</span>
                                                <div className="flex items-center gap-1 mt-2">
                                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                                    <span className="text-sm text-green-600 font-semibold">+12% this month</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600">Progress to next level</span>
                                            <span className="font-semibold text-blue-600">68%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 animate-shimmer"
                                                style={{ width: '68%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Meme and Review - Right Side */}
                            <div className="xl:col-span-2 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '200ms'}}>
                                <ProfileScoreReview score={analysis.profileScore} />
                            </div>
                        </div>

                        {/* Enhanced Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: CheckCircle, title: "Total Solved", value: analysis.totalSolved, change: "+5", color: "green" },
                                { icon: Target, title: "Acceptance Rate", value: analysis.acceptanceRate, change: "+2.3%", color: "blue" },
                                { icon: Zap, title: "Current Streak", value: analysis.currentStreak, change: "🔥", color: "yellow" },
                                { icon: Award, title: "Contest Rating", value: analysis.contestRating, change: "+45", color: "purple" },
                            ].map((stat, index) => (
                                <StatCard key={stat.title} {...stat} delay={index * 100} />
                            ))}
                        </div>

                        {/* Charts Grid */}
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                            {/* Submission Activity */}
                            <div className="xl:col-span-2 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '300ms'}}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                                        <BarChart2 className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-800">Submission Activity</h3>
                                </div>
                                <div style={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <LineChart data={submissionData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
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
                                                dataKey="solved" 
                                                stroke="#3b82f6" 
                                                strokeWidth={3} 
                                                dot={{ fill: '#3b82f6', r: 4 }} 
                                                activeDot={{ r: 6, fill: '#1d4ed8' }}
                                            />
                                            <Line 
                                                type="monotone" 
                                                dataKey="submissions" 
                                                stroke="#8b5cf6" 
                                                strokeWidth={2} 
                                                strokeDasharray="3 3"
                                                dot={{ fill: '#8b5cf6', r: 3 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Problem Difficulty */}
                            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '400ms'}}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                                        <PieChartIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-800">Problem Difficulty</h3>
                                </div>
                                <div style={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <PieChart>
                                            <Pie
                                                data={difficultyData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={100}
                                                paddingAngle={2}
                                                dataKey="value"
                                            >
                                                {difficultyData.map((entry, index) => (
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
                                <div className="grid grid-cols-3 gap-4 mt-6">
                                    {difficultyData.map((item, index) => (
                                        <div key={item.name} className="text-center p-3 rounded-2xl bg-gray-50/80">
                                            <div className="text-sm font-semibold text-gray-600">{item.name}</div>
                                            <div className="text-xl font-black text-gray-800">{item.value}</div>
                                            <div className="text-xs text-gray-500">problems</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Additional Insights */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Topic Mastery */}
                            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '500ms'}}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                                        <Brain className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-800">Topic Mastery</h3>
                                </div>
                                <div className="space-y-4">
                                    {topicData.map((topic, index) => (
                                        <div key={topic.name} className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-gray-700">{topic.name}</span>
                                                <span className="text-sm font-bold text-blue-600">{topic.mastery}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className="h-2 rounded-full transition-all duration-1000"
                                                    style={{ 
                                                        width: `${topic.mastery}%`,
                                                        background: `linear-gradient(90deg, ${topicData[index].color}, ${topicData[index].color}99)`
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* AI Recommended Video */}
                            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '600ms'}}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                                        <Lightbulb className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-800">AI Recommended Content</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="aspect-video bg-gray-900 rounded-2xl mb-4 overflow-hidden shadow-lg">
                                        <iframe
                                            className="w-full h-full rounded-2xl"
                                            src="https://www.youtube.com/embed/P6FORpg0KVo"
                                            title="Dynamic Programming Tutorial"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                    <h4 className="text-xl font-black text-gray-800">Dynamic Programming: From Zero to Hero</h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        Master Dynamic Programming concepts with this AI-selected video. Focuses on your weak areas and provides practical examples.
                                    </p>
                                    <div className="flex items-center gap-4 pt-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Clock className="w-4 h-4" />
                                            <span>45 min watch</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Users className="w-4 h-4" />
                                            <span>1.2M views</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

/* --- Enhanced Profile Score & Meme Review --- */
const ProfileScoreReview = ({ score }) => {
    const getMemeForScore = (score) => {
        if (score <= 10) return { 
            text: "Bhai... kya kar raha hai tu?", 
            meme: "https://media1.tenor.com/m/9rWnSoV8cU0AAAAC/ab-sale.gif",
            comment: "Not great. Start from basics.",
            bg: "from-red-50 to-orange-50",
            border: "border-red-200"
        };
        if (score <= 30) return { 
            text: "Okay, we have a foundation.", 
            meme: "https://media1.tenor.com/m/6gB-_c6lVqoAAAAC/baburao-style-hai.gif",
            comment: "Focus on consistency and practice.",
            bg: "from-orange-50 to-yellow-50",
            border: "border-orange-200"
        };
        if (score <= 60) return { 
            text: "Average hai, overconfident mat hona.", 
            meme: "https://media1.tenor.com/m/6vEVb2uGj8kAAAAC/50-ruppee-kat-rajkumar-hirani.gif",
            comment: "Slightly above average! Keep pushing.",
            bg: "from-yellow-50 to-lime-50",
            border: "border-yellow-200"
        };
        if (score <= 80) return { 
            text: "Good job! Thoda aur...", 
            meme: "https://media1.tenor.com/m/5cIs6QvX3uMAAAAC/gajab-bezzati-salman-khan.gif",
            comment: "You're showing strong consistency.",
            bg: "from-green-50 to-emerald-50",
            border: "border-green-200"
        };
        if (score <= 100) return { 
            text: "Legendary! Sab phod diya.", 
            meme: "https://media1.tenor.com/m/4zRz1b9W1bAAAAAC/maula-mere-maula.gif",
            comment: "Outstanding work! You're crushing it.",
            bg: "from-blue-50 to-purple-50",
            border: "border-blue-200"
        };
        return { text: "", meme: "", comment: "", bg: "", border: "" };
    };

    const review = getMemeForScore(score);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
                <MessageSquareQuote className="h-7 w-7 text-purple-600" />
                <h3 className="text-2xl font-black text-gray-800">AI Performance Review</h3>
            </div>
            
            <div className={`rounded-3xl p-6 border-2 ${review.border} bg-gradient-to-br ${review.bg} shadow-lg animate-bounce-in`}>
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm border">
                        <Sparkles className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-semibold text-gray-700">AI Generated Review</span>
                    </div>
                    
                    <div className="rounded-2xl overflow-hidden shadow-lg mx-auto max-w-md">
                        <img 
                            src={review.meme} 
                            alt="Performance meme" 
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
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-2xl border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-blue-800">Strengths</span>
                    </div>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• High acceptance rate on Easy problems</li>
                        <li>• Consistent weekly activity</li>
                        <li>• Good progress in Arrays & Strings</li>
                    </ul>
                </div>
                
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-amber-600" />
                        <span className="font-semibold text-amber-800">Areas to Improve</span>
                    </div>
                    <ul className="text-sm text-amber-700 space-y-1">
                        <li>• Struggling with Medium problems</li>
                        <li>• Need more Dynamic Programming practice</li>
                        <li>• Inconsistent submission patterns</li>
                    </ul>
                </div>
            </div>

            <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                <Shield className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-lg">Get Detailed Performance Report</span>
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

/* --- Enhanced Stat Card --- */
const StatCard = ({ icon: Icon, title, value, change, color, delay }) => {
    const colorClasses = {
        green: { bg: 'from-green-500 to-emerald-600', text: 'text-green-600', bgLight: 'bg-green-100' },
        blue: { bg: 'from-blue-500 to-cyan-600', text: 'text-blue-600', bgLight: 'bg-blue-100' },
        yellow: { bg: 'from-yellow-500 to-amber-600', text: 'text-yellow-600', bgLight: 'bg-yellow-100' },
        purple: { bg: 'from-purple-500 to-indigo-600', text: 'text-purple-600', bgLight: 'bg-purple-100' },
    };

    const colors = colorClasses[color] || colorClasses.blue;

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

export default LeetCode;