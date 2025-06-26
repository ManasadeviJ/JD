import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext(null);


const getInitialUsers = () => {
    try {
        const savedUsers = localStorage.getItem('adminUsers');
        if (savedUsers) {
            return JSON.parse(savedUsers);
        }
    } catch (error) { console.error("Could not parse users from localStorage", error); }
   
    return [{
        id: uuidv4(),
        email: (import.meta.env.VITE_ADMIN_EMAIL || 'admin@example.com').toLowerCase(),
        password: import.meta.env.VITE_ADMIN_PASSWORD || 'password'
    }];
};

export const AuthProvider = ({ children }) => {
    const [users, setUsers] = useState(getInitialUsers);
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('currentUser');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch { return null; }
    });

    useEffect(() => {
        localStorage.setItem('adminUsers', JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [currentUser]);

    const login = (email, password) => {
        const userToLogin = users.find(
            user => user.email === email.toLowerCase() && user.password === password
        );
        if (userToLogin) {
            setCurrentUser(userToLogin);
            return true;
        }
        return false;
    };

    const signup = (email, password) => {
        const emailExists = users.some(user => user.email === email.toLowerCase());
        if (emailExists) {
            return { success: false, message: 'An account with this email already exists.' };
        }
        const newUser = { id: uuidv4(), email: email.toLowerCase(), password };
        setUsers(prevUsers => [...prevUsers, newUser]);
        setCurrentUser(newUser); 
        return { success: true };
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const value = { isAuthenticated: !!currentUser, login, signup, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);