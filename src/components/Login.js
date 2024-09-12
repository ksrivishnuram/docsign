import { useState } from 'react';
import { TextField, Button, Container, Grid, Box, Typography, Paper, Alert, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailPattern.test(email);
  };

  const handleLogin = () => {
    if (!email || !password) {
      setError('Email and password are required.');
    } else if (!validateEmail(email)) {
      setError('Please enter a valid Gmail address.');
    } else {
      setError('');
      onLogin(true);
    }
  };

  return (
    <>
      {/* Blue header on top */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2', height: '64px' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Your App Name
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Centered Login Form */}
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 64px)', // Adjust height to account for the header
        }}
      >
        <Paper elevation={3} sx={{ padding: '2rem', width: '100%', maxWidth: '400px' }}>
          <Typography variant="h4" gutterBottom align="center">
            Login
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <Box sx={{ mt: 2 }}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{ mt: 2, mb: 2 }}
            >
              Login
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              component={Link}
              to="/register"
              sx={{ mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
