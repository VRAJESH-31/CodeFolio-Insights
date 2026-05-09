import { LOADER_ANIMATION_STYLE } from '@/constants/styles.js';

const LoaderLabel = ({ text = 'Loading ...', showLoading = false, className = '' }) => {
  if (!showLoading) return null;

  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center py-2.5 px-5 bg-blue-100/90 backdrop-blur-md rounded-lg shadow-2xl border border-2 border-blue-200 overflow-hidden ${className}`}>
      <style>{LOADER_ANIMATION_STYLE}</style>

      {/* Text Section */}
      <p className="text-gray-700 text-[15px] font-black uppercase tracking-[0.2em] italic pr-2">{text}</p>

      {/* Sliding Green Bar Container */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-100/30">
        <div className="animate-progress-slide h-full w-1/4 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]" />
      </div>
    </div>
  );
};

export default LoaderLabel;
