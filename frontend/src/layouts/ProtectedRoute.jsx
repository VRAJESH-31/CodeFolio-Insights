import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore.js';

const ProtectedRoute = ({ children, requiresAuthentication = true }) => {
    const { user } = useAuthStore();

    if (requiresAuthentication && !user) {
        return <Navigate to="/login" replace />;
    } else if (!requiresAuthentication && user) {
        return <Navigate to="/dashboard" replace />;
    } else {
        return children;
    }
};

export default ProtectedRoute;
