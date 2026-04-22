import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Ghost } from 'lucide-react';
import { useAuthStore } from '../store/export.js';

const PageNotFound = () => {
    const user = useAuthStore((state) => state.user);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12 overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[120px] animate-pulse delay-700"></div>
            </div>

            <div className="max-w-3xl w-full text-center relative z-10">
                {/* 404 Visual */}
                <div className="relative inline-block mb-8">
                    <h1 className="text-[12rem] md:text-[18rem] font-black text-slate-100/80 leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Ghost size={120} className="text-blue-500 animate-bounce" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                        Lost in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Cyberspace?</span>
                    </h2>
                    <p className="text-slate-500 text-lg md:text-xl max-w-lg mx-auto font-medium">
                        The page you're looking for has vanished into thin air. Even our AI couldn't track this one down.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                        <Link
                            to={user ? `/dashboard/${user.displayName}` : "/"}
                            className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                        >
                            <Home size={20} />
                            <span>{user ? "Return Dashboard" : "Go to Home"}</span>
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="group flex items-center gap-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold py-4 px-8 rounded-2xl shadow-sm transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span>{user ? "Go Back" : "Go to Home"}</span>
                        </button>
                    </div>
                </div>

                {/* Footer Insight */}
                <div className="mt-16 text-slate-400 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    <div className="w-8 h-[1px] bg-slate-200"></div>
                    <span>CodeFolio Error Log #404</span>
                    <div className="w-8 h-[1px] bg-slate-200"></div>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;
