import React from 'react';
import { Box, Paper } from '@mui/material';
import { Outlet, Link, useLocation } from 'react-router-dom';
import bgImage from '../../assets/bg-inventory.jpg';

const AccessLayout = () => {
  const location = useLocation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      position="relative"
    >
      {/* Background Box */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add dark overlay
          backgroundBlendMode: 'overlay', // Blend the overlay with the image
          zIndex: -1,
        }}
      />

      {/* Content Box */}
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '400px',
          p: 4,
          borderRadius: 2,
        }}
      >
        <Outlet />
        <Box mt={2} display="flex" justifyContent="space-between" width="100%">
          {location.pathname !== '/login' && <Link to="/login">Login</Link>}
          {location.pathname !== '/signup' && <Link to="/signup">Signup</Link>}
          {location.pathname !== '/forgot-password' && <Link to="/forgot-password">Forgot Password</Link>}
        </Box>
      </Paper>
    </Box>
  );
};

export default AccessLayout;