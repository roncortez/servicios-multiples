import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decoded = jwtDecode(token);

                setUser({
                    id: decoded.id,
                    user: decoded.user,
                    role: decoded.role
                });

            } catch (error) {
                localStorage.removeItem('authToken');
            }
        }
    }, []); 

    const login = (user) => {
        setUser(user); // Actualiza el usuario en el contexto
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ login, user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;