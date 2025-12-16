import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { isUserConnected } from '../modules/isUserConnected.jsx'; 

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const connected = await isUserConnected();
            setIsAuthenticated(connected);
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    if (isLoading) {
        return <div>Vérification de l'authentification...</div>; 
    }

    if (isAuthenticated === false) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default { ProtectedRoute };