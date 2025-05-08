import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';


const Signup= () => {
  return (
    <>
      <Typography variant="h4" gutterBottom>Signup Page</Typography>
      <Box component="form" display="flex" flexDirection="column" alignItems="center" width="100%">
        <TextField label="Name" variant="outlined" margin="normal" fullWidth />
        <TextField label="Email" type="email" variant="outlined" margin="normal" fullWidth />
        <TextField label="Password" type="password" variant="outlined" margin="normal" fullWidth />
        <Button type="submit" variant="contained" color="primary" fullWidth>Signup</Button>
      </Box>
    </>
  );
};

export default Signup;