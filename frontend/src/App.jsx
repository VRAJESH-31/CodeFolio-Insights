import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ResumeAnalyse from './pages/ResumeAnalyse.jsx';
import LeetCode from './pages/Leetcode.jsx';
import GitHub from './pages/Github.jsx';
import LinkPage from './pages/LinkPage.jsx';
import useAuthStore from '../store/useAuthStore.js';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import HomeLayout from './layouts/HomeLayout.jsx';

const App = () => {

    const checkAuth = useAuthStore((state) => state.checkAuth);

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Dashboard Route (with Sidebar) */}
            <Route element={<HomeLayout />}>
                <Route path="/dashboard" element={<HomePage />} />
            </Route>

            {/* Analyzer Routes (with Sidebar) */}
            <Route path="/analyzer" element={<HomeLayout />}>
                <Route path="leetcode" element={<LeetCode />} />
                <Route path="github" element={<GitHub />} />
                <Route path="resume-analyse" element={<ResumeAnalyse />} />
            </Route>

            {/* Other Protected Routes (without Sidebar layout) */}
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/link" element={<ProtectedRoute><LinkPage /></ProtectedRoute>} />

            {/* Redirect /home to /dashboard */}
            <Route path="/home" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    )
}

export default App