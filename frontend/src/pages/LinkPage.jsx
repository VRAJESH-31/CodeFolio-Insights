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
    Link as LinkIcon
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

    const platforms = [
        { value: 'leetcode', label: 'LeetCode', icon: Code, color: 'from-orange-500 to-orange-600', placeholder: 'leetcode_username' },
        { value: 'github', label: 'GitHub', icon: Github, color: 'from-gray-700 to-gray-900', placeholder: 'github_username' },
        { value: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'from-blue-600 to-blue-700', placeholder: 'linkedin.com/in/username' },
        { value: 'gfg', label: 'GeeksForGeeks', icon: Code, color: 'from-green-500 to-green-600', placeholder: 'geeksforgeeks_username' },
        { value: 'hackerrank', label: 'HackerRank', icon: Code, color: 'from-green-400 to-green-500', placeholder: 'hackerrank_username' },
        { value: 'codechef', label: 'CodeChef', icon: Code, color: 'from-yellow-600 to-yellow-700', placeholder: 'codechef_username' },
        { value: 'codeforces', label: 'CodeForces', icon: Code, color: 'from-red-500 to-red-600', placeholder: 'codeforces_username' },
        { value: 'twitter', label: 'Twitter', icon: Twitter, color: 'from-blue-400 to-blue-500', placeholder: 'twitter_username' },
        { value: 'portfolio', label: 'Portfolio', icon: Globe, color: 'from-purple-500 to-purple-600', placeholder: 'yourportfolio.com' },
        { value: 'resume', label: 'Resume', icon: FileText, color: 'from-indigo-500 to-indigo-600', placeholder: 'drive.google.com/your-resume' },
    ];

    useEffect(() => {
        // Load saved links from localStorage
        const savedLinks = localStorage.getItem('userLinks');
        if (savedLinks) {
            setLinks(JSON.parse(savedLinks));
        }
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
            color: platformConfig?.color || 'from-gray-500 to-gray-600'
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

    const animationStyles = `
        @keyframes floatIn {
            0% { opacity: 0; transform: translateY(20px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideIn {
            from { opacity: 0; transform: translateX(-10px); }
            to { opacity: 1; transform: translateX(0); }
        }
        .animate-float-in { animation: floatIn 0.5s ease-out forwards; }
        .animate-slide-in { animation: slideIn 0.3s ease-out forwards; }
    `;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 font-sans">
            <style>{animationStyles}</style>
            
            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12 animate-float-in">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                            <LinkIcon className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Profile Links
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Manage all your coding profiles and social links in one place
                    </p>
                </div>

                {/* Stats Summary */}
                {links.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-float-in" style={{animationDelay: '100ms'}}>
                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/60 text-center">
                            <div className="text-2xl font-black text-gray-800">{links.length}</div>
                            <div className="text-sm text-gray-600">Total Links</div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/60 text-center">
                            <div className="text-2xl font-black text-gray-800">
                                {links.filter(l => l.visibility === 'public').length}
                            </div>
                            <div className="text-sm text-gray-600">Public Links</div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/60 text-center">
                            <div className="text-2xl font-black text-gray-800">
                                {links.filter(l => l.visibility === 'private').length}
                            </div>
                            <div className="text-sm text-gray-600">Private Links</div>
                        </div>
                    </div>
                )}

                {/* Add Link Button */}
                {!isAdding && !editingId && (
                    <div className="text-center mb-8 animate-float-in" style={{animationDelay: '200ms'}}>
                        
                            
                       
                    </div>
                )}

                {/* Add/Edit Form */}
                {(isAdding || editingId) && (
                    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 mb-8 animate-float-in">
                        <h2 className="text-2xl font-black text-gray-800 mb-6 text-center">
                            {editingId ? 'Edit Link' : 'Add New Link'}
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Platform Selection */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Platform</label>
                                <select
                                    value={formData.platform}
                                    onChange={(e) => setFormData({...formData, platform: e.target.value})}
                                    className="w-full p-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 bg-white/80"
                                >
                                    <option value="">Select Platform</option>
                                    {platforms.map(platform => (
                                        <option key={platform.value} value={platform.value}>
                                            {platform.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Username */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Username/URL
                                </label>
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                                    placeholder={platforms.find(p => p.value === formData.platform)?.placeholder || 'Enter username or URL'}
                                    className="w-full p-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 bg-white/80"
                                />
                            </div>

                            {/* Custom URL */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Custom URL (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={formData.url}
                                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                                    placeholder="Leave empty for default URL"
                                    className="w-full p-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 bg-white/80"
                                />
                            </div>

                            {/* Visibility */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Visibility</label>
                                <select
                                    value={formData.visibility}
                                    onChange={(e) => setFormData({...formData, visibility: e.target.value})}
                                    className="w-full p-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 bg-white/80"
                                >
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                </select>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-8 justify-center">
                            <button
                                onClick={handleSave}
                                disabled={!formData.platform || !formData.username}
                                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Check className="h-4 w-4" />
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <X className="h-4 w-4" />
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {links.map((link, index) => {
                        const platformConfig = platforms.find(p => p.value === link.platform);
                        const IconComponent = platformConfig?.icon || Globe;
                        
                        return (
                            <div 
                                key={link.id}
                                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/60 p-6 animate-float-in hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
                                style={{animationDelay: `${(index + 3) * 100}ms`}}
                            >
                                {/* Platform Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-xl bg-gradient-to-r ${link.color || 'from-gray-500 to-gray-600'}`}>
                                            <IconComponent className="h-5 w-5 text-white" />
                                        </div>
                                        <span className="font-bold text-gray-800">{link.label}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => toggleVisibility(link.id)}
                                            className={`p-1 rounded-lg transition-colors ${
                                                link.visibility === 'public' 
                                                    ? 'text-green-500 hover:bg-green-50' 
                                                    : 'text-gray-400 hover:bg-gray-50'
                                            }`}
                                        >
                                            {link.visibility === 'public' ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Username */}
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-1">Username</p>
                                    <p className="font-semibold text-gray-800 truncate">{link.username}</p>
                                </div>

                                {/* URL Preview */}
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-1">URL</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-blue-600 truncate flex-1">{link.url}</p>
                                        <button
                                            onClick={() => copyToClipboard(link.url, link.id)}
                                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
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
                                <div className="flex gap-2">
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-3 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-200"
                                    >
                                        <ExternalLink className="h-3 w-3" />
                                        Visit
                                    </a>
                                    <button
                                        onClick={() => handleEdit(link)}
                                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-2 px-3 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-200"
                                    >
                                        <Edit3 className="h-3 w-3" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(link.id)}
                                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-3 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-200"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {links.length === 0 && !isAdding && (
                    <div className="text-center py-16 animate-float-in">
                        <div className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/60 max-w-md mx-auto">
                            <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl inline-block mb-4">
                                <LinkIcon className="h-12 w-12 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-black text-gray-800 mb-2">No Links Added Yet</h3>
                            <p className="text-gray-600 mb-6">
                                Start by adding your first profile link to showcase your coding journey
                            </p>
                            <button
                                onClick={handleAdd}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <Plus className="h-4 w-4" />
                                Add Your First Link
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LinkPage;
