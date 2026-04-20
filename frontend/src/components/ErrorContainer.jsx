import { AlertCircle, RefreshCw } from "lucide-react";

const ErrorContainer = ({ error, onRetry, onBack, isLoading, errorAdditionalHelp = [] }) => {
    return (
        <div className="w-full flex items-center justify-center py-6">
            <div className="bg-white p-8 md:p-14 text-center rounded-[2.5rem] border border-blue-100 shadow-xl shadow-blue-500/5 w-full relative overflow-hidden group hover:border-blue-200 transition-all duration-500">
                {/* Background accents */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500"></div>
                <div className="absolute -right-32 -top-32 w-96 h-96 bg-blue-50 rounded-full blur-[80px] opacity-60 pointer-events-none group-hover:bg-blue-100 transition-colors duration-700"></div>
                <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-indigo-50 rounded-full blur-[80px] opacity-60 pointer-events-none group-hover:bg-indigo-100 transition-colors duration-700"></div>

                <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto">
                    <div className="w-24 h-24 bg-blue-50 rounded-[2rem] border border-blue-100 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                        <AlertCircle className="w-10 h-10 text-blue-500" />
                    </div>

                    <h3 className="text-3xl md:text-4xl font-black text-slate-800 mb-4 tracking-tight">Oops! Something went wrong</h3>
                    <p className="text-slate-500 text-[15px] max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        {typeof error === 'string' 
                            ? error 
                            : "We encountered an unexpected error while trying to process your request. This might be due to API limitations or server issues."}
                    </p>

                    {errorAdditionalHelp && errorAdditionalHelp.length > 0 && (
                        <div className="bg-slate-50 rounded-[2rem] p-8 md:p-10 border border-slate-100 w-full text-left mb-10">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Troubleshooting Steps</h4>
                            <ul className="space-y-4">
                                {errorAdditionalHelp.map((point, i) => (
                                    <li key={i} className="flex items-start text-slate-600 font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 mr-4 shrink-0 shadow-sm shadow-blue-200"></div>
                                        <span className="leading-relaxed">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-4">
                        <button
                            onClick={onBack}
                            className="w-full sm:w-auto px-10 py-4 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800 font-black text-xs uppercase tracking-[0.15em] rounded-full transition-all flex items-center justify-center space-x-3 shadow-md hover:-translate-y-1 hover:shadow-lg disabled:opacity-50"
                        >
                            <span>Go Back</span>
                        </button>
                        
                        <button
                            onClick={onRetry} 
                            disabled={isLoading}
                            className="w-full sm:w-auto px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-[0.15em] rounded-full transition-all flex items-center justify-center space-x-3 shadow-xl shadow-slate-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                        >
                            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : 'group-hover/btn:rotate-180 transition-transform duration-500'}`} />
                            <span>{isLoading ? 'Retrying...' : 'Try Again'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorContainer;