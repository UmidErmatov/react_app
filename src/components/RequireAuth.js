import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const isAuth = useSelector(state => state.auth.isAuth)
    const location = useLocation()
    return (
        isAuth
            ? children
            : <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
