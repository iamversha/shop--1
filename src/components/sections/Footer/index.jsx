import React from 'react';
import { Box, Typography, Link, Grid, Container, useTheme } from '@mui/material';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box component="footer" sx={{ backgroundColor: theme.palette.primary.main, color: 'white', py: 4 }} width="100%">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom>About Shop</Typography>
            <Typography variant="body2">
              Shop is your one-stop destination for all your shopping needs. We bring you the best products at unbeatable prices, ensuring quality and satisfaction.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom>Customer Service</Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
              <li><Link href="/help" color="inherit" underline="hover">Help Center</Link></li>
              <li><Link href="/returns" color="inherit" underline="hover">Returns</Link></li>
              <li><Link href="/shipping" color="inherit" underline="hover">Shipping Info</Link></li>
              <li><Link href="/faq" color="inherit" underline="hover">FAQs</Link></li>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom>Contact Us</Typography>
            <Typography variant="body2">Email: support@shop.com</Typography>
            <Typography variant="body2">Phone: +1 234 567 890</Typography>
            <Typography variant="body2">Address: 123 Shopping Lane, Shop City, SC 12345</Typography>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2">&copy; 2025 Shop. All rights reserved. | <Link href="/privacy" color="inherit" underline="hover">Privacy Policy</Link> | <Link href="/terms" color="inherit" underline="hover">Terms of Service</Link></Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;