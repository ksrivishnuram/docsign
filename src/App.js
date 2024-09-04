// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import axios from 'axios';

// Import the necessary components
import TouchPad from './TouchPad'; // Existing imports
import TextToStyle from './TextToStyle'; // Existing imports
import Login from './Login'; // Updated path
import Register from './Register'; // Updated path

function App() {
  const handleSave = async (data) => {
    try {
      const response = await axios.post('https://your-api-endpoint.com/save-data', data);
      console.log('Server Response:', response.data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Dashboard Route */}
        <Route 
          path="/" 
          element={
            <div className="App">
              <header className="App-header">
                <h1>Signature and Text Styling App</h1>
                {/* Components with save functionality */}
                <TouchPad onSave={handleSave} />
                <TextToStyle onSave={handleSave} />
              </header>
            </div>
          }
        />
        {/* Login Route */}
        <Route 
          path="/login" 
          element={<Login />} 
        />
        {/* Register Route */}
        <Route 
          path="/register" 
          element={<Register />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
