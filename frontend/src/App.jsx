import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ResumeAnalyse from './pages/ResumeAnalyse.jsx';
import LeetCode from './pages/Leetcode.jsx';
import GitHub from './pages/Github.jsx';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/resume-analyse" element={<ResumeAnalyse isSidebarCollapsed={false} />} />
            <Route path="/leetcode" element={<LeetCode isSidebarCollapsed={false} />} />
            <Route path="/Github" element={<GitHub isSidebarCollapsed={false} />} />
        </Routes>
    )
}

export default App