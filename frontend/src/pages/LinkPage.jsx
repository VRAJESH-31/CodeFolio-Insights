// src/pages/LinkManager.jsx
import React, { useState, useEffect } from 'react';
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
    Eye,
    EyeOff,
    Link as LinkIcon,
    Sparkles,
    Zap,
    Users,
    Shield,
    Star,
    TrendingUp
} from 'lucide-react';

const LinkPage = () => {
    const [links, setLinks] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        platform: '',
        username: '',
        url: '',
        visibility: 'public'
    });
    const [copiedId, setCopiedId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const platforms = [
        { value: 'leetcode', label: 'LeetCode', icon: Code, color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-500/10', placeholder: 'leetcode_username' },
        { value: 'github', label: 'GitHub', icon: Github, color: 'from-gray-700 to-gray-900', bgColor: 'bg-gray-500/10', placeholder: 'github_username' },
        { value: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'from-blue-600 to-blue-700', bgColor: 'bg-blue-500/10', placeholder: 'linkedin.com/in/username' },
        { value: 'gfg', label: 'GeeksForGeeks', icon: Code, color: 'from-green-500 to-green-600', bgColor: 'bg-green-500/10', placeholder: 'geeksforgeeks_username' },
        { value: 'hackerrank', label: 'HackerRank', icon: Code, color: 'from-green-400 to-green-500', bgColor: 'bg-emerald-500/10', placeholder: 'hackerrank_username' },
        { value: 'codechef', label: 'CodeChef', icon: Code, color: 'from-yellow-600 to-yellow-700', bgColor: 'bg-yellow-500/10', placeholder: 'codechef_username' },
        { value: 'codeforces', label: 'CodeForces', icon: Code, color: 'from-red-500 to-red-600', bgColor: 'bg-red-500/10', placeholder: 'codeforces_username' },
        { value: 'twitter', label: 'Twitter', icon: Twitter, color: 'from-blue-400 to-blue-500', bgColor: 'bg-sky-500/10', placeholder: 'twitter_username' },
        { value: 'portfolio', label: 'Portfolio', icon: Globe, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-500/10', placeholder: 'yourportfolio.com' },
        { value: 'resume', label: 'Resume', icon: FileText, color: 'from-indigo-500 to-indigo-600', bgColor: 'bg-indigo-500/10', placeholder: 'drive.google.com/your-resume' },
    ];

    useEffect(() => {
        // Simulate loading delay for better UX
        const timer = setTimeout(() => {
            const savedLinks = localStorage.getItem('userLinks');
            if (savedLinks) {
                setLinks(JSON.parse(savedLinks));
            }
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const saveLinks = (newLinks) => {
        setLinks(newLinks);
        localStorage.setItem('userLinks', JSON.stringify(newLinks));
    };

    const handleAdd = () => {
        setIsAdding(true);
        setFormData({
            platform: '',
            username: '',
            url: '',
            visibility: 'public'
        });
    };

    const handleEdit = (link) => {
        setEditingId(link.id);
        setFormData({
            platform: link.platform,
            username: link.username,
            url: link.url,
            visibility: link.visibility
        });
    };

    const handleSave = () => {
        if (!formData.platform || !formData.username) return;

        const platformConfig = platforms.find(p => p.value === formData.platform);
        const defaultUrl = getDefaultUrl(formData.platform, formData.username);
        
        const linkData = {
            id: editingId || Date.now().toString(),
            platform: formData.platform,
            username: formData.username,
            url: formData.url || defaultUrl,
            visibility: formData.visibility,
            label: platformConfig?.label || formData.platform,
            color: platformConfig?.color || 'from-gray-500 to-gray-600',
            bgColor: platformConfig?.bgColor || 'bg-gray-500/10'
        };

        if (editingId) {
            const updatedLinks = links.map(link => 
                link.id === editingId ? linkData : link
            );
            saveLinks(updatedLinks);
            setEditingId(null);
        } else {
            saveLinks([...links, linkData]);
            setIsAdding(false);
        }

        setFormData({
            platform: '',
            username: '',
            url: '',
            visibility: 'public'
        });
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
        setFormData({
            platform: '',
            username: '',
            url: '',
            visibility: 'public'
        });
    };

    const handleDelete = (id) => {
        const updatedLinks = links.filter(link => link.id !== id);
        saveLinks(updatedLinks);
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
        };
        return urlMap[platform] || username;
    };

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const toggleVisibility = (id) => {
        const updatedLinks = links.map(link => 
            link.id === id 
                ? { ...link, visibility: link.visibility === 'public' ? 'private' : 'public' }
                : link
        );
        saveLinks(updatedLinks);
    };

    // Animation styles
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

    const publicLinks = links.filter(link => link.visibility === 'public').length;
    const privateLinks = links.filter(link => link.visibility === 'private').length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 font-sans relative overflow-hidden">
            <style>{animationStyles}</style>
            
            {/* Animated Background Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl animate-float"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-200/30 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-green-200/20 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Enhanced Header */}
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

                {/* Stats Cards */}
                {links.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-slide-in" style={{animationDelay: '0.1s'}}>
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
                        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/60">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-500/10 rounded-lg">
                                    <Eye className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-gray-800">{publicLinks}</div>
                                    <div className="text-sm text-gray-600">Public</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/60">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-500/10 rounded-lg">
                                    <EyeOff className="h-5 w-5 text-gray-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-gray-800">{privateLinks}</div>
                                    <div className="text-sm text-gray-600">Private</div>
                                </div>
                            </div>
                        </div>
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

                {/* Enhanced Add Button */}
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

                {/* Enhanced Add/Edit Form */}
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

                            {/* Custom URL */}
                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <LinkIcon className="h-4 w-4 text-purple-500" />
                                    Custom URL (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={formData.url}
                                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                                    placeholder="Leave empty for default URL"
                                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 bg-white/80 hover:border-gray-300"
                                />
                            </div>

                            {/* Visibility */}
                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Shield className="h-4 w-4 text-orange-500" />
                                    Visibility
                                </label>
                                <select
                                    value={formData.visibility}
                                    onChange={(e) => setFormData({...formData, visibility: e.target.value})}
                                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 bg-white/80 hover:border-gray-300"
                                >
                                    <option value="public">🌍 Public - Visible to everyone</option>
                                    <option value="private">🔒 Private - Only visible to you</option>
                                </select>
                            </div>
                        </div>

                        {/* Action Buttons */}
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
                                className="group flex items-center gap-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                <X className="h-5 w-5 transition-transform group-hover:scale-110" />
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Enhanced Links Grid */}
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
                                    
                                    {/* Platform Header */}
                                    <div className="flex items-center justify-between mb-4 relative z-10">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-3 rounded-xl bg-gradient-to-r ${link.color} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                                <IconComponent className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-800 block">{link.label}</span>
                                                <span className={`text-xs px-2 py-1 rounded-full ${link.visibility === 'public' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                                    {link.visibility}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => toggleVisibility(link.id)}
                                            className={`p-2 rounded-lg transition-all duration-300 ${
                                                link.visibility === 'public' 
                                                    ? 'text-green-500 hover:bg-green-50 hover:scale-110' 
                                                    : 'text-gray-400 hover:bg-gray-50 hover:scale-110'
                                            }`}
                                        >
                                            {link.visibility === 'public' ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                        </button>
                                    </div>

                                    {/* Username */}
                                    <div className="mb-4 relative z-10">
                                        <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                                            <Users className="h-3 w-3" />
                                            Username
                                        </p>
                                        <p className="font-semibold text-gray-800 truncate bg-gray-50/50 p-2 rounded-lg">
                                            {link.username}
                                        </p>
                                    </div>

                                    {/* URL Preview */}
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

                                    {/* Action Buttons */}
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

                {/* Enhanced Empty State */}
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