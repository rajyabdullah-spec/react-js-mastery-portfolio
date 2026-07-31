import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('linkedin_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [selectedMember, setSelectedMember] = useState(null);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('linkedin_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setSelectedMember(null);
    localStorage.removeItem('linkedin_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, selectedMember, setSelectedMember }}>
      {children}
    </AuthContext.Provider>
  );
};