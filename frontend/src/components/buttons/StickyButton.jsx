const StickyButton = ({ onClick, label = '', labelClassName = '', icon: Icon = null, iconClassName = '', className = '', positionClassName = 'sticky bottom-4 w-full flex justify-center z-50' }) => {
  return (
    <div className={`pointer-events-none ${positionClassName}`}>
      <button onClick={onClick} className={`pointer-events-auto flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group ${className}`}>
        <Icon className={`group-hover:scale-110 transition-transform shrink-0 ${iconClassName}`} />
        <span className={`${labelClassName}`}>{label}</span>
      </button>
    </div>
  );
};

export default StickyButton;
