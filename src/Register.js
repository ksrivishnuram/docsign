import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Generate a random password of 12 characters
  const generatePassword = () => {
    const generatedPassword = Math.random().toString(36).slice(-12); 
    setPassword(generatedPassword); // Set the generated password to the state
  };

  const handleRegister = async () => {
    // Ensure that the email is a valid company email
    if (email.endsWith('@infowaygroup.com')) {
      const registrationData = { email, password };

      try {
        // Send registration data to the backend
        const response = await axios.post('http://localhost:8080/users/register', registrationData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          alert(`Account registered successfully! Your password is: ${password}`);
          console.log('Backend response:', response.data);

          // Navigate to the login page after successful registration
          navigate('/login');
        }
      } catch (error) {
        console.error('Error during registration:', error.response || error.message);
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
