import { useAuthStore } from './store/export.js';
import { useCheckAuth } from './hooks/useUsers.js';
import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Landing, CodingProfiles, PageNotFound, ContactUs } from './pages/export.js';
import { LoginPage, SignupPage } from './pages/auth/export.js';
import { HomeLayout, DashboardLayout, AnalyzerLayout, PublicApisLayout, ProtectedLayout, SettingsLayout } from "./layouts/export.js";
import { LeetCode, GFG, Code360, Interviewbit, CodeChef, HackerRank, Github } from './pages/platforms/export.js';
import { LeetcodeAnalyze, GithubAnalyze, ResumeAnalyze } from './pages/analyze/export.js';
import { ApiDocumentation, ApiProjects, ApiFaq } from './pages/public-apis/export.js';
import { AppearanceSettings, ProfileSettings, LinkSettings, AccountSettings } from './pages/settings/export.js';

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
            <Route path="/auth/login" element={
                <ProtectedLayout requiresAuthentication={false}>
                    <LoginPage />
                </ProtectedLayout>
            } />
            <Route path="/auth/signup" element={
                <ProtectedLayout requiresAuthentication={false}>
                    <SignupPage />
                </ProtectedLayout>
            } />
            <Route path="/" element={<HomeLayout />}>
                <Route path="dashboard/:displayName" element={<DashboardLayout />}>
                    <Route index element={<Navigate to="coding-profiles" replace />} />
                    <Route path="coding-profiles">
                        <Route index element={<CodingProfiles />} />
                        <Route path="leetcode" element={<LeetCode />} />
                        <Route path="gfg" element={<GFG />} />
                        <Route path="code360" element={<Code360 />} />
                        <Route path="interviewbit" element={<Interviewbit />} />
                        <Route path="codechef" element={<CodeChef />} />
                        <Route path="hackerrank" element={<HackerRank />} />
                    </Route>
                    <Route path="github" element={<Github />} />
                </Route>
                <Route path="analyzer" element={<AnalyzerLayout />}>
                    <Route index element={<Navigate to="leetcode" replace />} />
                    <Route path="leetcode" element={<LeetcodeAnalyze />} />
                    <Route path="github" element={<GithubAnalyze />} />
                    <Route path="resume" element={<ResumeAnalyze />} />
                </Route>
                <Route path="public-apis" element={<PublicApisLayout />}>
                    <Route index element={<Navigate to="documentation" replace />} />
                    <Route path="documentation" element={
                        <ApiDocumentation />}
                    />
                    <Route path="projects" element={
                        <ProtectedLayout requiresAuthentication={true}>
                            <ApiProjects />
                        </ProtectedLayout>
                    } />
                    <Route path="faq" element={<ApiFaq />} />
                </Route>
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="settings" element={<SettingsLayout />}>
                    <Route index element={<Navigate to="profile" replace />} />
                    <Route path="profile" element={
                        <ProtectedLayout requiresAuthentication={true}>
                            <ProfileSettings />
                        </ProtectedLayout>
                    } />
                    <Route path="appearance" element={<AppearanceSettings />} />
                    <Route path="account" element={
                        <ProtectedLayout requiresAuthentication={true}>
                            <AccountSettings />
                        </ProtectedLayout>
                    } />
                    <Route path="links" element={
                        <ProtectedLayout requiresAuthentication={true}>
                            <LinkSettings />
                        </ProtectedLayout>
                    } />
                </Route>
            </Route>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default App