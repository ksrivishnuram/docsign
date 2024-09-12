import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  Paper,
  Select,
  MenuItem,
} from '@mui/material';

const handwritingFonts = ['Pacifico', 'Dancing Script', 'Indie Flower', 'Satisfy', 'Great Vibes'];

const MySignature = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [typedName, setTypedName] = useState('');
  const [font, setFont] = useState('Pacifico'); // Default handwriting font

  // Get the position of the cursor relative to the canvas
  const getCursorPosition = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  // Handle drawing on canvas
  const startDrawing = (event) => {
    event.preventDefault();
    const { x, y } = getCursorPosition(event);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    const { x, y } = getCursorPosition(event);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Save signature as an image (Base64) and store in localStorage
  const handleSaveSignature = () => {
    const canvas = canvasRef.current;
    const signatureImage = canvas.toDataURL('image/png');
    localStorage.setItem('savedSignature', signatureImage); // Save signature in localStorage
    alert('Signature saved!');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
      }}
    >
      <Paper elevation={3} sx={{ width: '80%', maxWidth: '1200px', p: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom>
              Draw Your Signature
            </Typography>
            <Box sx={{ border: '1px solid #ccc', width: '100%', height: '200px', position: 'relative' }}>
              <canvas
                ref={canvasRef}
                width={600}
                height={200}
                style={{ border: '1px solid black', width: '100%', height: '100%' }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
            </Box>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSaveSignature}>
              Save Signature
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom>
              Type Your Name
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Type Your Name"
              value={typedName}
              onChange={(e) => setTypedName(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Typography variant="body1" gutterBottom>
              Select a Handwriting Font:
            </Typography>
            <Select
              fullWidth
              value={font}
              onChange={(e) => setFont(e.target.value)}
              sx={{ mb: 2 }}
            >
              {handwritingFonts.map((fontName) => (
                <MenuItem key={fontName} value={fontName}>
                  {fontName}
                </MenuItem>
              ))}
            </Select>

            {typedName && (
              <Typography
                variant="h4"
                sx={{
                  fontFamily: font,
                  border: '1px solid #ccc',
                  p: 2,
                  fontSize: '2rem',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                {typedName}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default MySignature;
