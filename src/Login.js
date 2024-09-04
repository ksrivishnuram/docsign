import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Check if the email is from the abc.com domain
    if (!email.endsWith('@infowaygroup.com')) {
      alert('Please use your infowaygroup company email to log in.');
      return;
    }

    const loginData = { email, password };

    try {
      // Send login data to backend
      const response = await axios.post('http://localhost:8080/api/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('Login successful');
        navigate('/dashboard'); // Navigate to another page on successful login
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Invalid email or password');
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
    </div>
  );
};

export default Login;
