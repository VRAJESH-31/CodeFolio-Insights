// src/pages/GFG.jsx
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
    Code,
    Calendar,
    TrendingUp,
    Crown,
    Sparkles,
    Rocket,
    Brain,
    Lightbulb,
    Shield,
    Star,
    Users,
    Clock,
    BookOpen
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

const GFG = ({
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    activeMenu,
    setActiveMenu,
    user,
    handleLogout
}) => {
    const [username, setUsername] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
            setMounted(true);
        }, []);

    const submissionData = [
        { name: 'Jan', solved: 8, streak: 5 },
        { name: 'Feb', solved: 12, streak: 8 },
        { name: 'Mar', solved: 15, streak: 12 },
        { name: 'Apr', solved: 10, streak: 6 },
        { name: 'May', solved: 18, streak: 15 },
        { name: 'Jun', solved: 22, streak: 18 },
        { name: 'Jul', solved: 25, streak: 20 },
        { name: 'Aug', solved: 30, streak: 25 },
        { name: 'Sep', solved: 28, streak: 22 },
    ];

    const difficultyData = [
        { name: 'Basic', value: 45, color: '#10B981' },
        { name: 'Easy', value: 30, color: '#3B82F6' },
        { name: 'Medium', value: 18, color: '#F59E0B' },
        { name: 'Hard', value: 7, color: '#EF4444' },
    ];

    const topicData = [
        { name: 'Arrays', value: 25, mastery: 80 },
        { name: 'Strings', value: 20, mastery: 75 },
        { name: 'Linked List', value: 15, mastery: 65 },
        { name: 'Trees', value: 18, mastery: 70 },
        { name: 'DP', value: 12, mastery: 50 },
        { name: 'Graphs', value: 10, mastery: 45 },
    ];

    const handleAnalyze = () => {
        if (!username.trim()) return;
        
        setIsLoading(true);
        setTimeout(() => {
            setAnalysis({
                totalSolved: 145,
                totalProblems: 320,
                codingScore: 1850,
                currentStreak: 25,
                longestStreak: 30,
                instituteRank: 45,
                overallRank: '5,234',
                profileScore: 76,
                monthlyCoding: 'Top 15%',
                accuracy: '82.5%',
                coursesCompleted: 8,
                articlesPublished: 12
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
            0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.2); }
            50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.4); }
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
        <div className="flex min-h-screen bg-gradient-to-br from-green-50/30 via-white to-emerald-50/30 font-sans">
            <style>{animationStyles}</style>
            
            {/* Sidebar */}
            <Sidebar
                isSidebarCollapsed={isSidebarCollapsed}
                setIsSidebarCollapsed={setIsSidebarCollapsed}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}    
                user={user}
                handleLogout={handleLogout}
            />

            {/* Main Content */}
            <main className={`flex-1 overflow-y-auto transition-all duration-500 `}>
                <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
                    {/* Header Section */}
                    <div className="text-center space-y-4 animate-float-in">
                        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight">
                            GeeksForGeeks Analytics
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Master your DSA journey with comprehensive analytics and personalized insights
                        </p>
                    </div>

                    {/* Input Section */}
                    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '100ms'}}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                                <Code className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black text-gray-800">Analyze Your Profile</h3>
                                <p className="text-gray-500 text-sm mt-1">Enter your GeeksForGeeks username to get started</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your GeeksForGeeks username..."
                                    className="w-full p-4 pl-12 text-lg border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-green-300"
                                />
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>
                            <button
                                onClick={handleAnalyze}
                                disabled={isLoading}
                                className={`flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed ${
                                    isLoading ? 'cursor-wait' : 'hover:from-green-600 hover:to-emerald-700'
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
                                            <h3 className="text-2xl font-black text-gray-800">GFG Score</h3>
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
                                                        stroke="url(#gfgScoreGradient)"
                                                        strokeWidth="8"
                                                        strokeLinecap="round"
                                                        strokeDasharray="283"
                                                        strokeDashoffset={283 - (283 * analysis.profileScore) / 100}
                                                        className="animate-score-progress"
                                                    />
                                                    <defs>
                                                        <linearGradient id="gfgScoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                            <stop offset="0%" stopColor="#10b981" />
                                                            <stop offset="100%" stopColor="#059669" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
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
                                                <span className="text-gray-600">Progress to next level</span>
                                                <span className="font-semibold text-green-600">76%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-1000 animate-shimmer"
                                                    style={{ width: '76%' }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Meme and Review - Right Side */}
                                <div className="xl:col-span-2 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '200ms'}}>
                                    <GFGScoreReview score={analysis.profileScore} />
                                </div>
                            </div>

                            {/* Enhanced Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { icon: CheckCircle, title: "Problems Solved", value: analysis.totalSolved, change: "+15", color: "green" },
                                    { icon: Target, title: "Coding Score", value: analysis.codingScore, change: "+120", color: "blue" },
                                    { icon: Zap, title: "Current Streak", value: analysis.currentStreak, change: "🔥", color: "yellow" },
                                    { icon: Award, title: "Institute Rank", value: `#${analysis.instituteRank}`, change: "+3", color: "purple" },
                                ].map((stat, index) => (
                                    <GFGStatCard key={stat.title} {...stat} delay={index * 100} />
                                ))}
                            </div>

                            {/* Additional Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { icon: Trophy, title: "Overall Rank", value: analysis.overallRank, change: "-245", color: "orange" },
                                    { icon: Star, title: "Accuracy", value: analysis.accuracy, change: "+2.3%", color: "cyan" },
                                    { icon: BookOpen, title: "Courses Completed", value: analysis.coursesCompleted, change: "+2", color: "indigo" },
                                    { icon: Users, title: "Articles Published", value: analysis.articlesPublished, change: "+3", color: "pink" },
                                ].map((stat, index) => (
                                    <GFGStatCard key={stat.title} {...stat} delay={(index + 4) * 100} />
                                ))}
                            </div>

                            {/* Charts Grid */}
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                                {/* Submission Activity */}
                                <div className="xl:col-span-2 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '300ms'}}>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                                            <BarChart2 className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-800">Monthly Progress</h3>
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
                                                    stroke="#10b981" 
                                                    strokeWidth={3} 
                                                    dot={{ fill: '#10b981', r: 4 }} 
                                                    activeDot={{ r: 6, fill: '#059669' }}
                                                />
                                                <Line 
                                                    type="monotone" 
                                                    dataKey="streak" 
                                                    stroke="#3b82f6" 
                                                    strokeWidth={2} 
                                                    strokeDasharray="3 3"
                                                    dot={{ fill: '#3b82f6', r: 3 }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Problem Difficulty */}
                                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '400ms'}}>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
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
                                    <div className="grid grid-cols-2 gap-4 mt-6">
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

                            {/* Topic Mastery */}
                            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '500ms'}}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl">
                                        <Brain className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-800">Topic Mastery</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {topicData.map((topic, index) => (
                                        <div key={topic.name} className="space-y-3 p-4 bg-gray-50/50 rounded-2xl border border-gray-200">
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-gray-800">{topic.name}</span>
                                                <span className="text-sm font-bold text-green-600">{topic.mastery}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className="h-2 rounded-full transition-all duration-1000 bg-gradient-to-r from-green-400 to-emerald-500"
                                                    style={{ width: `${topic.mastery}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500">
                                                <span>{topic.value} problems</span>
                                                <span>Mastered</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Additional Insights */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Course Progress */}
                                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '600ms'}}>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl">
                                            <BookOpen className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-800">Course Progress</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { name: 'DSA Self-Paced', progress: 85, color: 'from-green-500 to-emerald-600' },
                                            { name: 'Competitive Programming', progress: 60, color: 'from-blue-500 to-cyan-600' },
                                            { name: 'Interview Preparation', progress: 45, color: 'from-purple-500 to-pink-600' },
                                            { name: 'Machine Learning', progress: 30, color: 'from-orange-500 to-red-600' },
                                        ].map((course, index) => (
                                            <div key={course.name} className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium text-gray-700">{course.name}</span>
                                                    <span className="text-sm font-bold text-green-600">{course.progress}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className={`h-2 rounded-full bg-gradient-to-r ${course.color} transition-all duration-1000`}
                                                        style={{ width: `${course.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* AI Recommended Content */}
                                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '700ms'}}>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                                            <Lightbulb className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-800">AI Recommendations</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                                            <h4 className="font-bold text-gray-800 mb-2">Focus on Dynamic Programming</h4>
                                            <p className="text-sm text-gray-600 mb-3">
                                                Based on your progress, we recommend practicing more DP problems to improve your problem-solving skills.
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    <span>30 min daily</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Target className="w-3 h-3" />
                                                    <span>15 problems/week</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                                            <h4 className="font-bold text-gray-800 mb-2">Complete DSA Course</h4>
                                            <p className="text-sm text-gray-600">
                                                You're 85% through the DSA Self-Paced course. Finish it to strengthen your fundamentals.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

