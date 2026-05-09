import React from 'react';
import { Star } from 'lucide-react';
import { SVG } from '@/constants/svg.js';

const HackerrankBadge = ({ stars, skillIcon, skillName, className = '' }) => {
  // Determine badge color based on stars count
  const getBadgeColor = (starCount) => {
    if (starCount <= 2) return '#FFB59B'; // 1-2 stars
    if (starCount <= 4) return '#D8E2E4'; // 3-4 stars
    return '#F9CE3E'; // 5-6 stars
  };

  const badgeColor = getBadgeColor(stars);

  return (
    <div className={`relative group w-24 h-28 flex items-center justify-center transition-all duration-500 hover:scale-110 ${className}`}>
      {/* Hexagon Background SVG */}
      <svg viewBox="0 0 91 100" className="absolute inset-0 w-full h-full drop-shadow-xl">
        <path d={SVG.HACKERRANK_BADGE} fill={badgeColor} className="transition-colors duration-500" />
      </svg>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-2">
        {/* Skill Icon */}
        {skillIcon && <img src={skillIcon} alt={skillName} className="w-8 h-8 object-contain mb-1 transition-transform group-hover:rotate-6" />}

        {/* Skill Name */}
        <span className="text-[9px] font-bold uppercase text-gray-800 text-center px-2 leading-tight tracking-tight">{skillName}</span>

        {/* Star Row */}
        <div className="flex gap-0.5 mt-1">
          {[...Array(stars)].map((_, i) => (
            <Star key={i} size={10} fill="#4a5568" stroke="none" className="drop-shadow-sm" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HackerrankBadge;
