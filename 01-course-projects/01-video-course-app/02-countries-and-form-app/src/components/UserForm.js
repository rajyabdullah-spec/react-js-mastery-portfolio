import React, { useState } from 'react';
import '../App.css';

export default function UserForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted successfully!');
        console.log('Username:', username);
        console.log('Email:', email);
    };

    return (
        <div className="countries-container">
            <h2 className="countries-title">User Account Setup 👤</h2>
            
            <form onSubmit={handleSubmit} className="countries-list">
                
                {/* Input Field: Username */}
                <div className="country-item form-field">
                    <label className="country-name" htmlFor="username">Username:</label>
                    <input 
                        id="username"
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Enter your username..."
                        className="form-input"
                    />
                </div>

                {/* Input Field: Email */}
                <div className="country-item form-field">
                    <label className="country-name" htmlFor="email">Email Address:</label>
                    <input 
                        id="email"
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="name@example.com"
                        className="form-input"
                    />
                </div>

                <button type="submit" className="form-submit-btn">
                    Save Data
                </button>
            </form>

            {/* Live Preview Box */}
            <div className="country-item preview-box">
                <h4 className="preview-title">👀 Live Preview:</h4>
                <p className="preview-text">
                    <strong>Current Username:</strong> {username || <span className="preview-placeholder">Typing...</span>}
                </p>
                <p className="preview-text">
                    <strong>Current Email:</strong> {email || <span className="preview-placeholder">Typing...</span>}
                </p>
            </div>
        </div>
    );
}