/* --- Enhanced GFG Score & Meme Review --- */
const GFGScoreReview = ({ score }) => {
    const getMemeForScore = (score) => {
        if (score <= 10) return { 
            text: "Newbie alert! Time to start grinding! 💻", 
            meme: "https://media1.tenor.com/m/5cIs6QvX3uMAAAAC/gajab-bezzati-salman-khan.gif",
            comment: "Everyone starts somewhere! Begin with basic problems.",
            bg: "from-red-50 to-orange-50",
            border: "border-red-200"
        };
        if (score <= 30) return { 
            text: "Getting the hang of it! Keep pushing! 🚀", 
            meme: "https://media1.tenor.com/m/6gB-_c6lVqoAAAAC/baburao-style-hai.gif",
            comment: "Solid foundation. Focus on consistency.",
            bg: "from-orange-50 to-yellow-50",
            border: "border-orange-200"
        };
        if (score <= 60) return { 
            text: "Solid progress! You're on the right track! 🌟", 
            meme: "https://media1.tenor.com/m/6vEVb2uGj8kAAAAC/50-ruppee-kat-rajkumar-hirani.gif",
            comment: "Good momentum. Time to tackle harder problems.",
            bg: "from-yellow-50 to-lime-50",
            border: "border-yellow-200"
        };
        if (score <= 80) return { 
            text: "GFG Warrior! Almost at expert level! ⚔️", 
            meme: "https://media1.tenor.com/m/9rWnSoV8cU0AAAAC/ab-sale.gif",
            comment: "Impressive consistency and problem-solving skills.",
            bg: "from-green-50 to-emerald-50",
            border: "border-green-200"
        };
        if (score <= 100) return { 
            text: "DSA GOD! Companies are waiting for you! 🏆", 
            meme: "https://media1.tenor.com/m/4zRz1b9W1bAAAAAC/maula-mere-maula.gif",
            comment: "Outstanding performance! Ready for top tech interviews.",
            bg: "from-emerald-50 to-teal-50",
            border: "border-emerald-200"
        };
        return { text: "", meme: "", comment: "", bg: "", border: "" };
    };

    const review = getMemeForScore(score);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
                <Sparkles className="h-7 w-7 text-green-600" />
                <h3 className="text-2xl font-black text-gray-800">AI GFG Review</h3>
            </div>
            
            <div className={`rounded-3xl p-6 border-2 ${review.border} bg-gradient-to-br ${review.bg} shadow-lg animate-bounce-in`}>
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm border">
                        <Code className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-semibold text-gray-700">GFG Performance Review</span>
                    </div>
                    
                    <div className="rounded-2xl overflow-hidden shadow-lg mx-auto max-w-md">
                        <img 
                            src={review.meme} 
                            alt="GFG performance meme" 
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
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-800">GFG Strengths</span>
                    </div>
                    <ul className="text-sm text-green-700 space-y-1">
                        <li>• Strong performance in Arrays & Strings</li>
                        <li>• Consistent daily practice</li>
                        <li>• Good course completion rate</li>
                    </ul>
                </div>
                
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-amber-600" />
                        <span className="font-semibold text-amber-800">Areas to Improve</span>
                    </div>
                    <ul className="text-sm text-amber-700 space-y-1">
                        <li>• Need more Dynamic Programming practice</li>
                        <li>• Focus on graph algorithms</li>
                        <li>• Improve problem-solving speed</li>
                    </ul>
                </div>
            </div>

            <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                <Shield className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-lg">Get Detailed GFG Report</span>
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

/* --- Enhanced GFG Stat Card --- */
const GFGStatCard = ({ icon: Icon, title, value, change, color, delay }) => {
    const colorClasses = {
        green: { bg: 'from-green-500 to-emerald-600', text: 'text-green-600', bgLight: 'bg-green-100' },
        blue: { bg: 'from-blue-500 to-cyan-600', text: 'text-blue-600', bgLight: 'bg-blue-100' },
        yellow: { bg: 'from-yellow-500 to-amber-600', text: 'text-yellow-600', bgLight: 'bg-yellow-100' },
        purple: { bg: 'from-purple-500 to-indigo-600', text: 'text-purple-600', bgLight: 'bg-purple-100' },
        orange: { bg: 'from-orange-500 to-red-600', text: 'text-orange-600', bgLight: 'bg-orange-100' },
        cyan: { bg: 'from-cyan-500 to-blue-600', text: 'text-cyan-600', bgLight: 'bg-cyan-100' },
        indigo: { bg: 'from-indigo-500 to-purple-600', text: 'text-indigo-600', bgLight: 'bg-indigo-100' },
        pink: { bg: 'from-pink-500 to-rose-600', text: 'text-pink-600', bgLight: 'bg-pink-100' },
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

export default GFG;