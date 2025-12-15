import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

const HomeLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const location = useLocation();

    // Derive activeMenu from current path
    const getActiveMenu = () => {
        const path = location.pathname;
        if (path === '/dashboard' || path === '/home') return 'Dashboard';
        if (path === '/analyzer/leetcode') return 'LeetCode';
        if (path === '/analyzer/github') return 'GitHub';
        if (path === '/analyzer/resume-analyse') return 'Resume Analysis';
        return 'Dashboard';
    };

    return (
        <ProtectedRoute>
            <div className="flex h-screen bg-gradient-to-br from-green-50/30 via-white to-blue-50/30 font-sans">
                <Sidebar
                    isSidebarCollapsed={isSidebarCollapsed}
                    activeMenu={getActiveMenu()}
                    setActiveMenu={setIsSidebarCollapsed}
                />
                <Outlet />
            </div>
        </ProtectedRoute>
    );
};

export default HomeLayout;
