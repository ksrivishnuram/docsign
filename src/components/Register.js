import { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailPattern.test(email);
  };

  const handleRegister = () => {
    // Check if email and password are not empty and validate the email
    if (!email || !password) {
      setError('Email and password are required.');
    } else if (!validateEmail(email)) {
      setError('Please enter a valid Gmail address.');
    } else {
      setError(''); // Clear any previous error
      navigate('/'); // Redirect to login page after successful registration
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} className="p-6 mt-8">
        <Typography variant="h4" gutterBottom align="center">
          Register
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error && !validateEmail(email)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error && password === ''}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRegister}
            sx={{ mt: 2, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
