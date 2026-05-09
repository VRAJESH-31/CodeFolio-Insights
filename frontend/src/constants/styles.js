export const LOADER_ANIMATION_STYLE = `
  @keyframes slide-progress {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(400%); }
  }
  .animate-progress-slide {
      animation: slide-progress 2s infinite ease-in-out;
  }
`;

export const SETTINGS_ANIMATION_STYLE = `
  @keyframes floatIn { 
      0% { opacity: 0; transform: translateY(20px) scale(0.95); } 
      100% { opacity: 1; transform: translateY(0) scale(1); } 
  }
  .animate-float-in { 
      animation: floatIn 0.6s ease-out forwards; 
  }
`;

export const SIDEBAR_ANIMATION_STYLE = `
  @keyframes glowPulse { 
      0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.2); } 
      50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.4); } 
  }
  .animate-glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
  .active-tab { background-color: rgb(239 246 255); color: rgb(29 78 216); font-weight: 600; border: 1px solid rgb(191 219 254); }
`;
