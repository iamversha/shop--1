import { Box, Container } from '@mui/material';
import React from 'react';
import ProductList from '../../components/sections/ProductList';


const Home = () => {
  return (
    <Box>
      <Container>
        <h1>Welcome to the Home Page</h1>
        <ProductList />
      </Container>
    </Box>
  );
}

export default Home;