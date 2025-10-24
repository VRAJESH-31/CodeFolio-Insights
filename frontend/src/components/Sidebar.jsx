import React, { useState } from 'react';
// Import 'Link'
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ isSidebarCollapsed, activeMenu, setActiveMenu, user, handleLogout }) => {
    const [hoveredItem, setHoveredItem] = useState(null);

    // 1. Add 'path' to each item
    const sidebarItems = [
        { name: 'Dashboard', icon: 'fa-solid fa-table-columns', path: '/dashboard' },
        { name: 'LeetCode', icon: 'fa-solid fa-code', path: '/leetcode' },
        { name: 'GitHub', icon: 'fa-brands fa-github', path: '/github' },
        { name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', path: '/linkedin' },
        { name: 'Resume Analysis', icon: 'fa-solid fa-file-lines', path: '/resume-analyse' }, // Your requested path
        { name: 'Settings', icon: 'fa-solid fa-gear', path: '/settings' },
    ];

    return (
        <aside className={`hidden md:flex flex-col bg-white border-r border-gray-200 shadow-sm transition-all duration-500 ease-in-out ${isSidebarCollapsed ? 'w-20' : 'w-72'}`}>
            {/* Header */}
            <div className={`flex items-center justify-center h-16 border-b border-gray-200 ${isSidebarCollapsed ? 'px-2' : 'px-4'}`}>
                <div className="flex items-center space-x-2 overflow-hidden transition-all duration-300">
                    <svg className={`h-8 w-8 text-indigo-600 flex-shrink-0 transition-transform duration-300 ${isSidebarCollapsed ? 'scale-110' : 'scale-100'}`} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 15.5v-3.5h3v3.5h-3zm0-5.5v-5h3v5h-3z" />
                    </svg>
                    {!isSidebarCollapsed && (
                        <span className="text-xl font-bold text-gray-800 whitespace-nowrap animate-fade-in">
                            CodeFolio-Insights
                        </span>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3">
                <ul className="space-y-2">
                    {sidebarItems.map((item) => (
                        <li key={item.name} className="relative">
                            {/* 2. Replace <a> with <Link> and href="#" with to={item.path} */}
                            <Link
                                to={item.path}
                                onClick={() => setActiveMenu(item.name)}
                                onMouseEnter={() => setHoveredItem(item.name)}
                                onMouseLeave={() => setHoveredItem(null)}
                                className={`flex items-center p-3 text-gray-700 rounded-xl group transition-all duration-300 ease-out relative overflow-hidden ${activeMenu === item.name
                                        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-800 font-semibold shadow-sm'
                                        : 'hover:bg-gray-50 hover:shadow-sm'
                                    }`}
                            >
                                {activeMenu === item.name && (
                                    <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-full animate-slide-in-right"></div>
                                )}
                                <div className={`relative z-10 transition-all duration-300 ${activeMenu === item.name ? 'transform scale-110' : 'group-hover:scale-105'}`}>
                                    <i className={`${item.icon} w-6 text-center text-xl transition-all duration-300 ${activeMenu === item.name ? 'text-indigo-600' : 'text-gray-500 group-hover:text-gray-800'}`}></i>
                                </div>
                                {!isSidebarCollapsed && (
                                    <span className="ml-4 whitespace-nowrap transition-all duration-300 animate-fade-in">
                                        {item.name}
                                    </span>
                                )}
                                {isSidebarCollapsed && (
                                    <div className={`absolute left-full ml-3 w-max px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl z-50 transition-all duration-200 ${hoveredItem === item.name ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 -translate-x-2 pointer-events-none'}`}>
                                        {item.name}
                                        <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-0 border-r-4 border-r-gray-900 border-t-transparent border-b-transparent"></div>
                                    </div>
                                )}
                                {!isSidebarCollapsed && activeMenu === item.name && !['Dashboard', 'Settings'].includes(item.name) && (
                                    <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold py-1.5 px-4 rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 animate-pulse-slow z-10">
                                        <span className="flex items-center space-x-1">
                                            <i className="fa-solid fa-chart-line text-xs"></i>
                                            <span>Analyze</span>
                                        </span>
                                    </button>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
                {!isSidebarCollapsed && (
                    <div className="px-3 pt-4 mt-6 border-t border-gray-200 animate-fade-in">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-xs text-blue-700 font-medium">
                                <i className="fa-solid fa-lightbulb mr-1"></i>
                                Click on a category to get an AI-powered analysis of your profile.
                            </p>
                        </div>
                    </div>
                )}
            </nav>

            {/* User Profile Section */}
            <div className="p-4 border-t border-gray-200">
                <details className="group">
                    <summary className={`flex items-center list-none cursor-pointer p-2 rounded-xl hover:bg-gray-50 transition-all duration-300 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                        <div className={`relative transition-all duration-300 ${isSidebarCollapsed ? 'scale-110' : 'scale-100'}`}>
                            <img
                                src={user ? user.profilePicture : "https://placehold.co/40x40/E9D5FF/4F46E5?text=AC"}
                                alt="User profile"
                                className="h-10 w-10 rounded-full border-2 border-transparent group-hover:border-indigo-300 transition-all duration-300 flex-shrink-0 shadow-sm"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        {!isSidebarCollapsed && (
                            <>
                                <div className="ml-3 overflow-hidden flex-1 min-w-0 animate-fade-in">
                                    <p className="text-sm font-semibold text-gray-800 truncate">{user ? user.name : 'Guest User'}</p>
                                    <p className="text-xs text-gray-500 truncate">{user ? user.jobTitle : 'Full Stack Developer'}</p>
                                </div>
                                <i className="fa-solid fa-chevron-up ml-2 text-gray-500 transition-transform duration-300 group-open:rotate-180 flex-shrink-0 text-sm"></i>
                            </>
                        )}
                    </summary>
                    {!isSidebarCollapsed && (
                        <div className="mt-2 space-y-1 animate-fade-in">
                            <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all duration-200 group/item">
                                <i className="fa-solid fa-user w-4 text-center group-hover/item:scale-110 transition-transform"></i>
                                <span>Profile Settings</span>
                            </Link>
                            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all duration-200 group/item">
                                <i className="fa-solid fa-link w-4 text-center group-hover/item:scale-110 transition-transform"></i>
                                <span>Manage Links</span>
                            </a>
                            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all duration-200 group/item">
                                <i className="fa-solid fa-share-nodes w-4 text-center group-hover/item:scale-110 transition-transform"></i>
                                <span>Share Profile</span>
                            </a>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg mt-2 group/item"
                            >
                                <i className="fa-solid fa-arrow-right-from-bracket w-4 text-center group-hover/item:translate-x-0.5 transition-transform"></i>
                                <span>Sign Out</span>
                            </button>
                        </div>
                    )}
                </details>
            </div>
        </aside>
    );
};

export default Sidebar;