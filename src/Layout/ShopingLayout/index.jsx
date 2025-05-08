import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/sections/Navbar';
import Footer from '../../components/sections/Footer';
import Box from '@mui/material/Box';

const ShoppingLayout = () => {
  return (
    <Box display="flex" flexWrap={'wrap'} justifyContent={"space-between"} height="100vh" minHeight="100vh" >
      <Box component="header" width={"100%"}>
        <Navbar />
      </Box>
      <Box component="main" width="100%">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default ShoppingLayout;