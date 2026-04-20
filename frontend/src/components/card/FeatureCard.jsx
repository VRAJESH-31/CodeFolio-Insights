import React from "react";
import { CheckCircle } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, items }) => {
    return (
        <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-indigo-600 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 group h-full flex flex-col transform hover:-translate-y-2 duration-500">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500">
                <Icon className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-3 uppercase tracking-tight">
                {title}
            </h3>
            <p className="text-slate-600 mb-6 flex-grow font-medium leading-relaxed">
                {description}
            </p>
            <ul className="space-y-3 text-xs font-bold text-slate-500">
                {items.map((item) => (
                    <li key={item} className="flex items-center space-x-3">
                        <CheckCircle className="text-indigo-600 w-4 h-4" />
                        <span className="uppercase tracking-widest">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeatureCard;
