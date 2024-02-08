// LoginPage.js

import React, { useState } from 'react';
import './LoginPage.css';
import  Image  from '../../assests/image2.png';

const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-page">
      <div className="image-column">
        {/* Add your image here */}
        <img src={Image} alt="Image" className="login-image" />
      </div>
      <div className="form-column">
        <div className="login-container">
          <h1 className="login-title">Scintillate</h1>
          <h3 className="login-titles">Login</h3>
          <label className="login-label">
            Username:
            <input
              className="login-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label className="login-label">
            Password:
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button className="login-button" onClick={() => handleLogin(username, password)}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
