// src/pages/LinkManager.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthStore from '../../store/useAuthStore.js';
import {
    Plus,
    Trash2,
    Edit3,
    Check,
    X,
    Github,
    Code,
    Linkedin,
    FileText,
    Globe,
    Twitter,
    Copy,
    ExternalLink,
    Link as LinkIcon,
    Sparkles,
    Zap,
    Users,
    Star,
    TrendingUp
} from 'lucide-react';
import conf from '../config/config.js';

const API_BASE_URL = `${conf.SERVER_BASE_URL}/profiles`;

// Mapping between frontend 'platform' value and backend 'profile object key'
// This mapping is crucial for talking to the fixed backend schema.
const PLATFORM_TO_BACKEND_KEY = {
    'leetcode': 'leetCodeUsername',
    'interviewbit' : 'interviewbitUsername', // Added/Confirmed for InterviewBit
    'github': 'githubUsername',
    'linkedin': 'linkedinUsername', 
    'gfg': 'gfgUsername',
    'hackerrank': 'hackerRankUsername',
    'codechef': 'codechefUsername',
    'codeforces': 'codeForcesUsername',
    'twitter': 'twitterUsername',
    'portfolio': 'portfolioWebsiteLink', 
    'resume': 'resumeLink', 
};

// Converts the backend's fixed object structure to the frontend's dynamic links array.
const transformBackendToFrontend = (backendData, platforms) => {
    const links = [];
    const keys = Object.keys(PLATFORM_TO_BACKEND_KEY);

    for (const key of keys) {
        const backendKey = PLATFORM_TO_BACKEND_KEY[key];
        const username = backendData[backendKey];

        if (username) {
            const platformConfig = platforms.find(p => p.value === key);
            links.push({
                // Unique ID required for frontend list management
                id: `${key}_${Date.now()}_${Math.random()}`, 
                platform: key,
                username: username,
                url: getDefaultUrl(key, username),
                label: platformConfig?.label || key,
                color: platformConfig?.color || 'from-gray-500 to-gray-600',
                bgColor: platformConfig?.bgColor || 'bg-gray-500/10'
            });
        }
    }
    return links;
};

// Converts the frontend's dynamic links array to the backend's fixed object structure.
const transformFrontendToBackend = (linksArray) => {
    const backendData = {};
    const seenPlatforms = new Set();
    
    // Enforces the constraint: only the first link found for a platform
    // will be saved, as the backend schema only supports one per platform.
    linksArray.forEach(link => {
        const backendKey = PLATFORM_TO_BACKEND_KEY[link.platform];
        
        if (backendKey && !seenPlatforms.has(link.platform)) {
            // Use 'username' field, which contains the username or the full URL for resume/portfolio
            backendData[backendKey] = link.username; 
            seenPlatforms.add(link.platform);
        }
    });

    return backendData;
};

const getDefaultUrl = (platform, username) => {
    const urlMap = {
        leetcode: `https://leetcode.com/${username}`,
        github: `https://github.com/${username}`,
        linkedin: `https://linkedin.com/in/${username}`,
        gfg: `https://auth.geeksforgeeks.org/user/${username}`,
        hackerrank: `https://hackerrank.com/${username}`,
        codechef: `https://codechef.com/users/${username}`,
        codeforces: `https://codeforces.com/profile/${username}`,
        twitter: `https://twitter.com/${username}`,
        interviewbit: `https://www.interviewbit.com/profile/${username}`,
    };
    // For portfolio/resume, the 'username' is the full URL, so return it directly if no map exists
    return urlMap[platform] || username;
};


