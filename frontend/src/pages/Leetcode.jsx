// src/pages/LeetCode.jsx
import React, { useState} from 'react';
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
    Shield,
    Medal,
    CloudDownload,
    AlertTriangle,
    RefreshCw,
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
import { useLeetcodeAnalysis } from '../hooks/useAnalyzer.js';
import { getMemeForScore, getRandomHexColor } from '../utils/helper.js';
import {v4 as uuid} from "uuid";

const LeetCode = () => {
    const [userId, setUserId] = useState('');

    const getLeetcodeSubmissionData = (submissionData) => {
        return Object.entries(submissionData).sort((x,y)=>x[0]-y[0]).map((dailyData)=>{
            const date = ((new Date(dailyData[0]*1000).toString()).split(" ").slice(1,4)).join(" ");
            const submissions = dailyData[1];

            return {
                name: date,
                submissions: submissions,
            }
        })
    }

    const getLeetcodeDifficultyData = (difficultyData) => {
        return [
            {name: 'Easy', value: difficultyData[1].count, color: '#34D399'},
            {name: 'Medium', value: difficultyData[2].count, color: '#F59E0B'},
            {name: 'Hard', value: difficultyData[3].count, color: '#EF4444'}
        ]
    }

    const getLeetcodeTopicData = (topicData) => {
        const responseTopicData = [];
        const topicDataArray = Object.entries(topicData).map((topicLevelData)=>topicLevelData[1]);
        for (let i=0; i<topicDataArray.length; i++){
            for (let j=0; j<topicDataArray[i].length; j++){
                responseTopicData.push({
                    name: topicDataArray[i][j].tagName,
                    value: topicDataArray[i][j].problemsSolved, 
                    mastery: Math.min(100, topicDataArray[i][j].problemsSolved*2),
                    color: getRandomHexColor(),
                })
            }
        }
        return responseTopicData.sort((x,y)=>Math.random()-0.5).filter((_, index)=>index<10);
    }

    const { data, isLoading, isError, error, refetch, isFetching } = useLeetcodeAnalysis(userId.trim());

    const handleAnalyze = () => {
        if (!userId.trim()) return;
        refetch();
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
                            disabled={isFetching}
                            className={`flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-black px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed ${
                                isLoading ? 'cursor-wait' : 'hover:from-blue-600 hover:to-purple-700'
                            }`}
                        >
                            {isFetching ? (
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
                {data && !isError && (
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
                                                    strokeDashoffset={283 - (283 * data.score) / 100}
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
                                                    {(data.score).toFixed(1)}
                                                </span>
                                                <span className="text-lg text-gray-500 font-semibold">/100</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Meme and Review - Right Side */}
                            <div className="xl:col-span-2 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '200ms'}}>
                                <ProfileScoreReview score={data?.score} profileAnalysis={data?.profileAnalysis} />
                            </div>
                        </div>

                        {/* Enhanced Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: CheckCircle, title: "Total Solved", value: data.problemsCount.acSubmissionNum[0].count,  color: "green" },
                                { icon: Target, title: "Acceptance Rate", value: (data.acceptanceRate*100).toFixed(2), color: "blue" },
                                { icon: Zap, title: "Current Streak", value: data.submissionCalendar.streak, color: "yellow" },
                                { icon: Award, title: "Contest Rating", value: Math.round(data.contestData.rating), color: "purple" },
                            ].map((stat, index) => (
                                <StatCard key={stat.title} {...stat} delay={index * 100} />
                            ))}
                        </div>

                        <HorizontalBadgesDisplay 
                            badges={data.badges.badges} 
                            contestData={data.contestData} 
                        />

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
                                        <LineChart data={getLeetcodeSubmissionData(JSON.parse(data?.submissionCalendar?.submissionCalendar))} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
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
                                                dataKey="submissions" 
                                                stroke="#3b82f6" 
                                                strokeWidth={2} 
                                                // strokeDasharray="3 3"
                                                dot={{ fill: '#0000ff', r: 3 }}
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
                                                data={getLeetcodeDifficultyData(data.problemsCount.acSubmissionNum)}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={100}
                                                paddingAngle={2}
                                                dataKey="value"
                                            >
                                                {getLeetcodeDifficultyData(data.problemsCount.acSubmissionNum).map((entry, index) => (
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
                                    {getLeetcodeDifficultyData(data.problemsCount.acSubmissionNum).map((item, index) => (
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
                                    {getLeetcodeTopicData(data.topicWiseProblems).map((topic, index) => (
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
                                                        backgroundColor: `${topic.color}`
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
                                            src={data.profileAnalysis.video.link}
                                            title="Dynamic Programming Tutorial"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                    <h4 className="text-xl font-black text-gray-800">{data.profileAnalysis.video.title}</h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        {data.profileAnalysis.video.description}
                                    </p>
                                    <div className="flex items-center gap-4 pt-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Clock className="w-4 h-4" />
                                            <span>{data.profileAnalysis.video.time/60}min watch</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Users className="w-4 h-4" />
                                            <span>{data.profileAnalysis.video.views} views</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {isError && (
                    <LeetCodeError 
                        error={error}
                        onRetry={handleAnalyze}
                        isLoading={isFetching}
                    />
                )}
            </main>
        </div>
    );
};

const LeetCodeError = ({ error, onRetry, isLoading }) => {
    // Determine error type and message
    const getErrorDetails = () => {
        if (!error) {
            return {
                icon: <Server className="w-16 h-16" />,
                title: "Analysis Failed",
                message: "We couldn't generate your LeetCode analysis. Please try again.",
                subMessage: "This might be due to temporary server issues or invalid data."
            };
        }

        if (error.message?.includes('Network Error') || error.message?.includes('Failed to fetch')) {
            return {
                icon: <WifiOff className="w-16 h-16" />,
                title: "Connection Error",
                message: "Unable to connect to LeetCode services",
                subMessage: "Please check your internet connection and try again."
            };
        }

        if (error.message?.includes('User not found') || error.status === 404) {
            return {
                icon: <UserX className="w-16 h-16" />,
                title: "User Not Found",
                message: "We couldn't find this LeetCode username",
                subMessage: "Please check the username and try again."
            };
        }

        if (error.status === 429) {
            return {
                icon: <AlertTriangle className="w-16 h-16" />,
                title: "Rate Limit Exceeded",
                message: "Too many requests to LeetCode API",
                subMessage: "Please wait a few minutes before trying again."
            };
        }

        return {
            icon: <AlertTriangle className="w-16 h-16" />,
            title: "Analysis Failed",
            message: "We encountered an error while analyzing your profile",
            subMessage: "This might be due to LeetCode API limitations or server issues."
        };
    };

    const errorDetails = getErrorDetails();

    return (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 max-w-md w-full text-center animate-float-in">
                {/* Error Icon */}
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl border border-red-200">
                        <div className="text-red-500">
                            {errorDetails.icon}
                        </div>
                    </div>
                </div>

                {/* Error Title */}
                <h3 className="text-2xl font-black text-gray-800 mb-3">
                    {errorDetails.title}
                </h3>

                {/* Error Message */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                    {errorDetails.message}
                </p>

                {/* Sub Message */}
                <p className="text-sm text-gray-500 mb-8">
                    {errorDetails.subMessage}
                </p>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <button
                        onClick={onRetry}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <RefreshCw className="w-5 h-5 animate-spin" />
                                <span>Retrying...</span>
                            </>
                        ) : (
                            <>
                                <RefreshCw className="w-5 h-5" />
                                <span>Try Again</span>
                            </>
                        )}
                    </button>

                    {/* Additional Help */}
                    <div className="text-xs text-gray-400 space-y-1">
                        <p>Make sure the LeetCode username is correct</p>
                        <p>Ensure the user has a public profile</p>
                        <p>Try again in a few minutes if issues persist</p>
                    </div>
                </div>

                {/* Debug Info (only in development) */}
                {process.env.NODE_ENV === 'development' && error && (
                    <details className="mt-6 text-left">
                        <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                            Debug Information
                        </summary>
                        <pre className="mt-2 p-3 bg-gray-100 rounded-lg text-xs text-gray-600 overflow-auto max-h-32">
                            {JSON.stringify(error, null, 2)}
                        </pre>
                    </details>
                )}
            </div>
        </div>
    );
};

/* --- Enhanced Profile Score & Meme Review --- */
const ProfileScoreReview = ({ score, profileAnalysis }) => {

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
                        {
                            profileAnalysis?.strongPoints?.map((point)=>(
                                <li key={uuid()}>• {point}</li>
                            ))
                        }
                    </ul>
                </div>
                
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-amber-600" />
                        <span className="font-semibold text-amber-800">Areas to Improve</span>
                    </div>
                    <ul className="text-sm text-amber-700 space-y-1">
                        {
                            profileAnalysis?.improvementAreas?.map((point)=>(
                                <li>• {point}</li>
                            ))
                        }
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
const StatCard = ({ icon: Icon, title, value, color, delay }) => {
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

const HorizontalBadgesDisplay = ({ badges, contestData }) => {
    const scrollStyle = `
        @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-scroll {
            animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
            animation-play-state: paused;
        }
        .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    `;

    return (
        <div className="space-y-8">
            <style>{scrollStyle}</style>
            {/* Contest Rating Section */}
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
                        <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800">Contest Performance</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200">
                        <div className="text-3xl font-black text-purple-600 mb-2">
                            {Math.round(contestData.rating)}
                        </div>
                        <div className="text-sm font-semibold text-purple-800">Current Rating</div>
                        <div className="text-xs text-purple-600 mt-1">Competitive Programmer</div>
                    </div>
                    
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                        <div className="text-3xl font-black text-blue-600 mb-2">
                            {contestData.globalRanking?.toLocaleString()}
                        </div>
                        <div className="text-sm font-semibold text-blue-800">Global Rank</div>
                        <div className="text-xs text-blue-600 mt-1">Top {contestData.topPercentage}%</div>
                    </div>
                    
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                        <div className="text-3xl font-black text-green-600 mb-2">
                            {contestData.attendedContestsCount}
                        </div>
                        <div className="text-sm font-semibold text-green-800">Contests Attended</div>
                        <div className="text-xs text-green-600 mt-1">Total Participation</div>
                    </div>
                    
                    <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-200">
                        <div className="text-3xl font-black text-orange-600 mb-2">
                            {contestData.topPercentage}%
                        </div>
                        <div className="text-sm font-semibold text-orange-800">Top Percentage</div>
                        <div className="text-xs text-orange-600 mt-1">Among All Participants</div>
                    </div>
                </div>
            </div>

            {/* Horizontal Badges Slider */}
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '100ms'}}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl">
                        <Medal className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800">Achievements & Badges</h3>
                </div>
                
                {badges.length > 0 ? (
                    <div className="relative">
                        <div className="overflow-hidden">
                            <div className="flex gap-6 animate-scroll hover:pause">
                                {/* Double the badges for seamless looping */}
                                {[...badges, ...badges].map((badge, index) => (
                                    <HorizontalBadgeCard key={`${badge.id}-${index}`} badge={badge} index={index} />
                                ))}
                            </div>
                        </div>
                        
                        {/* Gradient overlays for smooth edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white/90 to-transparent pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white/90 to-transparent pointer-events-none"></div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Medal className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-gray-500">No badges earned yet</h4>
                        <p className="text-gray-400 mt-2">Keep solving problems to earn achievements!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

/* --- Individual Horizontal Badge Card --- */
const HorizontalBadgeCard = ({ badge, index }) => {
    const getBadgeColor = (badgeName) => {
        if (badgeName.includes('365')) return 'from-purple-500 to-pink-600';
        if (badgeName.includes('200')) return 'from-red-500 to-orange-600';
        if (badgeName.includes('100')) return 'from-blue-500 to-cyan-600';
        if (badgeName.includes('50')) return 'from-green-500 to-emerald-600';
        return 'from-gray-500 to-gray-600';
    };

    return (
        <div className="flex-shrink-0 w-48 bg-gradient-to-br from-white to-gray-50 p-4 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-center space-y-3">
                {/* Original LeetCode Badge Icon */}
                <div className="flex justify-center">
                    <img 
                        src={badge.icon} 
                        alt={badge.displayName}
                        className="w-12 h-12 object-contain rounded-lg"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                    <div 
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getBadgeColor(badge.displayName)} flex items-center justify-center hidden`}
                    >
                        <Medal className="w-6 h-6 text-white" />
                    </div>
                </div>
                
                <div className="space-y-1">
                    <h4 className="font-bold text-gray-800 text-sm leading-tight line-clamp-2">
                        {badge.displayName}
                    </h4>
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(badge.creationDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    </div>
                </div>
                
                {!badge.expired && (
                    <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                        <Shield className="w-2 h-2" />
                        Active
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeetCode;