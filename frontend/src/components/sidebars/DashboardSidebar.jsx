import { useState } from 'react';
import { Edit3, ExternalLink, MapPin, Mail, Linkedin, Twitter, Globe, Github, ChevronDown, Plus, FileText } from 'lucide-react';
import { useAuthStore } from '../../store/export.js';
import { InfoTooltip } from '../export.js';

const DashboardSidebar = () => {
    const { user } = useAuthStore();
    const [isPublic, setIsPublic] = useState(true);
    const [isProblemStatsOpen, setIsProblemStatsOpen] = useState(true);
    const [isDevStatsOpen, setIsDevStatsOpen] = useState(true);

    const problemPlatforms = [
        { name: 'LeetCode', icon: '/Images/Icons/leetcode.png' },
        { name: 'CodeStudio', icon: '/Images/Icons/codestudio.png' },
        { name: 'GeeksForGeeks', icon: '/Images/Icons/gfg.png' },
        { name: 'InterviewBit', icon: '/Images/Icons/interviewbit.png' },
        { name: 'CodeChef', icon: '/Images/Icons/codechef.png' },
        { name: 'CodeForces', icon: '/Images/Icons/codeforces.png' },
        { name: 'HackerRank', icon: '/Images/Icons/hackerrank.png' },
        { name: 'AtCoder', icon: '/Images/Icons/atcoder.png' },
    ];

    const stats = [
        { label: 'Profile Views', value: '158', color: 'text-orange-500' },
        { label: 'Last Refresh', value: '27 Dec 2024', color: 'text-slate-500' },
        { label: 'Visibility', value: 'Public', color: 'text-slate-500' },
    ];

    return (
        <aside className="w-80 h-full bg-white border-r border-slate-100 flex flex-col relative shadow-xl">
            <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <InfoTooltip
                            text="Visible to everyone"
                            direction="right"
                        />
                        <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Public Profile</span>
                        <button
                            onClick={() => setIsPublic(!isPublic)}
                            className={`relative w-10 h-5 rounded-full transition-all ${isPublic ? 'bg-green-500' : 'bg-slate-200'}`}
                        >
                            <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${isPublic ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                    </div>
                    <button className="p-2 hover:bg-slate-50 rounded-xl transition-all text-slate-400 hover:text-blue-600">
                        <Edit3 className="w-4 h-4" />
                    </button>
                </div>

                <div className="px-6 py-6 flex flex-col items-center text-center">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-10 animate-pulse-glow" />
                        <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden relative z-10">
                            <img src={user?.photoURL || "/Images/Default/user.png"} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-black text-slate-800 mb-2">{user?.displayName || "User Name"}</h2>
                    <p className="text-xs text-slate-400 leading-relaxed font-bold mb-8 px-4 italic">{user?.bio || "Software Development Enthusiast | Competitive Programmer"}</p>

                    <div className="flex items-center justify-between w-full px-4 mb-8 text-slate-400">
                        <Mail className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-all hover:scale-110" />
                        <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-all hover:scale-110" />
                        <Twitter className="w-5 h-5 cursor-pointer hover:text-sky-500 transition-all hover:scale-110" />
                        <Globe className="w-5 h-5 cursor-pointer hover:text-emerald-500 transition-all hover:scale-110" />
                        <FileText className="w-5 h-5 cursor-pointer hover:text-rose-500 transition-all hover:scale-110" />
                    </div>

                    <div className="w-full space-y-3 text-left bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-3 text-slate-600 font-bold text-xs">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            <span>{user?.location || "India"}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 px-4 pb-8 space-y-4">
                    <div className="space-y-2">
                        <button
                            onClick={() => setIsProblemStatsOpen(!isProblemStatsOpen)}
                            className="w-full flex items-center justify-between p-4 bg-slate-50/80 hover:bg-slate-100 rounded-2xl transition-all group"
                        >
                            <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Problem Solving</span>
                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-all ${isProblemStatsOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isProblemStatsOpen && (
                            <div className="space-y-1 py-2">
                                {problemPlatforms.map((platform) => (
                                    <div key={platform.name} className="flex items-center justify-between p-3.5 hover:bg-slate-50 rounded-2xl transition-all group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-lg bg-white p-1 border border-slate-100 shadow-sm flex items-center justify-center">
                                                <img src={platform.icon} alt={platform.name} className="w-5 h-5 object-contain grayscale group-hover:grayscale-0 transition-all" />
                                            </div>
                                            <span className="text-sm font-bold text-slate-700">{platform.name}</span>
                                        </div>
                                        <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                                    </div>
                                ))}
                                <button className="w-full flex items-center justify-center gap-2 p-4 mt-2 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all font-black text-xs uppercase tracking-widest">
                                    <Plus className="w-4 h-4" /> Add Platform
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <button
                            onClick={() => setIsDevStatsOpen(!isDevStatsOpen)}
                            className="w-full flex items-center justify-between p-4 bg-slate-50/80 hover:bg-slate-100 rounded-2xl transition-all group"
                        >
                            <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Development</span>
                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-all ${isDevStatsOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isDevStatsOpen && (
                            <div className="space-y-1 py-2">
                                <div className="flex items-center justify-between p-3.5 hover:bg-slate-50 rounded-2xl transition-all group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center border border-slate-100 shadow-sm">
                                            <Github className="w-4 h-4 text-slate-800" />
                                        </div>
                                        <span className="text-sm font-bold text-slate-700">GitHub</span>
                                    </div>
                                    <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="px-4 space-y-3 pt-6 border-t border-slate-50">
                        {stats.map((stat) => (
                            <div key={stat.label} className="flex justify-between items-center group/stat">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                                <span className={`text-xs font-black ${stat.color} group-hover/stat:scale-105 transition-transform`}>{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default DashboardSidebar;