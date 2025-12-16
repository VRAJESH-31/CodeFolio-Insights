import React from 'react';

const RepoTable = ({ githubData }) => {
    const repositories = githubData?.userReposStat?.map(repo => ({
        name: repo.name,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        lastCommit: new Date(repo.updated_at).toLocaleDateString(),
        url: repo.html_url
    })) || [];

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100/30 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden animate-float-in" style={{ animationDelay: '400ms' }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-blue-100/30 p-5 lg:p-6">
                <div className="mb-4 sm:mb-0">
                    <h2 className="text-xl lg:text-2xl font-black text-gray-800">Top Repositories</h2>
                    <p className="text-sm text-gray-500 mt-1">Most active GitHub repositories</p>
                </div>
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2.5 px-5 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm lg:text-base">
                    View All Repositories
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                            {['Repository', 'Stars', 'Forks', 'Last Commit', 'Status'].map((header) => (
                                <th key={header} className="px-4 lg:px-6 py-3 lg:py-4 font-black text-xs lg:text-sm">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-100/30">
                        {repositories.map((repo) => (
                            <tr
                                key={repo.name}
                                className="hover:bg-blue-50/30 transition-all duration-300 group"
                            >
                                <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl flex items-center justify-center mr-3 lg:mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <i className="fab fa-github text-sm lg:text-lg"></i>
                                        </div>
                                        <div>
                                            <a href={repo.url} target="_blank" rel="noopener noreferrer" className="font-bold text-gray-800 text-sm lg:text-base hover:text-blue-600 transition-colors">{repo.name}</a>
                                            <p className="text-xs text-gray-500 mt-0.5">Updated {repo.lastCommit}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <i className="fa-solid fa-star text-amber-500 mr-2 text-sm"></i>
                                        <span className="font-semibold text-gray-800 text-sm lg:text-base">{repo.stars}</span>
                                    </div>
                                </td>
                                <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <i className="fa-solid fa-code-fork text-blue-500 mr-2 text-sm"></i>
                                        <span className="font-semibold text-gray-800 text-sm lg:text-base">{repo.forks}</span>
                                    </div>
                                </td>
                                <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                                    <span className="text-xs lg:text-sm font-medium text-gray-600 bg-gray-100/80 py-1.5 px-3 rounded-full">
                                        {repo.lastCommit}
                                    </span>
                                </td>
                                <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                                        Active
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RepoTable;
