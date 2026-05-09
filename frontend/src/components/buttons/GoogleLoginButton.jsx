import conf from '@/config/config.js';
import { SVG } from '@/constants/svg.js';

const GoogleLoginButton = () => {
  return (
    <button onClick={() => (window.location.href = `${conf.SERVER_BASE_URL}/api/auth/google`)} className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white hover:bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-bold text-slate-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg shadow-sm group">
      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
        <path fill="currentColor" d={SVG.GOOGLE_LOGO} />
      </svg>
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;
