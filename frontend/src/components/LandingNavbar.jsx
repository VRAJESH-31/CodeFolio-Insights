import { Link } from 'react-router-dom';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/export.js';
import { useLogout } from '../hooks/useUsers.js';
import { LOGO_URL, LANDING_PAGE_NAVBAR_ITEMS } from '../constants/index.js';

const LandingNavbar = () => {
  const { user } = useAuthStore();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full px-4 py-4 pointer-events-none">
      <nav className="container mx-auto flex justify-between items-center py-4 bg-white/80 backdrop-blur-md rounded-2xl px-6 shadow-lg border border-white/60 pointer-events-auto">
        <div className="flex items-center space-x-2 cursor-pointer">
          {/* <BarChart2 className="text-3xl text-indigo-600" /> */}
          <img src={LOGO_URL} alt="Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800">
            CodeFolio
          </h1>
        </div>
        <div className="hidden md:flex items-center space-x-8 font-black text-xs uppercase tracking-widest text-slate-500">
          {LANDING_PAGE_NAVBAR_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-indigo-600 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link to="/auth/login">
                <button className="px-6 py-2 rounded-full border-2 border-indigo-100 font-bold text-sm hover:bg-indigo-50 transition-all transform hover:scale-105 text-indigo-600">
                  Login
                </button>
              </Link>
              <Link to="/auth/signup">
                <button className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-indigo-200">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to={`/dashboard/${user.displayName}`}>
                <button className="flex items-center space-x-2 px-6 py-2 rounded-full border-2 border-indigo-100 font-bold text-sm hover:bg-indigo-50 transition-all transform hover:scale-105 text-indigo-600">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
              </Link>
              <button
                onClick={() => logout()}
                disabled={isLoggingOut}
                className="flex items-center space-x-2 px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold text-sm hover:from-red-600 hover:to-rose-700 transition-all transform hover:scale-105 shadow-lg shadow-red-200 disabled:opacity-50"
              >
                <LogOut className="w-4 h-4" />
                <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default LandingNavbar;
