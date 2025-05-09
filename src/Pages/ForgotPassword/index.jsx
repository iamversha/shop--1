import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';


const ForgotPassword = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom>Forgot Password Page</Typography>
      <Box component="form" display="flex" flexDirection="column" alignItems="center" width="100%">
        <TextField label="Email" type="email" variant="outlined" margin="normal" fullWidth />
        <Button type="submit" variant="contained" color="primary" fullWidth>Reset Password</Button>
      </Box>
    </>
  );
};

export default ForgotPassword;