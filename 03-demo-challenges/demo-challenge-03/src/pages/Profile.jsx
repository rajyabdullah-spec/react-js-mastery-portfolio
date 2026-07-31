import React, { useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Profile() {
  const { user, logout, selectedMember } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const member = location.state?.member || selectedMember || {
    name: "Jessie Jaime",
    email: "jessiej@yahoo.com"
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-wire-container">
      <div className="top-bar-right">
        <Link to="/members" className="link-btn">Back to Member List</Link>
        <button onClick={handleLogout} className="link-btn">Log Out</button>
      </div>

      <div className="welcome-text">
        <p>Welcome, {user?.name || "Jessie"}!</p>
      </div>

      <div className="profile-details">
        <p><strong>Name:</strong> {member.name}</p>
        <p><strong>Email:</strong> {member.email}</p>
      </div>

      <div className="bottom-link">
        <Link to="/members" className="link-btn">Back to Member List</Link>
      </div>
    </div>
  );
}

export default Profile;