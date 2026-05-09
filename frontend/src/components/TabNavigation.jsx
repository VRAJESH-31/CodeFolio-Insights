import React from 'react';
import { NavLink } from 'react-router-dom';

const TabNavigation = ({ tabs, className = "" }) => {
    return (
        <div className={`bg-white border-b border-gray-100 flex-shrink-0 px-16 ${className}`}>
            <div className="max-w-7xl mx-auto flex items-center gap-2 px-4 py-2 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => {
                    const Icon = tab.Icon;
                    return (
                        <NavLink
                            key={tab.path}
                            to={tab.path}
                            className={({ isActive }) => `
                                flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 relative group
                                ${isActive
                                    ? 'bg-blue-50 text-blue-600 font-bold'
                                    : 'text-slate-500 hover:bg-gray-50 hover:text-slate-900'}
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    {Icon && (
                                        <Icon
                                            size={18}
                                            className={isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}
                                        />
                                    )}
                                    <span className="text-sm tracking-tight">{tab.name}</span>

                                    {/* Premium indicator line */}
                                    {isActive && (
                                        <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-blue-600 rounded-full animate-in fade-in slide-in-from-bottom-1 duration-500" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
};

export default TabNavigation;
