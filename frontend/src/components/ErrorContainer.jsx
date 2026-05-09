import React from 'react';
import { AlertCircle, RefreshCw, ArrowLeft, LifeBuoy } from 'lucide-react';
import conf from '@/config/config.js';

const ErrorContainer = ({ error, onRetry, onBack, isLoading, errorAdditionalHelp = [] }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 animate-float-in relative w-full group">
      {/* Background Decorative Glows - Provide depth and modern aesthetic */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-all duration-1000"></div>
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] group-hover:bg-indigo-500/20 transition-all duration-1000"></div>

      {/* Main Glassmorphism Card */}
      <div className="relative bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-500 hover:border-blue-200/50 max-w-xl w-full">
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Layered Animated Icon - High visual impact */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl animate-pulse"></div>
            <div className="relative w-16 h-16 bg-white rounded-2xl shadow-lg border border-blue-50/50 flex items-center justify-center transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 ease-out">
              <AlertCircle className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          {/* Typography Section - Clear hierarchy */}
          <div className="text-center space-y-3 mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight uppercase">
              Something went <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">unexpected.</span>
            </h3>
            <p className="text-slate-500 font-medium text-sm md:text-base max-w-sm mx-auto leading-relaxed">{typeof error === 'string' && conf.ENV === 'development' ? error : 'We encountered a temporary issue while processing your request. Please try again.'}</p>
          </div>

          {/* Troubleshooting Section - Modern "Card-in-Card" layout */}
          {errorAdditionalHelp && errorAdditionalHelp.length > 0 && (
            <div className="w-full bg-slate-50/50 rounded-2xl p-6 border border-slate-100/50 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <LifeBuoy className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Recovery Steps</span>
              </div>
              <div className="grid gap-4">
                {errorAdditionalHelp.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start group/step">
                    <div className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-[10px] font-black text-slate-400 group-hover/step:border-blue-400 group-hover/step:text-blue-500 transition-colors duration-300">{i + 1}</div>
                    <p className="text-xs text-slate-600 font-medium pt-0.5 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons - Distinct primary/secondary styles */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
            <button onClick={onBack} className="w-full sm:w-auto px-8 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 font-black text-[11px] uppercase tracking-[0.12em] rounded-xl transition-all hover:shadow-md active:scale-95 flex items-center justify-center gap-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Go Back</span>
            </button>

            <button onClick={onRetry} disabled={isLoading} className="w-full sm:w-auto px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-[11px] uppercase tracking-[0.12em] rounded-xl transition-all shadow-xl shadow-slate-900/20 hover:shadow-slate-900/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
              <span>{isLoading ? 'Retrying...' : 'Try Again'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorContainer;
