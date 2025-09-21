import React from 'react';

const HomePage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Welcome to CodeFolio Insights</h1>
                <p className="mt-4 text-lg text-gray-300">You have successfully logged in!</p>
                {/* You can build your dashboard content here */}
            </div>
        </div>
    );
};

export default HomePage;