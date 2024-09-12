import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Button, Container, Typography, Box, Paper } from '@mui/material';

const DocumentUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <Container maxWidth="md" className="text-center mt-12">
      <Paper elevation={3} className="p-6">
        <Typography variant="h5" gutterBottom>
          Upload a PDF Document
        </Typography>
        <Box className="mt-4">
          {file ? (
            <Document file={file} className="mb-4">
              <Page pageNumber={1} />
            </Document>
          ) : (
            <Typography variant="h6">No document uploaded yet</Typography>
          )}
        </Box>

        <Button
          variant="contained"
          component="label"
          color="primary"
          sx={{ mt: 4 }}
        >
          Upload PDF
          <input type="file" hidden onChange={handleFileUpload} accept=".pdf" />
        </Button>
      </Paper>
    </Container>
  );
};

export default DocumentUpload;
