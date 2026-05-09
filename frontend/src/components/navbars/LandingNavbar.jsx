import { Link } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '@/store/export.js';
import { LANDING_PAGE_NAVBAR_ITEMS } from '@/constants/landing.js';
import { URL } from '@/constants/url.js';

const LandingNavbar = () => {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100/50 flex-shrink-0 shadow-md shadow-gray-300">
      <nav className="h-20 flex justify-between items-center px-8 md:px-12">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3 cursor-pointer group">
            <img src={URL.APPLICATION_LOGO} alt="Logo" className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
            <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800 tracking-tight">CodeFolio</h1>
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-10 font-black text-[11px] uppercase tracking-[0.2em] text-slate-400">
          {LANDING_PAGE_NAVBAR_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className="hover:text-indigo-600 transition-colors relative group">
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/auth/login">
                <button className="px-6 py-2.5 rounded-xl font-bold text-sm text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-all">Sign In</button>
              </Link>
              <Link to="/auth/signup">
                <button className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">Join Free</button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to={`/dashboard/${user.displayName}`}>
                <button className="flex items-center space-x-2 px-6 py-2.5 rounded-xl border border-slate-200 font-bold text-sm text-slate-600 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default LandingNavbar;
