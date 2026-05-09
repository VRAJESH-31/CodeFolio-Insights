import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/export.js';
import { Lock, ArrowRight } from 'lucide-react';

const ProtectedLayout = ({ children, requiresAuthentication = true }) => {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    if (requiresAuthentication && !user) {
        return (
            <div className="flex-1 flex items-center justify-center h-full p-6">
                <div className="max-w-md w-full bg-white/80 backdrop-blur-xl border border-indigo-100 rounded-3xl p-10 shadow-2xl shadow-indigo-500/5 text-center space-y-8 animate-float-in">
                    <div className="mx-auto w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 border border-indigo-100 transform hover:scale-110 transition-transform duration-500">
                        <Lock className="w-10 h-10 text-indigo-500" />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Login Required</h2>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            You need to be logged in to access this service. Join our community to unlock full potential.
                        </p>
                    </div>

                    <div className="pt-4">
                        <button
                            onClick={() => navigate('/auth/login')}
                            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-black px-8 py-4 rounded-2xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all transform uppercase tracking-widest text-xs"
                        >
                            Sign In to Access
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        );
    } else if (!requiresAuthentication && user) {
        return <Navigate to={`/dashboard/${user.displayName}`} replace />;
    } else {
        return children;
    }
};

export default ProtectedLayout;
