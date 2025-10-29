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
    BarChart3, 
    UserX,
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
import { getRandomHexColor } from '../utils/helper.js';
import AnalysisContainer from '../components/AnalysisContainer.jsx';
import StatCard from '../components/StatCard.jsx';
import BadgeCollection from '../components/BadgeCollection.jsx';
import VideoSuggestion from '../components/VideoSuggestion.jsx';
import ScoreMeter from '../components/ScoreMeter.jsx';
import TopicStats from '../components/TopicStats.jsx';
import ProblemStats from '../components/ProblemStats.jsx';
import { getMemeForScore } from '../utils/helper.js';
import MemeContainer from '../components/MemeContainer.jsx';

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
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Score Circle - Left Side (1 part) */}
                            <div className="lg:col-span-1">
                                <ScoreMeter score={data.score}/>
                            </div>

                            {/* Meme and Review - Right Side (2 parts) */}
                            <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '200ms'}}>
                                <div className="flex items-center gap-3 mb-2">
                                    <MessageSquareQuote className="h-7 w-7 text-purple-600" />
                                    <h3 className="text-2xl font-black text-gray-800">AI Performance Review</h3>
                                </div>

                                <MemeContainer score={data.score}/>
                            </div>

                            {/* Analysis - Full width below */}
                            <div className="lg:col-span-3">
                                <AnalysisContainer profileAnalysis={data.profileAnalysis}/>
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

                        <BadgeCollection 
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
                            <ProblemStats problemsData={getLeetcodeDifficultyData(data.problemsCount.acSubmissionNum)}/>
                        </div>

                        {/* Additional Insights */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Topic Mastery */}
                            <TopicStats topicData={getLeetcodeTopicData(data.topicWiseProblems)}/>

                            {/* AI Recommended Video */}
                            <VideoSuggestion suggestedVideo={data.profileAnalysis.video}/>
                        </div>
                    </div>
                )}

                {isError && (
                    <ErrorBlock 
                        error={error}
                        onRetry={handleAnalyze}
                        isLoading={isFetching}
                    />
                )}
            </main>
        </div>
    );
};

export default LeetCode;