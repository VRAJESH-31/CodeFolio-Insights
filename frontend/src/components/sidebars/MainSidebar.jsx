import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, LogOut, ChartArea, Settings, Webhook, Contact, Shield, User, Home } from 'lucide-react';
import { useAuthStore, usePreferenceStore } from '@/store/export.js';
import { useLogout } from '@/hooks/useUsers.js';
import { URL } from '@/constants/url.js';

const MainSidebar = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { mutateAsync: logout } = useLogout();
  const { isSidebarOpen } = usePreferenceStore();

  const isSidebarCollapsed = !isSidebarOpen;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const checkIfActive = (item) => {
    if (item.name === 'Home') return location.pathname === '/';
    if (item.name === 'Dashboard') return location.pathname.startsWith(`/dashboard/${user?.displayName}`);
    if (item.name === 'Analyzers') return location.pathname.startsWith('/analyzer');
    return location.pathname.startsWith(item.path);
  };

  const sidebarItems = [
    {
      name: 'Home',
      path: '/',
      Icon: Home,
      access: 'public',
    },
    {
      name: 'Dashboard',
      path: `/dashboard/${user?.displayName}`,
      Icon: LayoutDashboard,
      access: 'authenticated',
    },
    {
      name: 'Analyzers',
      path: '/analyzer',
      Icon: ChartArea,
      access: 'public',
    },
    {
      name: 'API Access',
      path: '/public-apis',
      Icon: Webhook,
      access: 'public',
    },
    {
      name: 'Contact Us',
      path: '/contact-us',
      Icon: Contact,
      access: 'public',
    },
    {
      name: 'Settings',
      path: '/settings',
      Icon: Settings,
      access: 'authenticated',
    },
    {
      name: 'Login',
      path: '/auth',
      Icon: User,
      access: 'unauthenticated',
    },
    {
      name: 'Admin Panel',
      path: '/admin',
      Icon: Shield,
      access: 'admin',
    },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col bg-white border-r border-gray-100 shadow-2xl transition-all duration-700 ease-out backdrop-blur-xl z-50 ${isSidebarCollapsed ? 'w-fit' : 'w-60'} ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)',
      }}
    >
      <div className={`relative flex items-center h-20 border-b border-gray-50 transition-all duration-500 ${isSidebarCollapsed ? 'justify-center' : 'justify-start pl-6 gap-3'}`}>
        <div className="relative flex-shrink-0">
          <img src={URL.APPLICATION_LOGO} alt="app logo" className="w-12 h-12" />
        </div>

        {/* Toggler to toggle the sidebar */}
        {!isSidebarCollapsed && <span className="text-xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-slide-in-right">CodeFolio</span>}
      </div>

      <nav className={`flex-1 ${isSidebarCollapsed ? 'overflow-visible' : 'overflow-y-auto'} py-6 px-4 custom-scrollbar`}>
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => {
            const isAvailable = !!(item.access === 'public' || (user && item.access === 'authenticated') || (!user && item.access === 'unauthenticated') || (user?.role === 'admin' && item.access === 'admin'));
            const isActive = checkIfActive(item);
            const Icon = item.Icon;

            if (isAvailable) {
              return (
                <li key={item.name} className="relative">
                  <Link
                    to={item.path}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`group flex items-center p-3.5 rounded-2xl transition-all duration-300 relative ${isActive ? 'bg-blue-50/50 text-blue-600 shadow-sm border border-blue-100/50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'} ${mounted ? 'animate-slide-in-up' : ''} ${isSidebarCollapsed ? 'justify-center' : ''}`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-blue-600 rounded-r-full" />}

                    <div className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                      <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-50 group-hover:bg-white'}`}>{item.isCustomIcon ? <img src={item.iconPath} alt={item.name} className={`w-5 h-5 object-contain ${isActive ? 'brightness-0 invert' : ''}`} /> : <Icon size={20} />}</div>
                    </div>

                    {!isSidebarCollapsed && <span className="ml-4 font-bold text-sm tracking-tight animate-slide-in-right italic">{item.name}</span>}

                    {isSidebarCollapsed && hoveredItem === item.name && <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-2xl z-[100] animate-slide-in-right whitespace-nowrap">{item.name}</div>}
                  </Link>
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
      </nav>

      <div className={`p-4 border-t border-gray-50 ${isSidebarCollapsed ? 'flex justify-center' : ''}`}>
        <details className="group">
          <summary className={`flex items-center list-none cursor-pointer p-2 rounded-2xl hover:bg-gray-50 transition-all ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="relative flex-shrink-0">
              <img src={user?.profile || URL.USER_AVATAR_PLACEHOLDER} alt="User" className="h-10 w-10 rounded-full border-2 border-white shadow-md group-hover:border-blue-200 transition-all object-cover" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm" />
            </div>
            {!isSidebarCollapsed && (
              <div className="ml-3 flex-1 min-w-0 animate-slide-in-right">
                <p className="text-sm font-black text-gray-800 truncate">{user?.name || 'Guest User'}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate">{user?.jobTitle || 'Developer'}</p>
              </div>
            )}
          </summary>
          {!isSidebarCollapsed && user && (
            <div className="mt-2 space-y-1 p-2 bg-gray-50 rounded-2xl border border-gray-100 animate-slide-in-up">
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all mt-1">
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          )}
        </details>
      </div>
    </aside>
  );
};

export default MainSidebar;
