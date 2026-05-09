import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ name, role, avatar, quote, rating }) => {
  return (
    <div className="w-[350px] md:w-[480px] shrink-0 bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200 hover:-translate-y-1 transition-all flex flex-col justify-between whitespace-normal">
      <div>
        <div className="flex gap-1 text-amber-400 mb-6">
          {[...Array(rating || 0)].map((_, rIdx) => (
            <Star key={rIdx} className="w-4 h-4 fill-current" />
          ))}
        </div>
        <p className="text-slate-700 font-medium leading-relaxed mb-8 italic">&quot;{quote}&quot;</p>
      </div>
      <div className="flex items-center gap-4 mt-auto">
        <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover shadow-sm border-2 border-white" />
        <div>
          <h4 className="font-bold text-slate-800">{name}</h4>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
