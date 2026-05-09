import { LayoutDashboard, Search, Webhook, Trophy } from 'lucide-react';

const AuthVisualSide = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden items-center justify-center p-12">
      {/* Background Gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/4 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-[80px] transform -translate-x-1/3 translate-y-1/4" />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Content Card */}
      <div className="relative z-10 w-full h-full space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-3 leading-tight">
            Unlock your true <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">developer potential.</span>
          </h2>
          <p className="text-slate-400 text-lg">Join CodeFolio and track your coding journey and showcase your skills to the world.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4 lg:p-5 shadow-2xl transform transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3 text-blue-400">
              <LayoutDashboard size={18} />
            </div>
            <h3 className="text-white font-bold mb-1">Centralized Dashboard</h3>
            <p className="text-slate-400 text-xs leading-relaxed">Monitor all your coding metrics in one unified space.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4 lg:p-5 shadow-2xl transform transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center mb-3 text-amber-400">
              <Search size={18} />
            </div>
            <h3 className="text-white font-bold mb-1">Analyzers</h3>
            <p className="text-slate-400 text-xs leading-relaxed">Deep insights into your GitHub and LeetCode performance.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4 lg:p-5 shadow-2xl transform transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center mb-3 text-purple-400">
              <Webhook size={18} />
            </div>
            <h3 className="text-white font-bold mb-1">Public APIs</h3>
            <p className="text-slate-400 text-xs leading-relaxed">Integrate your profile data anywhere with developer APIs.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4 lg:p-5 shadow-2xl transform transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3 text-emerald-400">
              <Trophy size={18} />
            </div>
            <h3 className="text-white font-bold mb-1">Leaderboards</h3>
            <p className="text-slate-400 text-xs leading-relaxed">See where you stand among the global community.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthVisualSide;
