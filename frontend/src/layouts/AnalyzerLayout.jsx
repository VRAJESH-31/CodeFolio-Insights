import { Outlet } from 'react-router-dom';
import { Code, Github, FileUser } from 'lucide-react';
import { TabNavigation } from '../components/export.js';
import { Sidebar } from '../components/sidebars/export.js';
import { usePreferenceStore } from '../store/export.js';

const AnalyzerLayout = () => {

    const { pageView } = usePreferenceStore();

    const navItems = [
        { name: 'LeetCode', path: '/analyzer/leetcode', Icon: Code },
        { name: 'GitHub', path: '/analyzer/github', Icon: Github },
        { name: 'Resume', path: '/analyzer/resume', Icon: FileUser },
    ];

    return (
        <div className={`flex-1 flex ${pageView["Analyzers"] === "tab" ? "flex-col" : "flex-row"} min-w-0 bg-white overflow-hidden h-screen`}>
            
            {pageView["Analyzers"] === "tab" ? <TabNavigation tabs={navItems} /> : <Sidebar title='Analyzers' items={navItems} />}

            <main className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-50/50">
                <div className="max-w-7xl h-full mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AnalyzerLayout;
