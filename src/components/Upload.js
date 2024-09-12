import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  Paper,
  IconButton,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [signedPdfURL, setSignedPdfURL] = useState(null); // URL to display the signed PDF
  const [recipientEmails, setRecipientEmails] = useState('');
  const [fileName, setFileName] = useState('');

  // Handle document selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      setSignedPdfURL(null); // Reset the signed PDF URL when a new file is uploaded
    }
  };

  // Handle revert action
  const handleRevert = () => {
    setSelectedFile(null);
    setFileName('');
    setSignedPdfURL(null); // Clear the signed PDF preview
  };

  // Handle applying the saved signature to the placeholder text in the PDF
  const handleSignPDF = async () => {
    const signatureImage = localStorage.getItem('savedSignature'); // Retrieve the signature from localStorage

    if (!signatureImage) {
      alert('No signature found. Please create and save a signature first.');
      return;
    }

    if (!selectedFile) {
      alert('Please upload a PDF file first.');
      return;
    }

    const existingPdfBytes = await selectedFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0]; // Assuming signatures are on the first page
    const { width } = firstPage.getSize(); // Removed height to fix the warning

    // Get the saved signature image as an embedded image in the PDF
    const pngImageBytes = await fetch(signatureImage).then((res) => res.arrayBuffer());
    const pngImage = await pdfDoc.embedPng(pngImageBytes);

    // Replace placeholder text with signature for PARTY 1
    firstPage.drawImage(pngImage, {
      x: 100, // You can adjust this position as per the PDF layout
      y: 100,
      width: 100,
      height: 50,
    });

    // Replace placeholder text with signature for PARTY 2
    firstPage.drawImage(pngImage, {
      x: width - 200, // Adjust position for PARTY 2
      y: 100,
      width: 100,
      height: 50,
    });

    // Save the modified PDF and display it in the browser
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const signedPdfURL = URL.createObjectURL(blob);

    // Update the state to hold the signed PDF URL
    setSignedPdfURL(signedPdfURL);
  };

  // Define handleSend
  const handleSend = () => {
    if (!selectedFile || !recipientEmails) {
      alert('Please upload a file and enter recipient emails before sending.');
      return;
    }

    // Simulate sending the document
    alert(`Sending ${fileName} to ${recipientEmails}`);

    // You can add backend logic here for sending the document via email, or other APIs
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, height: 'calc(100vh - 64px)' }}>
      <Paper elevation={3} sx={{ height: '100%', display: 'flex' }}>
        <Grid container spacing={0} sx={{ height: '100%' }}>
          {/* Left side: Document preview */}
          <Grid item xs={12} sm={9} sx={{ height: '100%' }}>
            <Box sx={{ borderRight: '1px solid #ccc', height: '100%' }}>
              {signedPdfURL ? (
                // Display signed PDF after signing
                <embed
                  src={signedPdfURL}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                  title="Signed Document Preview"
                />
              ) : selectedFile ? (
                // Display original PDF before signing
                <embed
                  src={URL.createObjectURL(selectedFile)}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                  title="Document Preview"
                />
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <Typography variant="body1" color="textSecondary" align="center">
                    No document selected for preview
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>

          {/* Right side: Document upload, email, and send */}
          <Grid item xs={12} sm={3} sx={{ height: '100%', p: 4 }}>
            <Box>
              <Button
                variant="contained"
                component="label"
                startIcon={<UploadFileIcon />}
                sx={{ mb: 2 }}
              >
                Choose File
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
              <TextField
                fullWidth
                value={fileName}
                variant="outlined"
                label="Selected File"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 2 }}
              />
              <IconButton
                color="error"
                onClick={handleRevert}
                sx={{ mb: 4 }}
                title="Revert chosen document"
              >
                <RemoveCircleOutlineIcon />
              </IconButton>

              {/* Input for recipient emails */}
              <TextField
                fullWidth
                variant="outlined"
                label="Recipient Email(s)"
                placeholder="Enter multiple emails separated by commas"
                value={recipientEmails}
                onChange={(e) => setRecipientEmails(e.target.value)}
                sx={{ mb: 4 }}
              />

              {/* Sign PDF Button */}
              <Button variant="contained" color="secondary" fullWidth onClick={handleSignPDF} sx={{ mb: 2 }}>
                Sign PDF
              </Button>

              {/* Send Button */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSend}
              >
                Send Document
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Upload;
