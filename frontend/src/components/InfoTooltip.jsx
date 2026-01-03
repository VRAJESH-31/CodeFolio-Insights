import { Info } from 'lucide-react';

const InfoTooltip = ({ text, direction = 'right' }) => {
    const directions = {
        up: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        down: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    };

    const arrows = {
        up: 'bottom-[-4px] left-1/2 -translate-x-1/2 rotate-45',
        down: 'top-[-4px] left-1/2 -translate-x-1/2 rotate-45',
        left: 'right-[-4px] top-1/2 -translate-y-1/2 rotate-45',
        right: 'left-[-4px] top-1/2 -translate-y-1/2 rotate-45'
    };

    return (
        <div className="group relative flex items-center">
            <Info className="w-4 h-4 text-slate-400 cursor-help" />
            <div className={`absolute ${directions[direction]} px-3 py-1.5 bg-slate-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap shadow-lg`}>
                {text}
                <div className={`absolute w-2 h-2 bg-slate-800 ${arrows[direction]}`}></div>
            </div>
        </div>
    );
};

export default InfoTooltip;
