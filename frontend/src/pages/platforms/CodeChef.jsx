import React from 'react';
import { useOutletContext } from 'react-router-dom';

const CodeChef = () => {
    const { data } = useOutletContext();
    return (
        <div className="p-4 bg-white rounded-xl shadow-sm animate-float-in">
            <h2 className="text-2xl font-bold text-slate-800">CodeChef Platform</h2>
            <p className="text-slate-500">Data available: {data ? 'Yes' : 'No'}</p>
        </div>
    );
};

export default CodeChef;
