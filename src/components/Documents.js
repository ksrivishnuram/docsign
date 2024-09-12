import { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Mock data for documents
const sentDocuments = [
  { id: 1, name: 'Document 1', date: '2024-09-08' }, // Today's date
  { id: 2, name: 'Document 2', date: '2024-09-01' },
  { id: 3, name: 'Document 3', date: '2024-08-28' },
];

const receivedDocuments = [
  { id: 1, name: 'Document A', date: '2024-09-08' }, // Today's date
  { id: 2, name: 'Document B', date: '2024-09-02' },
  { id: 3, name: 'Document C', date: '2024-08-30' },
];

const Documents = () => {
  const [value, setValue] = useState(0); // 0 for Sent, 1 for Received
  const [filter, setFilter] = useState('all'); // Filter by default: "all"

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filterDocuments = (documents) => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);

    if (filter === 'today') {
      return documents.filter((doc) => new Date(doc.date).toDateString() === today.toDateString());
    } else if (filter === 'week') {
      return documents.filter((doc) => new Date(doc.date) >= oneWeekAgo);
    }
    return documents; // Return all documents if "all" is selected
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3}>
        <Typography variant="h4" gutterBottom align="center" sx={{ p: 2 }}>
          Documents
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChangeTab} aria-label="documents tabs" centered>
            <Tab label="Sent" />
            <Tab label="Received" />
          </Tabs>
        </Box>

        {/* Filter dropdown */}
        <Box sx={{ m: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Filter Documents</InputLabel>
            <Select value={filter} onChange={handleFilterChange} label="Filter Documents">
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="week">One Week Before</MenuItem>
              <MenuItem value="all">All</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Sent Tab Panel */}
        <TabPanel value={value} index={0}>
          <Typography variant="h6">Sent Documents</Typography>
          <ul>
            {filterDocuments(sentDocuments).map((doc) => (
              <li key={doc.id}>
                {doc.name} - Sent on {doc.date}
              </li>
            ))}
          </ul>
        </TabPanel>

        {/* Received Tab Panel */}
        <TabPanel value={value} index={1}>
          <Typography variant="h6">Received Documents</Typography>
          <ul>
            {filterDocuments(receivedDocuments).map((doc) => (
              <li key={doc.id}>
                {doc.name} - Received on {doc.date}
              </li>
            ))}
          </ul>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Documents;
