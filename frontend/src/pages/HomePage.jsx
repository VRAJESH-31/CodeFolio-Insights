import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Linkedin, FileText, Code, Users, Star, GitFork, Trophy, BookOpen, CheckCircle, Target, BrainCircuit, ExternalLink, ArrowRight, Rss } from 'lucide-react';

// --- Reimagined UI Components ---

// A wrapper for all dashboard cards to maintain a consistent look
const DashboardCard = ({ children, className = '' }) => (
    <div className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-lg ${className}`}>
        {children}
    </div>
);

// New Stat Card with a more compact and modern design
const StatCard = ({ icon, title, value, change, changeType }) => (
    <DashboardCard className="p-5">
        <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">{title}</p>
            {icon}
        </div>
        <p className="text-3xl font-bold text-white mt-2">{value}</p>
        {change && (
            <div className={`mt-1 text-xs flex items-center ${changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                {change}
            </div>
        )}
    </DashboardCard>
);

// Progress bar for difficulty breakdown
const DifficultyBar = ({ level, value, maxValue, color }) => (
    <div>
        <div className="flex justify-between items-center text-sm mb-1">
            <p className="text-gray-300">{level}</p>
            <p className="font-semibold text-white">{value}</p>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className={`${color} h-2.5 rounded-full`} style={{ width: `${(value / maxValue) * 100}%` }}></div>
        </div>
    </div>
);

// Activity calendar/heatmap (Slightly restyled)
const ActivityCalendar = () => {
    const days = Array.from({ length: 98 }, (_, i) => ({ level: Math.floor(Math.random() * 5) }));
    const colors = ['bg-gray-700/50', 'bg-emerald-900', 'bg-emerald-700', 'bg-emerald-500', 'bg-emerald-300'];
    return (
        <div className="p-4">
            <h3 className="font-bold text-lg mb-4 text-white">Contribution Graph</h3>
            <div className="grid grid-flow-col grid-rows-7 gap-1">
                {days.map((day, i) => (
                    <div key={i} className={`w-2 h-2 rounded-sm ${colors[day.level]}`} title={`Activity Level: ${day.level}`}></div>
                ))}
            </div>
        </div>
    );
};

