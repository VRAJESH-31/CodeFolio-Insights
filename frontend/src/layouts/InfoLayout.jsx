import { InfoTooltip } from '@/components/export.js';

const placements = {
    'top-left':     'items-start justify-start',
    'top-right':    'items-start justify-end',
    'bottom-left':  'items-end justify-start',
    'bottom-right': 'items-end justify-end',
    'top-center':   'items-start justify-center',
    'bottom-center':'items-end justify-center',
};

const InfoLayout = ({ children, placement = 'top-right', text, direction = 'right', className='' }) => {
    return (
        <div className={`relative w-full ${className}`}>
            {children}
            <div className={`absolute inset-0 flex pointer-events-none ${placements[placement]}`}>
                <div className="pointer-events-auto p-2">
                    <InfoTooltip text={text} direction={direction} />
                </div>
            </div>
        </div>
    );
};

export default InfoLayout;