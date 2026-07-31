import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Members from './pages/Members';
import Profile from './pages/Profile';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="app-main-frame">
      <Routes>
        {/* Main landing page with Register and Login forms */}
        <Route 
          path="/" 
          element={user ? <Navigate to="/members" replace /> : <Home />} 
        />
        
        {/* Members list view */}
        <Route 
          path="/members" 
          element={
            <ProtectedRoute>
              <Members />
            </ProtectedRoute>
          } 
        />
        
        {/* Member profile detail view */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />

        {/* Fallback route redirection */}
        <Route path="*" element={<Navigate to={user ? "/members" : "/"} replace />} />
      </Routes>
    </div>
  );
}

export default App;