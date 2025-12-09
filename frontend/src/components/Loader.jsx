const Loader = () => {
    return (
        // Positioned top right, high z-index, small shadow for visibility
        <div className="fixed top-6 right-6 z-50 flex items-center p-3 bg-white rounded-lg shadow-2xl border border-blue-100 animate-float-in-subtle">
            <style>
                {`
                    @keyframes pulse-ring {
                        0% { transform: scale(0.33); }
                        80%, 100% { opacity: 0; }
                    }
                    @keyframes pulse-dot {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.1); }
                        100% { transform: scale(1); }
                    }
                    @keyframes floatInSubtle {
                        0% { opacity: 0; transform: translateY(-20px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                    .animate-float-in-subtle { animation: floatInSubtle 0.3s ease-out forwards; }
                `}
            </style>
            
            <div className="relative flex items-center justify-center mr-3">
                {/* Pulsing ring effect */}
                <div className="absolute w-6 h-6 rounded-full border-2 border-blue-400 opacity-75"
                     style={{ animation: 'pulse-ring 2s cubic-bezier(0, 0.2, 0.8, 1) infinite' }}>
                </div>
                
                {/* Main dot/icon */}
                <div className="relative w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center shadow-md"
                     style={{ animation: 'pulse-dot 1.5s ease-in-out infinite' }}>
                </div>
            </div>

            <p className="text-gray-700 text-sm font-medium">
                Fetching latest coding stats...
            </p>
        </div>
    );
};

export default Loader;