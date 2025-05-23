import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { userLogin } from '../../AppRedux/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const userProfile = useSelector((state)=>state.user.profile);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch= useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(userLogin({ email, password }));
    if(userProfile === null){
      navigate('/login')
    }else{
      navigate('/')
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>Login Page</Typography>
      <Box component="form" display="flex" flexDirection="column" alignItems="center" width="100%">
        <TextField label="Email" type="email" variant="outlined" margin="normal" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
        <TextField label="Password" type="password" variant="outlined" margin="normal" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleLogin}>Login</Button>
      </Box>
    </>
  );
};

export default Login;