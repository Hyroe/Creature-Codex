import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../features/auth/context/AuthContext';
import {
  Box,
  CircularProgress,
} from '@mui/material';

export function AnonymousRoute() {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}