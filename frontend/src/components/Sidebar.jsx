import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import { ChevronLeft, ChevronRight, LayoutDashboard, FileUser } from 'lucide-react';

// Assuming the parent component passes a handler for 'isSidebarCollapsed' 
// via the 'setActiveMenu' prop, or simply expects a mutation on 'isSidebarCollapsed'.
// A cleaner approach would be to rename the prop to 'setIsSidebarCollapsed' 
// if it's indeed a setter function, but we'll adapt to the current structure.

const Sidebar = ({ isSidebarCollapsed, activeMenu, setActiveMenu }) => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [mounted, setMounted] = useState(false);
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    // Determine if the provided 'setActiveMenu' is actually a setter function
    // for the sidebar's collapsed state (which is a common pattern for 
    // controlling state from a parent component).
    const isParentControllingCollapse = typeof setActiveMenu === 'function' && setActiveMenu.length === 1;

    const handleToggleCollapse = () => {
        // If a setter for the collapse state is provided by the parent (via setActiveMenu), use it.
        if (isParentControllingCollapse) {
            setActiveMenu(!isSidebarCollapsed);
        }
        // If no dedicated collapse setter is provided, you might decide to do nothing, 
        // or ensure the parent passes the necessary function. 
        // For this scenario, we assume the parent is responsible for toggling 
        // the state exposed as `isSidebarCollapsed`.
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = async () => {
        await logout(); // Wait for store to clear data
        navigate('/'); // Redirect user
    };

    const sidebarItems = [
        { name: 'Dashboard', icon: 'fa-solid fa-table-columns', path: '/dashboard', collapsedIcon: <LayoutDashboard className="w-5 h-5" /> },
        { name: 'LeetCode', icon: 'fa-solid fa-code', path: '/analyzer/leetcode', collapsedIcon: <img src="/Images/Icons/leetcode.png" alt="LeetCode" className="w-5 h-5 object-contain" /> },
        { name: 'GitHub', icon: 'fa-brands fa-github', path: '/analyzer/github', collapsedIcon: <img src="/Images/Icons/github.png" alt="GitHub" className="w-5 h-5 object-contain" /> },
        { name: 'Resume Analysis', icon: 'fa-solid fa-file-lines', path: '/analyzer/resume', collapsedIcon: <FileUser className="w-5 h-5" /> },
    ];

    // Enhanced animations CSS (kept exactly as provided)
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

    // Function to handle link clicks, ensuring the correct menu item is set as active
    const handleLinkClick = (itemName) => {
        if (typeof setActiveMenu === 'function') {
            // Check if setActiveMenu is for setting the active menu name
            if (!isParentControllingCollapse) {
                setActiveMenu(itemName);
            } else {
                // If setActiveMenu is being used to toggle collapse, we should avoid 
                // passing the item name here or rename the prop in the parent component.
                // For now, we only call it if it's explicitly for menu name setting.
            }
        }
    };


    return (
        <>
            <style>{animationStyles}</style>
            <aside
                className={`hidden md:flex flex-col bg-gradient-to-b from-white to-blue-50/30 border-r border-blue-100/50 shadow-2xl transition-all duration-700 ease-out backdrop-blur-sm ${isSidebarCollapsed ? 'w-24' : 'w-80'
                    } ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)',
                    backdropFilter: 'blur(20px)'
                }}
            >
                {/* Enhanced Header */}
                <div className={`relative flex items-center justify-between h-20 border-b border-blue-100/50 transition-all duration-500 ${isSidebarCollapsed ? 'px-4' : 'pr-3 pl-6' // Adjust padding based on collapsed state
                    }`}>
                    <div className="flex items-center space-x-3 overflow-hidden transition-all duration-500">
                        {/* Only show branding when expanded */}
                        {!isSidebarCollapsed && (
                            <div className="animate-slide-in-right">
                                <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                                    CodeFolio
                                </span>
                                <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-1 animate-shimmer"></div>
                            </div>
                        )}
                        {/* Always visible logo/icon when collapsed */}
                        {isSidebarCollapsed && (
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-md opacity-30 animate-glow-pulse"></div>
                                <i className="fa-solid fa-terminal text-2xl text-blue-600 relative z-10 p-1"></i>
                            </div>
                        )}
                    </div>

                    {/* Toggle Collapse Button - Always positioned at the end of the header */}
                    <button
                        onClick={handleToggleCollapse}
                        className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-all duration-300 flex items-center justify-center flex-shrink-0"
                        title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                    >
                        {/* Toggle between chevron-right and chevron-left icons */}
                        {isSidebarCollapsed ? (
                            <ChevronRight className="w-5 h-5 text-blue-600" />
                        ) : (
                            <ChevronLeft className="w-5 h-5 text-blue-600" />
                        )}
                    </button>
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
                                    onClick={() => handleLinkClick(item.name)} // Use the new handler
                                    onMouseEnter={() => setHoveredItem(item.name)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    className={`group flex items-center p-4 rounded-2xl transition-all duration-500 ease-out relative overflow-hidden ${activeMenu === item.name
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
                                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl transition-all duration-500 ${hoveredItem === item.name && activeMenu !== item.name ? 'opacity-100' : 'opacity-0'
                                        }`}></div>

                                    {/* Icon with enhanced animations */}
                                    <div className={`relative z-10 transition-all duration-500 ${activeMenu === item.name
                                        ? 'transform scale-110 rotate-12'
                                        : 'group-hover:scale-110 group-hover:rotate-6'
                                        }`}>
                                        <div className={`p-2 rounded-xl transition-all duration-500 ${activeMenu === item.name
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg'
                                            : 'bg-white/80 shadow-sm group-hover:bg-blue-500/10'
                                            }`}>
                                            {isSidebarCollapsed ? (
                                                <span className={`flex items-center justify-center transition-all duration-500 ${activeMenu === item.name ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'}`}>
                                                    {item.collapsedIcon}
                                                </span>
                                            ) : (
                                                <i className={`${item.icon} w-5 text-center text-lg transition-all duration-500 ${activeMenu === item.name
                                                    ? 'text-white'
                                                    : 'text-gray-600 group-hover:text-blue-600'
                                                    }`}></i>
                                            )}
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
                                        <div className={`absolute left-full ml-4 w-max px-4 py-3 bg-gray-900/95 text-white text-sm font-semibold rounded-xl shadow-2xl z-50 transition-all duration-300 backdrop-blur-sm ${hoveredItem === item.name
                                            ? 'opacity-100 scale-100 translate-x-0'
                                            : 'opacity-0 scale-95 -translate-x-2 pointer-events-none'
                                            }`}>
                                            {item.name}
                                            <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-0 border-r-4 border-r-gray-900/95 border-t-transparent border-b-transparent"></div>
                                        </div>
                                    )}

                                    {/* Enhanced Analyze button (only visible when expanded and active) */}
                                    {!isSidebarCollapsed && activeMenu === item.name && !['Dashboard', 'Resume Analysis'].includes(item.name) && (
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
                </nav>

                {/* Enhanced User Profile Section */}
                <div className="p-6 border-t border-blue-100/50 bg-white/50 backdrop-blur-sm">
                    <details className="group">
                        <summary className={`flex items-center list-none cursor-pointer p-3 rounded-2xl hover:bg-white/80 transition-all duration-500 ${isSidebarCollapsed ? 'justify-center' : ''
                            } group-hover:shadow-lg group-hover:border group-hover:border-blue-100/50`}>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                                <img
                                    src={user?.profilePicture || "/Images/Default/user.png"}
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
                                        {<p className="text-xs text-gray-600 truncate mt-1">
                                            {user?.jobTitle || 'Programmer'}
                                        </p>}
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
                                <a href="/link" className="flex items-center gap-4 px-4 py-3 text-sm text-gray-700 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all duration-300 group/item">
                                    <i className="fa-solid fa-link w-4 text-center group-hover/item:scale-110 transition-transform duration-300"></i>
                                    <span className="font-medium">Manage Links</span>
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