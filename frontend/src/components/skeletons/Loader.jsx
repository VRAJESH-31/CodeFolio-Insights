const Loader = ({ text = "Loading ...", showLoading = false }) => {
    if (!showLoading) return null;

    return (
        <div className="fixed top-6 right-6 z-50 flex items-center p-3.5 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-100 animate-float-in-subtle">
            <div className="relative flex items-center justify-center mr-3">
                <div className="absolute w-6 h-6 rounded-full border-2 border-blue-400 opacity-75 animate-pulse-ring" />
                <div className="relative w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center shadow-md animate-pulse-dot" />
            </div>
            <p className="text-gray-700 text-xs font-black uppercase tracking-widest italic">
                {text}
            </p>
        </div>
    );
};

export default Loader;