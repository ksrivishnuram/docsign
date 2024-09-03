// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import axios from 'axios';

// Import the necessary components

import TouchPad from './TouchPad';    // Updated import
import TextToStyle from './TextToStyle'; // Import the new component

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
      </Routes>
    </Router>
  );
}

export default App;
