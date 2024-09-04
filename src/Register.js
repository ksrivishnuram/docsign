// src/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Updated hook

  const generatePassword = () => {
    const generatedPassword = Math.random().toString(36).slice(-12);
    setPassword(generatedPassword);
  };

  const handleRegister = () => {
    if (email.endsWith('@infowaygroup.com')) {
      alert(`Account registered successfully! Your password is: ${password}`);
    } else {
      alert('Please use your infowaygroup company email to register.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={generatePassword}>Generate Password</button>
      <input
        type="password"
        placeholder="Generated password"
        value={password}
        readOnly
      />
      <button onClick={handleRegister}>Register</button>
      <button onClick={() => navigate('/login')}>Back to Login</button> {/* Updated navigation */}
    </div>
  );
};

export default Register;
