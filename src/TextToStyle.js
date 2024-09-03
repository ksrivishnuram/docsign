import React, { useState } from 'react';
import axios from 'axios';

// Define font styles
const fontStyles = {
  freehand: 'freehand-regular',
  qwitcherRegular: 'qwitcher-grypen-regular',
  qwitcherBold: 'qwitcher-grypen-bold',
};

const TextToStyle = ({ onSave }) => {
  const [text, setText] = useState('');
  const [selectedFont, setSelectedFont] = useState('freehand');
  const [response, setResponse] = useState(null);

  // Handle text change
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Handle font change
  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

  // Handle save action
  const handleSave = async () => {
    if (!text.trim()) {
      alert('Text cannot be empty!');
      return;
    }

    try {
      const data = {
        text: text,
        font: selectedFont,
      };
      await onSave(data);
      setResponse('Text saved successfully');
    } catch (error) {
      console.error('Error saving text:', error);
      setResponse('Failed to save text');
    }
  };

  return (
    <div>
      <h1>Text to Style</h1>
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter your name"
        style={{ fontSize: '20px', padding: '10px', marginBottom: '20px' }}
      />
      <select onChange={handleFontChange} value={selectedFont} style={{ marginBottom: '20px' }}>
        <option value="freehand">Freehand</option>
        <option value="qwitcherRegular">Qwitcher Grypen Regular</option>
        <option value="qwitcherBold">Qwitcher Grypen Bold</option>
      </select>
      <button onClick={handleSave} style={{ marginBottom: '20px' }}>
        Save
      </button>
      <div>
        <h2>Preview:</h2>
        <p
          className={fontStyles[selectedFont]}
          style={{ fontSize: '36px', border: '1px solid #ccc', padding: '10px', minHeight: '100px' }}
        >
          {text}
        </p>
      </div>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
};

export default TextToStyle;
