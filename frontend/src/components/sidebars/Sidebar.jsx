import { NavLink, useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const Sidebar = ({ title = '', items = [], className = '' }) => {
  const location = useLocation();

  const animationStyles = `
        @keyframes glowPulse { 0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.2); } 50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.4); } }
        .animate-glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
        .active-tab { background-color: rgb(239 246 255); color: rgb(29 78 216); font-weight: 600; border: 1px solid rgb(191 219 254); }
    `;

  return (
    <div
      className={`w-70 flex-shrink-0 h-full bg-white/80 backdrop-blur-sm shadow-xl border-r border-blue-100/50 p-6 flex flex-col fixed lg:relative z-20 ${className}`}
    >
      <style>{animationStyles}</style>

      {title && (
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
      )}

      <nav className="space-y-2 flex-1">
        {items.map((item) => {
          const isActive = item.path === location.pathname;

          return (
            <NavLink
              key={uuid()}
              to={item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${isActive ? 'active-tab' : 'text-gray-600 hover:bg-blue-50/50'}`}
            >
              <item.Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
