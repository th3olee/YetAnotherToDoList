import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material';
import { API_BASE_URL } from './Utils';
import Cookies from 'js-cookie';


const Login = () => {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post( API_BASE_URL + '/login', {
        username,
        password
      });
      
      const token = response.data.token;
      Cookies.set('token', token, {expires:1});

      window.location.href = "/todo";
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (

    <Grid container spacing={4} >
      <Grid item xs={8}>
        <img src="https://picsum.photos/1000/1080"/>
      </Grid>


      <Grid item xs={4} padding={30}>
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button variant="contained" color="primary" onClick={handleLogin} style={{ marginTop: '16px' }}>
          Login
        </Button>
      </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
