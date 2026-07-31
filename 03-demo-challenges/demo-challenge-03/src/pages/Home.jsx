import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [regData, setRegData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPass: '',
    jobTitle: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleRegister = (e) => {
    e.preventDefault();
    if (regData.password !== regData.confirmPass) {
      alert("Passwords do not match!");
      return;
    }
    const newUser = {
      name: regData.name,
      email: regData.email,
      jobTitle: regData.jobTitle
    };
    login(newUser);
    navigate('/members');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      name: loginData.email.split('@')[0] || "Jessie",
      email: loginData.email,
      jobTitle: "Software Engineer"
    };
    login(user);
    navigate('/members');
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to LinkedIn! A social network for professionals.</h1>
      </div>

      <div className="auth-boxes">
        {/* Register Box */}
        <div className="auth-box">
          <fieldset>
            <legend>Register</legend>
            <form onSubmit={handleRegister}>
              <div className="form-field">
                <input 
                  type="text" 
                  placeholder="Name" 
                  value={regData.name}
                  onChange={(e) => setRegData({...regData, name: e.target.value})}
                  required 
                />
              </div>
              <div className="form-field">
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={regData.email}
                  onChange={(e) => setRegData({...regData, email: e.target.value})}
                  required 
                />
              </div>
              <div className="form-field">
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={regData.password}
                  onChange={(e) => setRegData({...regData, password: e.target.value})}
                  required 
                />
              </div>
              <div className="form-field">
                <input 
                  type="password" 
                  placeholder="Confirm Pass" 
                  value={regData.confirmPass}
                  onChange={(e) => setRegData({...regData, confirmPass: e.target.value})}
                  required 
                />
              </div>
              <div className="form-field">
                <input 
                  type="text" 
                  placeholder="Job Title" 
                  value={regData.jobTitle}
                  onChange={(e) => setRegData({...regData, jobTitle: e.target.value})}
                  required 
                />
              </div>
              <div className="btn-container">
                <button type="submit" className="wire-btn">Register</button>
              </div>
            </form>
          </fieldset>
        </div>

        {/* Login Box */}
        <div className="auth-box">
          <fieldset>
            <legend>Login</legend>
            <form onSubmit={handleLogin}>
              <div className="form-field">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  required 
                />
              </div>
              <div className="form-field">
                <input 
                  type="password" 
                  placeholder="Your Password" 
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required 
                />
              </div>
              <div className="btn-container align-right">
                <button type="submit" className="wire-btn">Login</button>
              </div>
            </form>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default Home;