// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Updated hook

  const handleLogin = () => {
    // Logic for handling login
    if (email.endsWith('@infowaygroup.com')) {
      alert('Logged in successfully');
    } else {
      alert('Please use your infowaygroup company email to login.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => navigate('/register')}>Register</button> {/* Updated navigation */}
    </div>
  );
};

export default Login;