const LinkPage = () => {
    const [links, setLinks] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        platform: '',
        username: '',
    });
    const [copiedId, setCopiedId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const userId = useAuthStore((state)=>state?.user?._id);

    const platforms = [
        { value: 'leetcode', label: 'LeetCode', icon: Code, color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-500/10', placeholder: 'leetcode_username' },
        { value: 'github', label: 'GitHub', icon: Github, color: 'from-gray-700 to-gray-900', bgColor: 'bg-gray-500/10', placeholder: 'github_username' },
        { value: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'from-blue-600 to-blue-700', bgColor: 'bg-blue-500/10', placeholder: 'linkedin.com/in/username' },
        { value: 'gfg', label: 'GeeksForGeeks', icon: Code, color: 'from-green-500 to-green-600', bgColor: 'bg-green-500/10', placeholder: 'geeksforgeeks_username' },
        { value: 'hackerrank', label: 'HackerRank', icon: Code, color: 'from-green-400 to-green-500', bgColor: 'bg-emerald-500/10', placeholder: 'hackerrank_username' },
        { value: 'codechef', label: 'CodeChef', icon: Code, color: 'from-yellow-600 to-yellow-700', bgColor: 'bg-yellow-500/10', placeholder: 'codechef_username' },
        { value: 'codeforces', label: 'CodeForces', icon: Code, color: 'from-red-500 to-red-600', bgColor: 'bg-red-500/10', placeholder: 'codeforces_username' },
        { value: 'twitter', label: 'Twitter', icon: Twitter, color: 'from-blue-400 to-blue-500', bgColor: 'bg-sky-500/10', placeholder: 'twitter_username' },
        { value: 'interviewbit', label: 'InterviewBit', icon: Code, color: 'from-blue-700 to-blue-900', bgColor: 'bg-blue-700/10', placeholder: 'interviewbit_username' },
        { value: 'portfolio', label: 'Portfolio', icon: Globe, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-500/10', placeholder: 'yourportfolio.com' },
        { value: 'resume', label: 'Resume', icon: FileText, color: 'from-indigo-500 to-indigo-600', bgColor: 'bg-indigo-500/10', placeholder: 'drive.google.com/your-resume' },
    ];

    const fetchLinks = async () => {
        try {
            // GET request to retrieve the profile object using the backend route
            const response = await axios.get(`${API_BASE_URL}/${userId}`);
            const rawLinks = transformBackendToFrontend(response.data, platforms);
            setLinks(rawLinks);
        } catch (error) {
            console.error('Failed to fetch profile links:', error);
            setLinks([]); 
        } finally {
            setIsLoading(false);
        }
    };
    
    // This function handles the PATCH request to update the backend
    const updateLinksOnServer = async (newLinks) => {
        // Optimistically update the state
        setLinks(newLinks); 
        
        try {
            // Transform the array into the fixed object structure required by the backend
            const backendData = transformFrontendToBackend(newLinks); 
            
            // PATCH request to update the fixed fields using the backend route
            await axios.patch(`${API_BASE_URL}/`, backendData, {withCredentials: true, requiresAuth: true});
        } catch (error) {
            console.error('Failed to update profile links on server:', error);
            fetchLinks(); 
        }
    };

    useEffect(() => {
        // Fetch data when the component mounts
        const timer = setTimeout(fetchLinks, 800);
        return () => clearTimeout(timer);
    }, []);


    const handleAdd = () => {
        setIsAdding(true);
        setFormData({
            platform: '',
            username: '',
        });
    };

    const handleEdit = (link) => {
        setEditingId(link.id);
        setFormData({
            platform: link.platform,
            username: link.username,
        });
    };

    const handleSave = async () => {
        if (!formData.platform || !formData.username) return;

        // Create a new link object with all necessary frontend properties
        const linkData = {
            id: editingId || Date.now().toString(),
            platform: formData.platform,
            username: formData.username,
        };

        let updatedLinks;
        // Format the new/updated link with platform details (color, label, url, etc.)
        // This is necessary to correctly populate the 'url' field and platform data on the frontend
        const formattedLinkData = transformBackendToFrontend(transformFrontendToBackend([linkData]), platforms)[0]; 

        if (editingId) {
            updatedLinks = links.map(link => 
                // When editing, we replace the link with the matching ID
                link.id === editingId ? formattedLinkData : link
            );
        } else {
            updatedLinks = [...links, formattedLinkData];
            setIsAdding(false);
        }

        await updateLinksOnServer(updatedLinks);

        setEditingId(null);
        setFormData({
            platform: '',
            username: '',
        });
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
        setFormData({
            platform: '',
            username: '',
        });
    };

    const handleDelete = async (id) => {
        const updatedLinks = links.filter(link => link.id !== id);
        // The transformation function will automatically remove the corresponding backend field if no link remains for that platform
        await updateLinksOnServer(updatedLinks);
    };

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    // Animation styles (Unchanged for UI consistency)
    const animationStyles = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
        }
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
            50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-shimmer { 
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            background-size: 1000px 100%;
            animation: shimmer 2s infinite;
        }
        .animate-slide-in { animation: slideIn 0.5s ease-out forwards; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
    `;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 font-sans relative overflow-hidden">
            <style>{animationStyles}</style>
            
            {/* Animated Background Elements (Unchanged) */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl animate-float"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-200/30 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-green-200/20 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Enhanced Header (Unchanged) */}
                <div className="text-center mb-12 animate-slide-in">
                    <div className="inline-flex items-center gap-3 mb-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                            <LinkIcon className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Platforms
                            </h1>
                            <p className="text-gray-600 text-sm">Manage all your coding profiles in one place</p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards (Simplified to remove Public/Private) */}
                {links.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-slide-in" style={{animationDelay: '0.1s'}}>
                        {/* Total Links */}
                        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/60">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                    <TrendingUp className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-gray-800">{links.length}</div>
                                    <div className="text-sm text-gray-600">Total Links</div>
                                </div>
                            </div>
                        </div>
                        {/* Empty placeholders to maintain 4-column layout if desired (can be removed for 2-column) */}
                        <div className="hidden md:block bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/60 opacity-0 pointer-events-none"></div>
                        <div className="hidden md:block bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/60 opacity-0 pointer-events-none"></div>
                        {/* Platforms Count */}
                        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/60">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-500/10 rounded-lg">
                                    <Sparkles className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-gray-800">{platforms.length}</div>
                                    <div className="text-sm text-gray-600">Platforms</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Enhanced Add Button (Unchanged) */}
                {!isAdding && !editingId && (
                    <div className="text-center mb-8 animate-slide-in" style={{animationDelay: '0.2s'}}>
                        <button
                            onClick={handleAdd}
                            className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
                        >
                            <div className="relative">
                                <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
                                <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            Add New Platform
                        </button>
                    </div>
                )}

                {/* Enhanced Add/Edit Form (Removed Custom URL and Visibility fields) */}
                {(isAdding || editingId) && (
                    <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 mb-8 animate-slide-in">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                                <Zap className="h-5 w-5 text-white" />
                            </div>
                            <h2 className="text-2xl font-black text-gray-800">
                                {editingId ? 'Edit Platform' : 'Add New Platform'}
                            </h2>
                        </div>
                        
                        {/* Simplified grid layout as two form fields were removed */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Platform Selection */}
                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-blue-500" />
                                    Platform
                                </label>
                                <select
                                    value={formData.platform}
                                    onChange={(e) => setFormData({...formData, platform: e.target.value})}
                                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 bg-white/80 hover:border-gray-300"
                                >
                                    <option value="">Choose a platform...</option>
                                    {platforms.map(platform => (
                                        <option key={platform.value} value={platform.value}>
                                            {platform.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Username */}
                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Users className="h-4 w-4 text-green-500" />
                                    Username/URL
                                </label>
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                                    placeholder={platforms.find(p => p.value === formData.platform)?.placeholder || 'Enter username or URL'}
                                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 bg-white/80 hover:border-gray-300"
                                />
                            </div>
                        </div>

                        {/* Action Buttons (Unchanged) */}
                        <div className="flex gap-4 mt-8 justify-center">
                            <button
                                onClick={handleSave}
                                disabled={!formData.platform || !formData.username}
                                className="group flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                <Check className="h-5 w-5 transition-transform group-hover:scale-110" />
                                {editingId ? 'Update Platform' : 'Add Platform'}
                            </button>
                            <button
                                onClick={handleCancel}
                                className="group flex items-center gap-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                <X className="h-5 w-5 transition-transform group-hover:scale-110" />
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Enhanced Links Grid (Simplified) */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/60 animate-pulse">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gray-200 rounded-lg animate-shimmer"></div>
                                    <div className="h-4 bg-gray-200 rounded w-24 animate-shimmer"></div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-3 bg-gray-200 rounded animate-shimmer"></div>
                                    <div className="h-3 bg-gray-200 rounded w-3/4 animate-shimmer"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {links.map((link, index) => {
                            const platformConfig = platforms.find(p => p.value === link.platform);
                            const IconComponent = platformConfig?.icon || Globe;
                            
                            return (
                                <div 
                                    key={link.id}
                                    className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/60 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden animate-slide-in"
                                    style={{animationDelay: `${(index % 6) * 0.1}s`}}
                                >
                                    {/* Shimmer effect on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    
                                    {/* Platform Header (Simplified) */}
                                    <div className="flex items-center justify-between mb-4 relative z-10">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-3 rounded-xl bg-gradient-to-r ${link.color} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                                <IconComponent className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-800 block">{link.label}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Username (Unchanged) */}
                                    <div className="mb-4 relative z-10">
                                        <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                                            <Users className="h-3 w-3" />
                                            Username
                                        </p>
                                        <p className="font-semibold text-gray-800 truncate bg-gray-50/50 p-2 rounded-lg">
                                            {link.username}
                                        </p>
                                    </div>

                                    {/* URL Copy Button (Moved to the bottom action bar for simplicity) */}
                                    <div className="mb-6 relative z-10">
                                        <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                                            <LinkIcon className="h-3 w-3" />
                                            URL
                                        </p>
                                        <div className="flex items-center gap-2 bg-gray-50/50 p-2 rounded-lg">
                                            <p className="text-sm text-blue-600 truncate flex-1 font-medium">{link.url}</p>
                                            <button
                                                onClick={() => copyToClipboard(link.url, link.id)}
                                                className="p-1 text-gray-400 hover:text-blue-500 transition-colors duration-300 hover:scale-110"
                                            >
                                                {copiedId === link.id ? (
                                                    <Check className="h-4 w-4 text-green-500" />
                                                ) : (
                                                    <Copy className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Action Buttons (Unchanged) */}
                                    <div className="flex gap-2 relative z-10">
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 group/visit"
                                        >
                                            <ExternalLink className="h-3 w-3 transition-transform group-hover/visit:scale-110" />
                                            Visit
                                        </a>
                                        <button
                                            onClick={() => handleEdit(link)}
                                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-4 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 group/edit"
                                        >
                                            <Edit3 className="h-3 w-3 transition-transform group-hover/edit:scale-110" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(link.id)}
                                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 group/delete"
                                        >
                                            <Trash2 className="h-3 w-3 transition-transform group-hover/delete:scale-110" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Enhanced Empty State (Unchanged) */}
                {links.length === 0 && !isAdding && !isLoading && (
                    <div className="text-center py-16 animate-slide-in">
                        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/60">
                            <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl inline-block mb-6">
                                <div className="relative">
                                    <LinkIcon className="h-12 w-12 text-blue-500" />
                                    <Sparkles className="h-5 w-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-gray-800 mb-3">No Platforms Added Yet</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Start building your developer profile by adding your first platform. Showcase your coding journey across multiple platforms!
                            </p>
                            <button
                                onClick={handleAdd}
                                className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
                            >
                                <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
                                Add Your First Platform
                                <Star className="h-4 w-4 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LinkPage;