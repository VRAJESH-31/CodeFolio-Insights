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
import ErrorContainer from '../components/ErrorContainer.jsx';
import MemeContainer from '../components/MemeContainer.jsx';
import LeetCodeContestStats from '../components/LeetcodeContestStats.jsx';

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
            0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.2), 0 0 40px rgba(139, 92, 246, 0.1); }
            50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(139, 92, 246, 0.2); }
        }
        @keyframes borderGlow {
            0%, 100% { border-color: rgba(59, 130, 246, 0.3); }
            50% { border-color: rgba(139, 92, 246, 0.5); }
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
        .animate-border-glow { animation: borderGlow 2s ease-in-out infinite; }
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
                    <div className="relative inline-block">
                        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight relative z-10">
                            LeetCode Analytics
                        </h1>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 blur-xl opacity-20 -z-10"></div>
                    </div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
                        Master your coding journey with AI-powered insights and personalized recommendations
                    </p>
                </div>

                {/* Input Section */}
                <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl animate-float-in animate-border-glow border-2 border-blue-300/30" style={{animationDelay: '100ms'}}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg animate-glow-pulse">
                            <Rocket className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-black text-gray-800 mb-1">Analyze Your Profile</h3>
                            <p className="text-gray-500 text-base font-medium">Enter your LeetCode username to get started</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4 items-stretch">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                placeholder="Enter your LeetCode UserID..."
                                className="w-full p-4 pl-12 text-lg border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-blue-300 font-medium"
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                        <button
                            onClick={handleAnalyze}
                            disabled={isFetching}
                            className={`flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed min-w-[160px] animate-glow-pulse ${
                                isLoading ? 'cursor-wait' : 'hover:from-blue-600 hover:to-purple-700'
                            }`}
                        >
                            {isFetching ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span className="text-lg font-semibold">Analyzing...</span>
                                </>
                            ) : (
                                <>
                                    <Brain className="w-5 h-5" />
                                    <span className="text-lg font-semibold">Deep Analysis</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Results Section */}
                {data && !isError && (
                    <div className="space-y-8">
                        {/* Score and Meme Section - Top Position */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                            {/* Score Circle - Left Side */}
                            <div className="lg:col-span-1">
                                <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-2xl border-2 border-blue-300/30 animate-float-in animate-border-glow h-full">
                                    <ScoreMeter score={data.score}/>
                                </div>
                            </div>

                            {/* Meme and Review - Right Side */}
                            <div className="lg:col-span-2 relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border-2 border-purple-300/30 animate-float-in animate-border-glow" style={{animationDelay: '200ms'}}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl animate-glow-pulse">
                                        <MessageSquareQuote className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-800">AI Performance Review</h3>
                                </div>
                                <MemeContainer score={data.score}/>
                            </div>

                            {/* Analysis - Full width below */}
                            <div className="lg:col-span-3 relative animate-float-in" style={{animationDelay: '300ms'}}>
                                <div className="animate-border-glow border-2 border-indigo-300/30 rounded-3xl">
                                    <AnalysisContainer profileAnalysis={data.profileAnalysis}/>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: CheckCircle, title: "Total Solved", value: data.problemsCount.acSubmissionNum[0].count, color: "green" },
                                { icon: Target, title: "Acceptance Rate", value: (data.acceptanceRate*100).toFixed(2), color: "blue" },
                                { icon: Zap, title: "Current Streak", value: data.submissionCalendar.streak, color: "yellow" },
                                { icon: Award, title: "Contest Rating", value: Math.round(data?.contestData?.rating ?? 0), color: "purple" },
                            ].map((stat, index) => (
                                <div key={stat.title} className="animate-float-in" style={{animationDelay: `${400 + index * 100}ms`}}>
                                    <div className="animate-border-glow border-2 border-blue-300/20 rounded-2xl">
                                        <StatCard {...stat} delay={index * 100} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contest Stats and Badges */}
                        <div className="space-y-8">
                            <div className="relative animate-float-in" style={{animationDelay: '800ms'}}>
                                <div className="animate-border-glow border-2 border-orange-300/30 rounded-3xl">
                                    <LeetCodeContestStats contestData={data.contestData} />
                                </div>
                            </div>
                            <div className="relative animate-float-in" style={{animationDelay: '900ms'}}>
                                <div className="animate-border-glow border-2 border-green-300/30 rounded-3xl">
                                    <BadgeCollection badges={data.badges.badges} />
                                </div>
                            </div>
                        </div>

                        {/* Charts Grid */}
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                            {/* Submission Activity */}
                            <div className="xl:col-span-2 relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border-2 border-blue-300/30 animate-float-in animate-border-glow" style={{animationDelay: '1000ms'}}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl animate-glow-pulse">
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
                                                    borderRadius: '12px',
                                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                                                }}
                                            />
                                            <Legend />
                                            <Line 
                                                type="monotone" 
                                                dataKey="submissions" 
                                                stroke="#3b82f6" 
                                                strokeWidth={2} 
                                                dot={{ fill: '#3b82f6', r: 3 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Problem Difficulty */}
                            <div className="relative animate-float-in" style={{animationDelay: '1100ms'}}>
                                <div className="animate-border-glow border-2 border-amber-300/30 rounded-3xl h-full">
                                    <ProblemStats problemsData={getLeetcodeDifficultyData(data.problemsCount.acSubmissionNum)}/>
                                </div>
                            </div>
                        </div>

                        {/* Additional Insights */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Topic Mastery */}
                            <div className="relative animate-float-in" style={{animationDelay: '1200ms'}}>
                                <div className="animate-border-glow border-2 border-emerald-300/30 rounded-3xl h-full">
                                    <TopicStats topicData={getLeetcodeTopicData(data.topicWiseProblems)}/>
                                </div>
                            </div>

                            {/* AI Recommended Video */}
                            <div className="relative animate-float-in" style={{animationDelay: '1300ms'}}>
                                <div className="animate-border-glow border-2 border-red-300/30 rounded-3xl h-full">
                                    <VideoSuggestion suggestedVideo={data.profileAnalysis.video}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {isError && (
                    <div className="relative animate-float-in">
                        <div className="animate-border-glow border-2 border-red-300/30 rounded-3xl">
                            <ErrorContainer
                                error={error}
                                onRetry={handleAnalyze}
                                isLoading={isFetching}
                                errorAdditionalHelp={["Make sure the LeetCode username is correct","Ensure the user has a public profile", "Try again in a few minutes if issues persist"]}
                            />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default LeetCode;