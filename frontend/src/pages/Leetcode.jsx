// src/pages/LeetCode.jsx
import React, { useState } from 'react';
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
} from 'recharts';

const LeetCode = () => {
    const [userId, setUserId] = useState('');
    const [analysis, setAnalysis] = useState(null);

    const submissionData = [
        { name: 'Mar 18', solved: 2 },
        { name: 'Jun 10', solved: 5 },
        { name: 'Jun 18', solved: 2 },
        { name: 'Jun 26', solved: 3 },
        { name: 'Jul 3', solved: 1 },
        { name: 'Jul 4', solved: 1 },
        { name: 'Jul 23', solved: 1 },
        { name: 'Aug 5', solved: 1 },
        { name: 'Aug 21', solved: 2 },
    ];

    const difficultyData = [
        { name: 'Easy', value: 12 },
        { name: 'Medium', value: 6 },
        { name: 'Hard', value: 1 },
    ];

    const COLORS = ['#34D399', '#F59E0B', '#EF4444'];

    const handleAnalyze = () => {
        setAnalysis({
            totalSolved: 19,
            acceptanceRate: '80.77%',
            currentStreak: 0,
            longestStreak: 2,
            ranking: '3,719,824',
            profileScore: 82,
        });
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar
                isSidebarCollapsed={false}
                activeMenu="LeetCode"
                setActiveMenu={() => {}}
                user={{ name: 'John Doe', jobTitle: 'Developer' }}
                handleLogout={() => alert('Logged out')}
            />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 space-y-8">
                <h2 className="text-4xl font-bold text-gray-800">LeetCode Analysis</h2>

                {/* Input Section */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Analyze Your Profile
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="Enter your LeetCode UserID"
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        <button
                            onClick={handleAnalyze}
                            className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200"
                        >
                            <Search className="w-5 h-5" />
                            Analyze
                        </button>
                    </div>
                </div>

                {/* Results Section */}
                {analysis && (
                    <>
                        <ProfileScoreReview score={analysis.profileScore} />

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                            <StatCard icon={CheckCircle} title="Total Solved" value={analysis.totalSolved} color="text-green-500" />
                            <StatCard icon={Target} title="Acceptance Rate" value={analysis.acceptanceRate} color="text-blue-500" />
                            <StatCard icon={Zap} title="Current Streak" value={analysis.currentStreak} color="text-yellow-500" />
                            <StatCard icon={Award} title="Longest Streak" value={analysis.longestStreak} color="text-orange-500" />
                            <StatCard icon={Trophy} title="Ranking" value={analysis.ranking} color="text-purple-500" />
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <BarChart2 className="w-5 h-5 text-indigo-500" />
                                    Submission Activity
                                </h3>
                                <div style={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <LineChart data={submissionData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                            <XAxis dataKey="name" stroke="#6b7280" />
                                            <YAxis stroke="#6b7280" />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="solved" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <PieChartIcon className="w-5 h-5 text-indigo-500" />
                                    Problem Difficulty
                                </h3>
                                <div style={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <PieChart>
                                            <Pie
                                                data={difficultyData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={100}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {difficultyData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* AI Recommended Video */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Recommended Video</h3>
                            <div className="aspect-video bg-gray-900 rounded-lg mb-4 overflow-hidden">
                                <iframe
                                    className="w-full h-full rounded-lg"
                                    src="https://www.youtube.com/embed/P6FORpg0KVo"
                                    title="Dynamic Programming Tutorial"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-800">Dynamic Programming: From Zero to Hero</h4>
                            <p className="text-gray-600 mt-2">
                                This AI-selected video helps you master Dynamic Programming, focusing on your weak areas.
                            </p>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

/* --- Profile Score & Meme Review --- */
const ProfileScoreReview = ({ score }) => {
    const getMemeForScore = (score) => {
        if (score <= 10) return { text: "Bhai... kya kar raha hai tu?", meme: "https://placehold.co/400x200/EF4444/FFFFFF?text=Abe+Sale!", comment: "Not great. Start from basics." };
        if (score <= 30) return { text: "Okay, we have a foundation.", meme: "https://placehold.co/400x200/F59E0B/FFFFFF?text=Yeh+BabuRao+Ka+Style+Hai", comment: "Focus on consistency." };
        if (score <= 60) return { text: "Average hai, overconfident mat hona.", meme: "https://placehold.co/400x200/84CC16/FFFFFF?text=50+Rupya+Kaat", comment: "Slightly above average!" };
        if (score <= 80) return { text: "Good job! Thoda aur...", meme: "https://placehold.co/400x200/22C55E/FFFFFF?text=Gajab+Bezzati+Hai", comment: "You’re showing strong consistency." };
        if (score <= 100) return { text: "Legendary! Sab phod diya.", meme: "https://placehold.co/400x200/06B6D4/FFFFFF?text=Apun+Hi+Bhagwan+Hai", comment: "Outstanding work!" };
        return { text: "", meme: "", comment: "" };
    };

    const review = getMemeForScore(score);

    return (
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Review</h3>
            <div className="space-y-4">
                <div>
                    <h4 className="font-semibold text-gray-800">Profile Score</h4>
                    <div className="text-5xl font-bold text-indigo-600 my-2">
                        {score}<span className="text-3xl text-gray-500">/100</span>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <MessageSquareQuote className="w-5 h-5 text-indigo-500" /> Our Honest Take
                    </h4>
                    <img src={review.meme} alt="Meme" className="w-full rounded-lg mb-3" />
                    <p className="text-center text-lg font-medium text-gray-700 italic">"{review.text}"</p>
                    <p className="text-sm text-gray-600 mt-2 text-center">{review.comment}</p>
                </div>

                <hr className="my-4" />
                <h4 className="font-semibold text-gray-800">Key Insights</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2">
                    <li>High acceptance rate on Easy problems.</li>
                    <li>Struggling with Medium problems.</li>
                    <li>Submission activity is inconsistent.</li>
                </ul>

                <button className="w-full flex items-center justify-center gap-2 bg-indigo-100 text-indigo-700 font-semibold px-4 py-3 rounded-lg hover:bg-indigo-200 transition-all duration-200 mt-4">
                    Get Full Report
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

/* --- Stat Card --- */
const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white p-5 rounded-xl shadow-md flex items-center space-x-4">
        <div className={`p-3 rounded-full bg-opacity-10 ${color.replace('text', 'bg').replace('-500', '-100')}`}>
            <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

export default LeetCode;
