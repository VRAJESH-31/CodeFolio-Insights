import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User,
    Mail,
    Briefcase,
    Camera,
    Save,
    Palette,
    Globe,
    MapPin,
    FileText,
    Sparkles,
    Edit3,
    EyeOff
} from 'lucide-react';
import axiosInstance from '../api/axiosInstance';

const ProfilePage = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        jobTitle: '',
        profile: '',
        bio: '',
        location: '',
        website: '',
        phone: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser({
                name: userData.name || '',
                email: userData.email || '',
                jobTitle: userData.jobTitle || 'Full Stack Developer',
                profile: userData.profile || userData.profilePicture || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                bio: userData.bio || 'Passionate developer building amazing applications',
                location: userData.location || 'San Francisco, CA',
                website: userData.website || '',
                phone: userData.phone || ''
            });
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
        const previewUrl = URL.createObjectURL(file);
        setUser(prev => ({ ...prev, profile: previewUrl }));
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', user.name || '');
            formData.append('jobTitle', user.jobTitle || '');
            formData.append('bio', user.bio || '');
            formData.append('location', user.location || '');
            formData.append('website', user.website || '');
            formData.append('phone', user.phone || '');

            if (selectedFile) {
                // backend expected field name for image (adjust if backend uses a different name)
                formData.append('profileImage', selectedFile);
            }

            // use axiosInstance which should be configured with withCredentials: true
            const res = await axiosInstance.patch('/user', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const updatedUser = res.data;
            if (updatedUser) {
                // ensure localStorage and state are in sync with server response
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(prev => ({
                    ...prev,
                    name: updatedUser.name ?? prev.name,
                    email: updatedUser.email ?? prev.email,
                    jobTitle: updatedUser.jobTitle ?? prev.jobTitle,
                    profile: updatedUser.profile ?? updatedUser.profilePicture ?? prev.profile,
                    bio: updatedUser.bio ?? prev.bio,
                    location: updatedUser.location ?? prev.location,
                    website: updatedUser.website ?? prev.website,
                    phone: updatedUser.phone ?? prev.phone
                }));
                setIsEditing(false);
            } else {
                alert('Failed to update profile.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating the profile.');
        } finally {
            setIsLoading(false);
        }
    };

    const animationStyles = `
        @keyframes floatIn {
            0% { opacity: 0; transform: translateY(20px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes glowPulse {
            0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.2); }
            50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.4); }
        }
        @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: 200px 0; }
        }
        .animate-float-in { animation: floatIn 0.6s ease-out forwards; }
        .animate-glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
        .animate-shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            background-size: 200px 100%;
            animation: shimmer 2s infinite;
        }
    `;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 p-4 font-sans">
            <style>{animationStyles}</style>

            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8 animate-float-in">
                    <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Profile Settings
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Manage your profile information and appearance settings
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1 animate-float-in" style={{ animationDelay: '100ms' }}>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100/50 p-6">
                            <div className="text-center mb-6">
                                <div className="relative inline-block mb-4">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md opacity-30 animate-glow-pulse"></div>
                                    <img
                                        src={user.profile || user.profilePicture}
                                        alt="Profile"
                                        className="relative w-20 h-20 rounded-full object-cover border-2 border-blue-500/50 shadow-lg"
                                    />
                                    <button
                                        onClick={triggerFileInput}
                                        className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full border-2 border-white hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
                                    >
                                        <Camera className="w-3 h-3 text-white" />
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </div>
                                <h3 className="font-bold text-lg text-gray-800">{user.name}</h3>
                                <p className="text-blue-600 text-sm">{user.jobTitle}</p>
                                <div className="flex items-center justify-center gap-1 mt-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs text-gray-500">Online</span>
                                </div>
                            </div>

                            <nav className="space-y-2">
                                {[
                                    { id: 'profile', icon: User, label: 'Profile Info' },
                                    { id: 'appearance', icon: Palette, label: 'Appearance' }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                                            activeTab === tab.id
                                                ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 font-semibold border border-blue-200'
                                                : 'text-gray-600 hover:text-gray-800 hover:bg-blue-50/50'
                                        }`}
                                    >
                                        <tab.icon className="w-5 h-5" />
                                        <span className="font-medium">{tab.label}</span>
                                    </button>
                                ))}
                            </nav>

                            <div className="mt-6 p-4 bg-blue-50/50 rounded-xl border border-blue-200/50">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-gray-600">Profile Completion</span>
                                    <span className="text-sm font-bold text-blue-600">85%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 animate-shimmer"
                                        style={{ width: '85%' }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3 space-y-8">
                        {activeTab === 'profile' && (
                            <div className="animate-float-in" style={{ animationDelay: '200ms' }}>
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100/50 p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3">
                                            <User className="w-6 h-6 text-blue-600" />
                                            Personal Information
                                        </h2>
                                        <button
                                            onClick={() => setIsEditing(!isEditing)}
                                            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                                        >
                                            {isEditing ? (
                                                <>
                                                    <EyeOff className="w-4 h-4" />
                                                    Cancel
                                                </>
                                            ) : (
                                                <>
                                                    <Edit3 className="w-4 h-4" />
                                                    Edit Profile
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                                    <User className="w-4 h-4 text-blue-500" />
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={user.name}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                                    <Mail className="w-4 h-4 text-blue-500" />
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={user.email}
                                                    disabled
                                                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                                    <Briefcase className="w-4 h-4 text-blue-500" />
                                                    Job Title
                                                </label>
                                                <input
                                                    type="text"
                                                    name="jobTitle"
                                                    value={user.jobTitle}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                                    <MapPin className="w-4 h-4 text-blue-500" />
                                                    Location
                                                </label>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={user.location}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                                    <Globe className="w-4 h-4 text-blue-500" />
                                                    Website
                                                </label>
                                                <input
                                                    type="url"
                                                    name="website"
                                                    value={user.website}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    placeholder="https://yourwebsite.com"
                                                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                                    <FileText className="w-4 h-4 text-blue-500" />
                                                    Phone
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={user.phone}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    placeholder="+1 (555) 123-4567"
                                                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                                <Sparkles className="w-4 h-4 text-blue-500" />
                                                Bio
                                            </label>
                                            <textarea
                                                name="bio"
                                                value={user.bio}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                rows="3"
                                                placeholder="Tell us about yourself..."
                                                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                                            />
                                        </div>

                                        {isEditing && (
                                            <div className="flex gap-4 pt-4">
                                                <button
                                                    type="submit"
                                                    disabled={isLoading}
                                                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50"
                                                >
                                                    {isLoading ? (
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <Save className="w-5 h-5" />
                                                    )}
                                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                                </button>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        )}

                        {activeTab === 'appearance' && (
                            <div className="animate-float-in" style={{ animationDelay: '200ms' }}>
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100/50 p-8">
                                    <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3 mb-6">
                                        <Palette className="w-6 h-6 text-blue-600" />
                                        Appearance Settings
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <h3 className="font-semibold text-gray-800 text-lg">Theme</h3>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {[
                                                        { id: 'light', name: 'Light', active: true },
                                                        { id: 'dark', name: 'Dark', active: false },
                                                        { id: 'auto', name: 'Auto', active: false }
                                                    ].map((theme) => (
                                                        <button
                                                            key={theme.id}
                                                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                                                                theme.active
                                                                    ? 'border-blue-500 bg-blue-50 shadow-md'
                                                                    : 'border-gray-200 bg-white hover:border-blue-300'
                                                            }`}
                                                        >
                                                            <div className="text-sm font-medium text-gray-800">{theme.name}</div>
                                                            {theme.active && (
                                                                <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-2"></div>
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <h3 className="font-semibold text-gray-800 text-lg">Accent Color</h3>
                                                <div className="grid grid-cols-4 gap-4">
                                                    {[
                                                        { color: 'blue', active: true },
                                                        { color: 'purple', active: false },
                                                        { color: 'green', active: false },
                                                        { color: 'orange', active: false }
                                                    ].map((item) => (
                                                        <button
                                                            key={item.color}
                                                            className={`relative w-12 h-12 rounded-xl border-2 transition-all duration-300 transform hover:scale-110 ${
                                                                item.active ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                                                            }`}
                                                        >
                                                            <div className={`w-full h-full rounded-lg bg-${item.color}-500`}></div>
                                                            {item.active && (
                                                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <h3 className="font-semibold text-gray-800 text-lg">Layout</h3>
                                                <div className="space-y-3">
                                                    {[
                                                        { id: 'compact', name: 'Compact', description: 'Dense information display' },
                                                        { id: 'comfortable', name: 'Comfortable', description: 'Balanced spacing', active: true },
                                                        { id: 'spacious', name: 'Spacious', description: 'More whitespace' }
                                                    ].map((layout) => (
                                                        <label key={layout.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                name="layout"
                                                                checked={layout.active}
                                                                onChange={() => {}}
                                                                className="text-blue-500 focus:ring-blue-500"
                                                            />
                                                            <div>
                                                                <div className="font-medium text-gray-800">{layout.name}</div>
                                                                <div className="text-sm text-gray-600">{layout.description}</div>
                                                            </div>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <h3 className="font-semibold text-gray-800 text-lg">Font Size</h3>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-sm text-gray-600">Small</span>
                                                    <input
                                                        type="range"
                                                        min="12"
                                                        max="18"
                                                        defaultValue="16"
                                                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                                    />
                                                    <span className="text-sm text-gray-600">Large</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                                        <div className="flex items-center gap-3">
                                            <Sparkles className="w-5 h-5 text-blue-600" />
                                            <h3 className="font-bold text-gray-800">Preview</h3>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">
                                            Changes will be applied across all pages instantly. Your preferences are saved automatically.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;