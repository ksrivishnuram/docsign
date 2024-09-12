import React, { useRef, useEffect } from 'react';
import SignaturePad from 'signature_pad';
import { Container, Paper, Typography, Box } from '@mui/material';

const SignatureCapture = ({ onSave }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const signaturePad = new SignaturePad(canvasRef.current);
    onSave(signaturePad);
  }, [onSave]);

  return (
    <Container maxWidth="sm" className="text-center mt-12">
      <Paper elevation={3} className="p-6">
        <Typography variant="h5" gutterBottom>
          Draw Your Signature
        </Typography>
        <Box className="mt-4">
          <canvas
            ref={canvasRef}
            className="border border-gray-500"
            width={500}
            height={200}
          ></canvas>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignatureCapture;