// New component for language distribution
const LanguageChart = () => {
    const languages = [
        { name: 'JavaScript', value: 45, color: 'bg-yellow-400' },
        { name: 'TypeScript', value: 30, color: 'bg-blue-400' },
        { name: 'Python', value: 15, color: 'bg-green-400' },
        { name: 'HTML/CSS', value: 10, color: 'bg-orange-400' },
    ];

    return (
        <DashboardCard className="p-6">
            <h3 className="font-bold text-lg mb-4 text-white">Language Distribution</h3>
            <div className="space-y-4">
                <div className="flex w-full h-3 rounded-full overflow-hidden" role="progressbar" aria-label="Language distribution bar">
                    {languages.map(lang => (
                        <div key={lang.name} className={lang.color} style={{ width: `${lang.value}%` }} title={`${lang.name}: ${lang.value}%`}></div>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    {languages.map(lang => (
                        <div key={lang.name} className="flex items-center">
                            <span className={`w-2.5 h-2.5 rounded-full mr-2 ${lang.color}`}></span>
                            <span className="text-gray-300">{lang.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardCard>
    );
};

// Main HomePage Component
const HomePage = () => {
    const navigate = useNavigate();
    const sections = {
        dashboard: useRef(null),
        github: useRef(null),
        linkedin: useRef(null),
        resume: useRef(null),
        gfg: useRef(null),
    };

    const scrollTo = (section) => {
        sections[section].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleLogout = async () => {
        localStorage.removeItem('token');
        try {
            await fetch('http://localhost:8080/auth/logout', {
                method: 'POST',
            });
        } catch (error) {
            console.error('Logout failed:', error);
        }
        navigate('/');
    };

    // --- Main Layout Components ---

    const NavBar = () => (
        <nav className="bg-gray-900/60 backdrop-blur-md sticky top-0 z-50 border-b border-gray-700/50">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Code className="w-8 h-8 text-indigo-400" />
                    <h1 className="text-xl font-bold text-white">Codfolio-Insights</h1>
                </div>
                <div className="hidden md:flex items-center space-x-2">
                    {['dashboard', 'github', 'linkedin', 'resume', 'gfg'].map((item) => (
                        <button key={item} onClick={() => scrollTo(item)} className="capitalize text-gray-300 hover:bg-gray-700/50 hover:text-indigo-300 transition-all duration-300 font-medium px-4 py-2 rounded-lg">
                            {item}
                        </button>
                    ))}
                    <button onClick={handleLogout} className="capitalize text-gray-300 bg-red-600/50 hover:bg-red-500/50 hover:text-white transition-all duration-300 font-medium px-4 py-2 rounded-lg">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );

    const DashboardSection = () => (
        <section ref={sections.dashboard} className="py-12 px-6 container mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white">Welcome Back!</h1>
                <p className="text-gray-400">Here's your developer snapshot for today.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Content Area */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StatCard icon={<Star className="w-6 h-6 text-yellow-400" />} title="GitHub Stars" value="5.8k" change="+25 this week" changeType="increase" />
                    <StatCard icon={<Trophy className="w-6 h-6 text-amber-400" />} title="LeetCode Rating" value="1985" change="+30 this month" changeType="increase" />
                    <StatCard icon={<Users className="w-6 h-6 text-sky-400" />} title="LinkedIn Network" value="850+" change="+12 new connections" changeType="increase" />
                    <StatCard icon={<BrainCircuit className="w-6 h-6 text-green-400" />} title="GFG Score" value="2150" change="+50 this month" changeType="increase" />

                    <DashboardCard className="md:col-span-2 p-6">
                        <h3 className="font-bold text-lg mb-4 text-white">Coding Problems Breakdown</h3>
                        <div className="space-y-4">
                            <DifficultyBar level="Easy" value={200} maxValue={250} color="bg-green-500" />
                            <DifficultyBar level="Medium" value={180} maxValue={250} color="bg-yellow-500" />
                            <DifficultyBar level="Hard" value={70} maxValue={250} color="bg-red-500" />
                        </div>
                    </DashboardCard>
                    <DashboardCard className="p-6">
                        <h3 className="font-bold text-lg mb-4 text-white">Resume Score</h3>
                        <div className="flex items-center justify-center h-full">
                            <div className="relative w-32 h-32">
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                    <circle className="text-gray-700" strokeWidth="10" cx="50" cy="50" r="40" fill="transparent"></circle>
                                    <circle className="text-indigo-500" strokeWidth="10" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset="25.12"></circle>
                                </svg>
                                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                    <span className="text-3xl font-bold text-white">92%</span>
                                </div>
                            </div>
                        </div>
                    </DashboardCard>
                    <LanguageChart />

                    <DashboardCard className="md:col-span-2">
                        <ActivityCalendar />
                    </DashboardCard>
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <DashboardCard className="p-6 text-center">
                        <img src="https://placehold.co/128x128/111827/a78bfa?text=U" alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-700" />
                        <h2 className="text-xl font-bold text-white">Your Name</h2>
                        <p className="text-indigo-400 text-sm">@your-username</p>
                        <div className="flex justify-center gap-4 mt-4">
                            <Github className="w-5 h-5 text-gray-400 hover:text-white" />
                            <Linkedin className="w-5 h-5 text-gray-400 hover:text-white" />
                            <Rss className="w-5 h-5 text-gray-400 hover:text-white" />
                        </div>
                    </DashboardCard>
                    <DashboardCard className="p-6">
                        <h3 className="font-bold text-lg mb-4 text-white">Top Repositories</h3>
                        <div className="space-y-3">
                            {['Portfolio-v3', 'React-Dashboard', 'AI-Summarizer'].map(repo => (
                                <a href="#" key={repo} className="flex justify-between items-center text-sm group">
                                    <span className="text-gray-300 group-hover:text-indigo-400">{repo}</span>
                                    <Star className="w-4 h-4 text-gray-500 group-hover:text-yellow-400" />
                                </a>
                            ))}
                        </div>
                    </DashboardCard>
                    <button onClick={() => scrollTo('github')} className="w-full text-center p-4 bg-indigo-600/80 hover:bg-indigo-500 rounded-2xl text-white font-semibold transition-all flex items-center justify-center gap-2">
                        View Full Reports <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );

    const DetailSection = ({ id, title, subtitle, icon, children }) => (
        <section ref={sections[id]} className="py-20 bg-gray-900/50">
            <div className="container mx-auto px-6">
                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-gray-800 p-3 rounded-xl ring-2 ring-indigo-500/50">{icon}</div>
                    <div>
                        <h2 className="text-3xl font-bold text-white">{title}</h2>
                        <p className="text-gray-400">{subtitle}</p>
                    </div>
                </div>
                {children}
            </div>
        </section>
    );

    const GitHubSection = () => (
        <DetailSection id="github" title="GitHub Deep Dive" subtitle="A detailed analysis of your GitHub activity and projects." icon={<Github className="w-8 h-8 text-indigo-400" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<BookOpen size={24} className="text-white" />} title="Repositories" value="128" />
                <StatCard icon={<Users size={24} className="text-white" />} title="Followers" value="2.1k" />
                <StatCard icon={<Star size={24} className="text-white" />} title="Stars Received" value="5.8k" />
                <StatCard icon={<GitFork size={24} className="text-white" />} title="Total Forks" value="890" />
            </div>
            {/* Add more detailed components like charts or repo lists here */}
        </DetailSection>
    );

    const LinkedInSection = () => (
        <DetailSection id="linkedin" title="LinkedIn Insights" subtitle="Analyze your professional network and profile strength." icon={<Linkedin className="w-8 h-8 text-indigo-400" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<Users size={24} className="text-white" />} title="Connections" value="850+" />
                <StatCard icon={<CheckCircle size={24} className="text-white" />} title="Skills Endorsed" value="78" />
                <StatCard icon={<FileText size={24} className="text-white" />} title="Recent Posts" value="12" />
                <StatCard icon={<Target size={24} className="text-white" />} title="Profile Views" value="312" />
            </div>
        </DetailSection>
    );

    const ResumeSection = () => (
        <DetailSection id="resume" title="Resume Analyzer" subtitle="Check ATS compatibility and keyword optimization." icon={<FileText className="w-8 h-8 text-indigo-400" />}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                    <h3 className="font-bold text-lg mb-4 text-white">Keyword Analysis</h3>
                    <div className="flex flex-wrap gap-2">
                        {['React', 'Node.js', 'TypeScript', 'AWS', 'Python', 'SQL', 'CI/CD', 'Agile'].map(kw => (
                            <span key={kw} className="bg-indigo-500/20 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full">{kw}</span>
                        ))}
                    </div>
                </div>
                <StatCard icon={<BrainCircuit size={24} className="text-white" />} title="ATS Match Score" value="92%" />
            </div>
        </DetailSection>
    );

    const GFGSection = () => (
        <DetailSection id="gfg" title="GeeksforGeeks Stats" subtitle="A summary of your performance and contributions on GFG." icon={<BrainCircuit className="w-8 h-8 text-indigo-400" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<Trophy size={24} className="text-white" />} title="Overall Score" value="2150" />
                <StatCard icon={<CheckCircle size={24} className="text-white" />} title="Problems Solved" value="450+" />
                <StatCard icon={<FileText size={24} className="text-white" />} title="Articles Published" value="15" />
                <StatCard icon={<Target size={24} className="text-white" />} title="Monthly Coding Score" value="180" />
            </div>
        </DetailSection>
    );


    return (
        <div className="bg-gray-900 min-h-screen font-sans text-gray-200 relative">
            {/* Aurora Background Effect */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>
            </div>

            <NavBar />
            <main>
                <DashboardSection />
                <GitHubSection />
                <LinkedInSection />
                <ResumeSection />
                <GFGSection />
            </main>
        </div>
    );
};

export default HomePage;