import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, LayoutDashboard, FileUser, Code, Github, Terminal, User, Link as LinkIcon, LogOut, ChartLine } from 'lucide-react';
import {useAuthStore, usePreferenceStore} from '../../store/export.js';

const Sidebar = ({ activeMenu }) => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [mounted, setMounted] = useState(false);
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const { isSidebarOpen, toggleSidebar } = usePreferenceStore();

    const isSidebarCollapsed = !isSidebarOpen;

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const sidebarItems = [
        { name: 'Dashboard', path: '/dashboard', Icon: LayoutDashboard },
        { name: 'LeetCode', path: '/analyzer/leetcode', Icon: Code, isCustomIcon: true, iconPath: "/Images/Icons/leetcode.png" },
        { name: 'GitHub', path: '/analyzer/github', Icon: Github, isCustomIcon: true, iconPath: "/Images/Icons/github.png" },
        { name: 'Resume Analysis', path: '/analyzer/resume', Icon: FileUser },
    ];

    return (
        <aside
            className={`hidden md:flex flex-col bg-white border-r border-gray-100 shadow-2xl transition-all duration-700 ease-out backdrop-blur-xl ${isSidebarCollapsed ? 'w-20' : 'w-72'} ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)' }}
        >
            <div className={`relative flex items-center justify-between h-20 border-b border-gray-50 transition-all duration-500 ${isSidebarCollapsed ? 'px-4' : 'px-6'}`}>
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-blue-500 rounded-xl blur-md opacity-20 animate-glow-pulse" />
                        <Terminal className="w-8 h-8 text-blue-600 relative z-10" />
                    </div>
                    {!isSidebarCollapsed && (
                        <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-slide-in-right">
                            CodeFolio
                        </span>
                    )}
                </div>

                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all text-gray-400 hover:text-blue-600"
                >
                    {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
                <ul className="space-y-2">
                    {sidebarItems.map((item, index) => {
                        const isActive = activeMenu === item.name;
                        const Icon = item.Icon;
                        return (
                            <li key={item.name} className="relative">
                                <Link
                                    to={item.path}
                                    onMouseEnter={() => setHoveredItem(item.name)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    className={`group flex items-center p-3.5 rounded-2xl transition-all duration-300 relative ${isActive ? 'bg-blue-50/50 text-blue-600 shadow-sm border border-blue-100/50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'} ${mounted ? 'animate-slide-in-up' : ''}`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-blue-600 rounded-r-full" />}

                                    <div className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                                        <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-50 group-hover:bg-white'}`}>
                                            {item.isCustomIcon ? (
                                                <img src={item.iconPath} alt={item.name} className={`w-5 h-5 object-contain ${isActive ? 'brightness-0 invert' : ''}`} />
                                            ) : (
                                                <Icon size={20} />
                                            )}
                                        </div>
                                    </div>

                                    {!isSidebarCollapsed && (
                                        <span className="ml-4 font-bold text-sm tracking-tight animate-slide-in-right italic">
                                            {item.name}
                                        </span>
                                    )}

                                    {isSidebarCollapsed && hoveredItem === item.name && (
                                        <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-2xl z-50 animate-slide-in-right">
                                            {item.name}
                                        </div>
                                    )}

                                    {!isSidebarCollapsed && isActive && !['Dashboard', 'Resume Analysis'].includes(item.name) && (
                                        <div className="absolute right-4 animate-float opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ChartLine size={14} className="text-blue-500" />
                                        </div>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-50">
                <details className="group">
                    <summary className={`flex items-center list-none cursor-pointer p-2 rounded-2xl hover:bg-gray-50 transition-all ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                        <div className="relative flex-shrink-0">
                            <img
                                src={user?.profilePicture || "/Images/Default/user.png"}
                                alt="User"
                                className="h-10 w-10 rounded-full border-2 border-white shadow-md group-hover:border-blue-200 transition-all object-cover"
                            />
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                        </div>
                        {!isSidebarCollapsed && (
                            <div className="ml-3 flex-1 min-w-0 animate-slide-in-right">
                                <p className="text-sm font-black text-gray-800 truncate">{user?.name || 'Guest User'}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate">{user?.jobTitle || 'Developer'}</p>
                            </div>
                        )}
                    </summary>
                    {!isSidebarCollapsed && (
                        <div className="mt-2 space-y-1 p-2 bg-gray-50 rounded-2xl border border-gray-100 animate-slide-in-up">
                            <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-gray-600 hover:text-blue-600 hover:bg-white rounded-xl transition-all">
                                <User size={14} /> Profile Settings
                            </Link>
                            <Link to="/link" className="flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-gray-600 hover:text-blue-600 hover:bg-white rounded-xl transition-all">
                                <LinkIcon size={14} /> Manage Links
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all mt-1"
                            >
                                <LogOut size={14} /> Sign Out
                            </button>
                        </div>
                    )}
                </details>
            </div>
        </aside>
    );
};

export default Sidebar;