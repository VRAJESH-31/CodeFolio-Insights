import React from 'react';
import { Globe, ChevronRight } from 'lucide-react';

const ApiDocumentationSidebar = ({ documentationData, currentCategory, currentTitle, onSelect }) => {
  return (
    <aside className="w-72 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100/50 p-4 flex flex-col gap-4">
      <div className="px-2 py-1">
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          Platforms
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
        {documentationData.map((category) => (
          <div key={category.category} className="space-y-2">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3">{category.category}</h3>
            <ul className="space-y-1">
              {category.endpoints.map((ep) => {
                const isActive = currentCategory === category.category && currentTitle === ep.title;
                return (
                  <li key={ep.title} onClick={() => onSelect(category.category, ep.title)} className={`group cursor-pointer px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 translate-x-1' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'}`}>
                    {ep.title}
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default ApiDocumentationSidebar;
