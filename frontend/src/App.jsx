import { useAuthStore } from './store/export.js';
import { useCheckAuth } from './hooks/useUsers.js';
import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Landing, LoginPage, SignupPage, CodingProfiles, ProfilePage, LinkPage, PageNotFound } from './pages/export.js';
import { HomeLayout, DashboardLayout } from "./layouts/export.js";
import { LeetCode, GFG, Code360, Interviewbit, CodeChef, HackerRank, Github } from './pages/platforms/export.js';
import { LeetcodeAnalyse, GithubAnalyse, ResumeAnalyse } from './pages/analyse/export.js';
import { ProtectedRoute } from './components/export.js';

const App = () => {
    const { data, isSuccess } = useCheckAuth();

    useEffect(() => {
        if (isSuccess && data) {
            useAuthStore.setState({ user: data.user, token: data.token });
        }
    }, [isSuccess, data]);

    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="/" element={<HomeLayout />}>
                <Route path="dashboard" element={<DashboardLayout />}>
                    <Route index element={<Navigate to="coding-profiles" replace />} />
                    <Route path="coding-profiles" element={<CodingProfiles />}>
                        <Route path="leetcode" element={<LeetCode />} />
                        <Route path="gfg" element={<GFG />} />
                        <Route path="code360" element={<Code360 />} />
                        <Route path="interviewbit" element={<Interviewbit />} />
                        <Route path="codechef" element={<CodeChef />} />
                        <Route path="hackerrank" element={<HackerRank />} />
                    </Route>
                    <Route path="github" element={<Github />} />
                </Route>
                <Route path="analyzer">
                    <Route index element={<Navigate to="leetcode" replace />} />
                    <Route path="leetcode" element={<LeetcodeAnalyse />} />
                    <Route path="github" element={<GithubAnalyse />} />
                    <Route path="resume" element={<ResumeAnalyse />} />
                </Route>
            </Route>

            <Route
                path="/profile"
                element={
                    <ProtectedRoute requiresAuthentication={true}>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/link"
                element={
                    <ProtectedRoute requiresAuthentication={true}>
                        <LinkPage />
                    </ProtectedRoute>
                }
            />
            <Route path="/home" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default App