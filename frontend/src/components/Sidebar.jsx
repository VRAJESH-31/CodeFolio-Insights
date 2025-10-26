import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isSidebarCollapsed, activeMenu, setActiveMenu, user, handleLogout }) => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [mounted, setMounted] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMounted(true);
    }, []);

    const sidebarItems = [
        { name: 'Dashboard', icon: 'fa-solid fa-table-columns', path: '/home' },
        { name: 'LeetCode', icon: 'fa-solid fa-code', path: '/leetcode' },
        { name: 'GitHub', icon: 'fa-brands fa-github', path: '/github' },
        { name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', path: '/linkedin' },
        { name: 'Resume Analysis', icon: 'fa-solid fa-file-lines', path: '/resume-analyse' },
        { name: 'Settings', icon: 'fa-solid fa-gear', path: '/settings' },
    ];

    // Enhanced animations CSS
    const animationStyles = `
        @keyframes slideInRight {
            from { transform: translateX(-10px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInUp {
            from { transform: translateY(10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes glowPulse {
            0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.1); }
            50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.2); }
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-2px); }
        }
        @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: 200px 0; }
        }
        .animate-slide-in-right { animation: slideInRight 0.3s ease-out; }
        .animate-slide-in-up { animation: slideInUp 0.4s ease-out; }
        .animate-glow-pulse { animation: glowPulse 2s ease-in-out infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            background-size: 200px 100%;
            animation: shimmer 2s infinite;
        }
    `;

    return (
        <>
            <style>{animationStyles}</style>
            <aside 
                className={`hidden md:flex flex-col bg-gradient-to-b from-white to-blue-50/30 border-r border-blue-100/50 shadow-2xl transition-all duration-700 ease-out backdrop-blur-sm ${
                    isSidebarCollapsed ? 'w-24' : 'w-80'
                } ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)',
                    backdropFilter: 'blur(20px)'
                }}
            >
                {/* Enhanced Header */}
                <div className={`flex items-center justify-center h-20 border-b border-blue-100/50 transition-all duration-500 ${
                    isSidebarCollapsed ? 'px-4' : 'px-6'
                }`}>
                    <div className="flex items-center space-x-3 overflow-hidden transition-all duration-500">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-md opacity-30 animate-glow-pulse"></div>
                        
                        </div>
                        {!isSidebarCollapsed && (
                            <div className="animate-slide-in-right">
                                <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                                    CodeFolio-Insights
                                </span>
                                <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-1 animate-shimmer"></div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Enhanced Navigation */}
                <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-4 custom-scrollbar">
                    <ul className="space-y-3">
                        {sidebarItems.map((item, index) => (
                            <li 
                                key={item.name} 
                                className="relative"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <Link
                                    to={item.path}
                                    onClick={() => setActiveMenu(item.name)}
                                    onMouseEnter={() => setHoveredItem(item.name)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    className={`group flex items-center p-4 rounded-2xl transition-all duration-500 ease-out relative overflow-hidden ${
                                        activeMenu === item.name
                                            ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 shadow-lg shadow-blue-500/20 border border-blue-200/50'
                                            : 'hover:bg-white/80 hover:shadow-lg hover:border hover:border-blue-100/50'
                                    } ${mounted ? 'animate-slide-in-up' : ''}`}
                                >
                                    {/* Active indicator with enhanced animation */}
                                    {activeMenu === item.name && (
                                        <>
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-1.5 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-full animate-float"></div>
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-shimmer rounded-2xl"></div>
                                        </>
                                    )}

                                    {/* Hover effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl transition-all duration-500 ${
                                        hoveredItem === item.name && activeMenu !== item.name ? 'opacity-100' : 'opacity-0'
                                    }`}></div>

                                    {/* Icon with enhanced animations */}
                                    <div className={`relative z-10 transition-all duration-500 ${
                                        activeMenu === item.name 
                                            ? 'transform scale-110 rotate-12' 
                                            : 'group-hover:scale-110 group-hover:rotate-6'
                                    }`}>
                                        <div className={`p-2 rounded-xl transition-all duration-500 ${
                                            activeMenu === item.name
                                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg'
                                                : 'bg-white/80 shadow-sm group-hover:bg-blue-500/10'
                                        }`}>
                                            <i className={`${item.icon} w-5 text-center text-lg transition-all duration-500 ${
                                                activeMenu === item.name 
                                                    ? 'text-white' 
                                                    : 'text-gray-600 group-hover:text-blue-600'
                                            }`}></i>
                                        </div>
                                    </div>

                                    {/* Text with smooth reveal */}
                                    {!isSidebarCollapsed && (
                                        <span className="ml-4 whitespace-nowrap font-semibold text-gray-700 transition-all duration-500 animate-slide-in-right">
                                            {item.name}
                                        </span>
                                    )}

                                    {/* Enhanced tooltip for collapsed state */}
                                    {isSidebarCollapsed && (
                                        <div className={`absolute left-full ml-4 w-max px-4 py-3 bg-gray-900/95 text-white text-sm font-semibold rounded-xl shadow-2xl z-50 transition-all duration-300 backdrop-blur-sm ${
                                            hoveredItem === item.name 
                                                ? 'opacity-100 scale-100 translate-x-0' 
                                                : 'opacity-0 scale-95 -translate-x-2 pointer-events-none'
                                        }`}>
                                            {item.name}
                                            <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-0 border-r-4 border-r-gray-900/95 border-t-transparent border-b-transparent"></div>
                                        </div>
                                    )}

                                    {/* Enhanced Analyze button */}
                                    {!isSidebarCollapsed && activeMenu === item.name && !['Dashboard', 'Settings'].includes(item.name) && (
                                        <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold py-2 px-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 animate-float z-10 group/btn">
                                            <span className="flex items-center space-x-2">
                                                <i className="fa-solid fa-chart-line text-xs group-hover/btn:scale-110 transition-transform"></i>
                                                <span>Analyze</span>
                                            </span>
                                        </button>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Enhanced Info Card */}
                    {!isSidebarCollapsed && (
                        <div className="px-3 pt-6 mt-8 border-t border-blue-100/50 animate-slide-in-up">
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
                                <div className="flex items-start space-x-3">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <i className="fa-solid fa-lightbulb text-blue-600 text-sm"></i>
                                    </div>
                                    <p className="text-xs text-blue-700/80 font-medium leading-relaxed">
                                        Click on a category to get an AI-powered analysis of your profile with detailed insights and recommendations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </nav>

                {/* Enhanced User Profile Section */}
                <div className="p-6 border-t border-blue-100/50 bg-white/50 backdrop-blur-sm">
                    <details className="group">
                        <summary className={`flex items-center list-none cursor-pointer p-3 rounded-2xl hover:bg-white/80 transition-all duration-500 ${
                            isSidebarCollapsed ? 'justify-center' : ''
                        } group-hover:shadow-lg group-hover:border group-hover:border-blue-100/50`}>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                                <img
                                    src={user?.profilePicture || "https://placehold.co/48x48/E9D5FF/4F46E5?text=AC"}
                                    alt="User profile"
                                    className="relative h-12 w-12 rounded-full border-2 border-white shadow-lg group-hover:border-blue-300 transition-all duration-500 flex-shrink-0 group-hover:scale-105"
                                />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                            </div>
                            {!isSidebarCollapsed && (
                                <>
                                    <div className="ml-4 overflow-hidden flex-1 min-w-0 animate-slide-in-right">
                                        <p className="text-sm font-bold text-gray-800 truncate">
                                            {user?.name || 'Guest User'}
                                        </p>
                                        <p className="text-xs text-gray-600 truncate mt-1">
                                            {user?.jobTitle || 'Full Stack Developer'}
                                        </p>
                                    </div>
                                    <i className="fa-solid fa-chevron-up ml-2 text-gray-500 transition-all duration-500 group-open:rotate-180 flex-shrink-0 text-sm group-hover:text-blue-600"></i>
                                </>
                            )}
                        </summary>
                        {!isSidebarCollapsed && (
                            <div className="mt-3 space-y-2 animate-slide-in-up p-2 bg-white/80 rounded-2xl shadow-lg border border-blue-100/50">
                                <Link to="/profile" className="flex items-center gap-4 px-4 py-3 text-sm text-gray-700 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all duration-300 group/item">
                                    <i className="fa-solid fa-user w-4 text-center group-hover/item:scale-110 transition-transform duration-300"></i>
                                    <span className="font-medium">Profile Settings</span>
                                </Link>
                                <a href="#" className="flex items-center gap-4 px-4 py-3 text-sm text-gray-700 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all duration-300 group/item">
                                    <i className="fa-solid fa-link w-4 text-center group-hover/item:scale-110 transition-transform duration-300"></i>
                                    <span className="font-medium">Manage Links</span>
                                </a>
                                <a href="#" className="flex items-center gap-4 px-4 py-3 text-sm text-gray-700 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all duration-300 group/item">
                                    <i className="fa-solid fa-share-nodes w-4 text-center group-hover/item:scale-110 transition-transform duration-300"></i>
                                    <span className="font-medium">Share Profile</span>
                                </a>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-4 px-4 py-3 text-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl mt-3 group/item transform hover:scale-[1.02]"
                                >
                                    <i className="fa-solid fa-arrow-right-from-bracket w-4 text-center group-hover/item:translate-x-1 transition-transform duration-300"></i>
                                    <span className="font-semibold">Sign Out</span>
                                </button>
                            </div>
                        )}
                    </details>
                </div>
            </aside>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(59, 130, 246, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #2563eb, #7c3aed);
                }
            `}</style>
        </>
    );
};

export default Sidebar;