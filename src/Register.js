import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const generatePassword = () => {
    const generatedPassword = Math.random().toString(36).slice(-12);
    setPassword(generatedPassword);
  };

  const handleRegister = async () => {
    if (email.endsWith('@infowaygroup.com')) {
      const registrationData = { email, password };

      try {
        // Send data to backend using axios
        const response = await axios.post('http://localhost:8080/api/register', registrationData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        alert(`Account registered successfully! Your password is: ${password}`);
        console.log('Backend response:', response.data);

        // Optionally navigate to another page after registration
        navigate('/login');
      } catch (error) {
        console.error('Error during registration:', error);
        alert('Registration failed. Please try again.');
      }
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
      <button onClick={() => navigate('/login')}>Back to Login</button>
    </div>
  );
};

export default Register;
