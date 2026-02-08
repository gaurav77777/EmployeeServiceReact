// components/Home.js
import React from 'react';
import { Typography, Box } from '@mui/material';

function Home() {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Welcome to Employee Management System</Typography>
      <Typography variant="body1">Use the navigation bar to manage employees or register a new one.</Typography>
    </Box>
  );
}

export default Home;
