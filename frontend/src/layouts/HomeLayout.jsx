import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar, ProtectedRoute } from '../components/export.js';

const HomeLayout = () => {
    const location = useLocation();

    const getActiveMenu = () => {
        const path = location.pathname;
        if (path === '/dashboard' || path === '/home') return 'Dashboard';
        if (path === '/analyzer/leetcode') return 'LeetCode';
        if (path === '/analyzer/github') return 'GitHub';
        if (path === '/analyzer/resume') return 'Resume Analysis';
        return 'Dashboard';
    };

    return (
        <ProtectedRoute requiresAuthentication={true}>
            <div className="flex h-screen bg-gradient-to-br from-green-50/30 via-white to-blue-50/30 font-sans">
                <Sidebar
                    activeMenu={getActiveMenu()}
                />
                <Outlet />
            </div>
        </ProtectedRoute>
    );
};

export default HomeLayout;
