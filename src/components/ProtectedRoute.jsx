import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { isUserConnected } from '../modules/isUserConnected.jsx'; 

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const connected = await isUserConnected();
                setIsAuthenticated(connected);
            } 
            
            catch (error) {
                console.error("Erreur lors de la vérification de l'authentification:", error);
                setIsAuthenticated(false);
            } 
            
            finally {
                setIsLoading(false);
            }
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

export default ProtectedRoute;