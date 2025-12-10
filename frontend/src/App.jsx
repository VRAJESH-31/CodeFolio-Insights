import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ResumeAnalyse from './pages/ResumeAnalyse.jsx';
import LeetCode from './pages/Leetcode.jsx';
import GitHub from './pages/Github.jsx';
import LinkPage from './pages/LinkPage.jsx';
import GFG from './pages/GFG.jsx';
import useAuthStore from '../store/useAuthStore.js';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => {

    const checkAuth = useAuthStore((state) => state.checkAuth);

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/resume-analyse" element={<ProtectedRoute><ResumeAnalyse isSidebarCollapsed={false} /></ProtectedRoute>} />
            <Route path="/leetcode" element={<ProtectedRoute><LeetCode isSidebarCollapsed={false} /></ProtectedRoute>} />
            <Route path="/Github" element={<ProtectedRoute><GitHub isSidebarCollapsed={false} /></ProtectedRoute>} />
            <Route path="/link" element={<ProtectedRoute><LinkPage /></ProtectedRoute>} />
            <Route path="/gfg" element={<ProtectedRoute><GFG isSidebarCollapsed={false} /></ProtectedRoute>} />
        </Routes>
    )
}

export default App