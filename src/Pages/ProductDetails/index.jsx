import React from 'react';
import ProductPreview from '../../components/sections/ProductPreview';
import { Container } from '@mui/material';

const ProductDetails = () => {

  return (
    <div>
      <h1>Product Details</h1>
      <Container>
        <ProductPreview />
      </Container>
    </div>
  );
};

export default ProductDetails;