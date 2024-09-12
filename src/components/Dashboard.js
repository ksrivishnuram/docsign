import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 64px)', // Adjust for header height
        flexDirection: 'column',
      }}
    >
      <Box sx={{ textAlign: 'center', width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Your Dashboard
        </Typography>

        {/* Grid for vertical alignment of buttons */}
        <Grid container spacing={3} direction="column" alignItems="center" sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary" // Uniform primary color
              component={Link}
              to="/documents"
              sx={{ py: 2 }}
            >
              Documents
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary" // Uniform primary color
              component={Link}
              to="/upload"
              sx={{ py: 2 }}
            >
              Upload
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary" // Uniform primary color
              component={Link}
              to="/need-action"
              sx={{ py: 2 }}
            >
              Need Action
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary" // Uniform primary color
              component={Link}
              to="/my-signature"
              sx={{ py: 2 }}
            >
              My Signature
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
