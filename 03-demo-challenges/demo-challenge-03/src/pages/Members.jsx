import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Members() {
  const { user, logout, setSelectedMember } = useContext(AuthContext);
  const navigate = useNavigate();

  const [membersList] = useState([
    { id: 1, name: "Jessie Jaime", email: "jessiej@yahoo.com" },
    { id: 2, name: "Fred Signh", email: "fred.s@gmail.com" },
    { id: 3, name: "Damin Signh", email: "damin.s@gmail.com" },
    { id: 4, name: "Joe Doe", email: "joe.doe@outlook.com" },
    { id: 5, name: "Johnny Walker", email: "johnny.w@yahoo.com" }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleViewProfile = (member) => {
    if (setSelectedMember) {
      setSelectedMember(member);
    }
    navigate('/profile', { state: { member } });
  };

  return (
    <div className="members-container">
      <div className="top-bar">
        <span>Welcome, {user?.name || "Jessie"}!</span>
        <button onClick={handleLogout} className="link-btn">Log Out</button>
      </div>

      <h2>LinkedIn Members:</h2>

      <div className="members-box">
        {membersList.map((member) => (
          <div key={member.id} className="member-row">
            <span className="member-name">{member.name}</span>
            <button 
              onClick={() => handleViewProfile(member)} 
              className="wire-btn"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Members;