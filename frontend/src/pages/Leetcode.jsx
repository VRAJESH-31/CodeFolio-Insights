import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import useAuthStore from '../../store/useAuthStore.js';
import conf from '../config/config.js';

const LeetCode = () => {
    const [userId, setUserId] = useState('');
    const user = useAuthStore((state) => state.user);

    const getLeetcodeSubmissionData = (submissionData) => {
        return Object.entries(submissionData).sort((x, y) => new Date(x[0]) - new Date(y[0])).map((dailyData) => {
            const date = dailyData[0];
            const submissions = dailyData[1];

            return {
                name: date,
                submissions: submissions,
            }
        })
    }

    const getLeetcodeDifficultyData = (difficultyData) => {
        return [
            { name: 'Easy', value: difficultyData[1].count, color: '#34D399' },
            { name: 'Medium', value: difficultyData[2].count, color: '#F59E0B' },
            { name: 'Hard', value: difficultyData[3].count, color: '#EF4444' }
        ]
    }

    const getLeetcodeTopicData = (topicData) => {
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
        return responseTopicData.sort((x, y) => Math.random() - 0.5).filter((_, index) => index < 10);
    }

    const getLeetcodeURL = async () => {
        try {
            const response = await axios.get(`${conf.SERVER_BASE_URL}/profiles/${user._id}`);
            const data = response.data;
            setUserId(data.leetCodeUsername);
        } catch (error) {
            console.log(error.response.data.message);
            console.error(error);
        }
    }

    useEffect(() => {
        getLeetcodeURL();
    }, [])

    const { data, isLoading, isError, error, refetch, isFetching } = useLeetcodeAnalysis(userId.trim());
    console.log(data)

    const handleAnalyze = () => {
        if (!userId.trim()) return;
        refetch();
    };

    const animationStyles = `    
        @keyframes floatIn {
            0% { opacity: 0; transform: translateY(30px) scale(0.9); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes scoreProgress {
            0% { stroke-dashoffset: 283; }
        }
        @keyframes bounceIn {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); opacity: 1; }
        }
        .animate-float-in { animation: floatIn 0.6s ease-out forwards; }
        .animate-score-progress { animation: scoreProgress 2s ease-out forwards; }
        .animate-bounce-in { animation: bounceIn 1s ease-out forwards; }
    `;

    return (
        <>
            <style>{animationStyles}</style>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-3 md:space-y-4 animate-float-in">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight px-2">
                        LeetCode Analytics
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium px-4">
                        Master your coding journey with AI-powered insights and personalized recommendations
                    </p>
                </div>

                {/* Input Section */}
                <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/80 animate-float-in hover:shadow-2xl transition-all duration-300" style={{ animationDelay: '100ms' }}>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl shadow-lg w-fit">
                            <Rocket className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-800 mb-1">Analyze Your Profile</h3>
                            <p className="text-sm sm:text-base text-gray-500 font-medium">Enter your LeetCode username to get started</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                placeholder="Enter your LeetCode UserID..."
                                className="w-full p-3 sm:p-4 pl-10 sm:pl-12 text-base sm:text-lg border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-blue-300 font-medium"
                            />
                            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <button
                            onClick={handleAnalyze}
                            disabled={isFetching}
                            className={`flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed min-w-[120px] sm:min-w-[160px] ${isLoading ? 'cursor-wait' : 'hover:from-blue-600 hover:to-purple-700'
                                }`}
                        >
                            {isFetching ? (
                                <>
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span className="text-sm sm:text-base font-semibold">Analyzing...</span>
                                </>
                            ) : (
                                <>
                                    <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="text-sm sm:text-base font-semibold">Deep Analysis</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Results Section */}
                {data && !isError && (
                    <div className="space-y-6 md:space-y-8">
                        {/* Score and Meme Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-stretch">
                            {/* Score Circle */}
                            <div className="lg:col-span-1">
                                <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/80 animate-float-in h-full">
                                    <ScoreMeter score={data.score} />
                                </div>
                            </div>

                            {/* Meme and Review */}
                            <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/80 animate-float-in" style={{ animationDelay: '200ms' }}>
                                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
                                        <MessageSquareQuote className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-black text-gray-800">AI Performance Review</h3>
                                </div>
                                <MemeContainer score={data.score} />
                            </div>

                            {/* Analysis */}
                            <div className="lg:col-span-3 animate-float-in" style={{ animationDelay: '300ms' }}>
                                <AnalysisContainer profileAnalysis={data.profileAnalysis} />
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                            {[
                                { icon: CheckCircle, title: "Total Solved", value: data.problemsCount.acSubmissionNum[0].count, color: "green" },
                                { icon: Target, title: "Acceptance Rate", value: (data.acceptanceRate * 100).toFixed(2), color: "blue" },
                                { icon: Zap, title: "Current Streak", value: data.submissionCalendar.streak, color: "yellow" },
                                { icon: Award, title: "Contest Rating", value: Math.round(data?.contestData?.userContestRanking?.rating ?? 0), color: "purple" },
                            ].map((stat, index) => (
                                <div key={stat.title} className="animate-float-in" style={{ animationDelay: `${400 + index * 100}ms` }}>
                                    <StatCard {...stat} delay={index * 100} />
                                </div>
                            ))}
                        </div>

                        {/* Contest Stats and Badges */}
                        <div className="space-y-6 md:space-y-8">
                            <div className="animate-float-in" style={{ animationDelay: '800ms' }}>
                                <LeetCodeContestStats contestData={data.contestData?.userContestRanking} />
                            </div>
                            <div className="animate-float-in" style={{ animationDelay: '900ms' }}>
                                <BadgeCollection badges={data.badges.badges} />
                            </div>
                        </div>

                        {/* Charts Grid */}
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                            {/* Submission Activity */}
                            <div className="xl:col-span-2 bg-white/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/80 animate-float-in" style={{ animationDelay: '1000ms' }}>
                                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                    <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg">
                                        <BarChart2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-black text-gray-800">Submission Activity</h3>
                                </div>
                                <div className="w-full h-64 sm:h-72 md:h-80">
                                    <ResponsiveContainer>
                                        <LineChart data={getLeetcodeSubmissionData(data?.submissionCalendar?.submissionCalendar)} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
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
                            <div className="animate-float-in" style={{ animationDelay: '1100ms' }}>
                                <ProblemStats problemsData={getLeetcodeDifficultyData(data.problemsCount.acSubmissionNum)} />
                            </div>
                        </div>

                        {/* Additional Insights */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                            {/* Topic Mastery */}
                            <div className="animate-float-in" style={{ animationDelay: '1200ms' }}>
                                <TopicStats topicData={getLeetcodeTopicData(data.topicWiseProblems)} />
                            </div>

                            {/* AI Recommended Video */}
                            {data?.profileAnalysis?.video && <div className="animate-float-in" style={{ animationDelay: '1300ms' }}>
                                <VideoSuggestion suggestedVideo={data.profileAnalysis.video} />
                            </div>}
                        </div>
                    </div>
                )}

                {isError && (
                    <div className="animate-float-in">
                        <ErrorContainer
                            error={error}
                            onRetry={handleAnalyze}
                            isLoading={isFetching}
                            errorAdditionalHelp={["Make sure the LeetCode username is correct", "Ensure the user has a public profile", "Try again in a few minutes if issues persist"]}
                        />
                    </div>
                )}
            </main>
        </>
    );
};

export default LeetCode;