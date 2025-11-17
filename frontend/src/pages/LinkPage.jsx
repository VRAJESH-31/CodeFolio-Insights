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

    return (
        <div className="min-h-screen bg-white p-6 font-sans">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Platforms</h1>
                <p className="text-gray-600 mt-2">You can update and verify your platform details here.</p>
            </div>

            {/* Add Link Button */}
            {!isAdding && !editingId && (
                <div className="mb-6">
                    <button
                        onClick={handleAdd}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        Add Platform
                    </button>
                </div>
            )}

            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        {editingId ? 'Edit Platform' : 'Add New Platform'}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Platform Selection */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Platform</label>
                            <select
                                value={formData.platform}
                                onChange={(e) => setFormData({...formData, platform: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
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
                            <label className="block text-sm font-medium text-gray-700">
                                Username/URL
                            </label>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                placeholder={platforms.find(p => p.value === formData.platform)?.placeholder || 'Enter username or URL'}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>

                        {/* Custom URL */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Custom URL (Optional)
                            </label>
                            <input
                                type="text"
                                value={formData.url}
                                onChange={(e) => setFormData({...formData, url: e.target.value})}
                                placeholder="Leave empty for default URL"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>

                        {/* Visibility */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Visibility</label>
                            <select
                                value={formData.visibility}
                                onChange={(e) => setFormData({...formData, visibility: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={handleSave}
                            disabled={!formData.platform || !formData.username}
                            className="flex items-center gap-2 bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Check className="h-4 w-4" />
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
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
                            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Platform Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg bg-gradient-to-r ${link.color || 'from-gray-500 to-gray-600'}`}>
                                        <IconComponent className="h-5 w-5 text-white" />
                                    </div>
                                    <span className="font-semibold text-gray-800">{link.label}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => toggleVisibility(link.id)}
                                        className={`p-1 rounded transition-colors ${
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
                                <p className="font-medium text-gray-800 truncate">{link.username}</p>
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
                                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-800 py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                                >
                                    <ExternalLink className="h-3 w-3" />
                                    Visit
                                </a>
                                <button
                                    onClick={() => handleEdit(link)}
                                    className="flex items-center justify-center gap-2 bg-blue-100 text-blue-700 py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-200 transition-colors"
                                >
                                    <Edit3 className="h-3 w-3" />
                                </button>
                                <button
                                    onClick={() => handleDelete(link.id)}
                                    className="flex items-center justify-center gap-2 bg-red-100 text-red-700 py-2 px-3 rounded-md text-sm font-medium hover:bg-red-200 transition-colors"
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
                <div className="text-center py-12">
                    <div className="p-6 bg-gray-50 rounded-lg max-w-md mx-auto">
                        <div className="p-3 bg-blue-100 rounded-lg inline-block mb-4">
                            <LinkIcon className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Platforms Added Yet</h3>
                        <p className="text-gray-600 mb-4">
                            Start by adding your first platform to showcase your profiles
                        </p>
                        <button
                            onClick={handleAdd}
                            className="inline-flex items-center gap-2 bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                            Add Your First Platform
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LinkPage;