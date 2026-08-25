import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Navbar } from '../components/layout/Navbar';

export function MainLayout() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navbar />

      <Container maxWidth="lg">
        <Box component="main" sx={{ py: 5 }}>
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
}