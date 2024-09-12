import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Documents from './components/Documents';
import NeedAction from './components/NeedAction';
import MySignature from './components/MySignature';
import Upload from './components/Upload'; // Import the Upload page
import { AppBar, Toolbar, Button, Box } from '@mui/material';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          {isAuthenticated && (
            <Button color="inherit" href="/dashboard">
              Dashboard
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Box className="mt-8">
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<Login onLogin={setIsAuthenticated} />} />
              <Route path="/register" element={<Register />} />
            </>
          ) : (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/need-action" element={<NeedAction />} />
              <Route path="/my-signature" element={<MySignature />} />
              <Route path="/upload" element={<Upload />} /> {/* Route for Upload */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          )}
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
