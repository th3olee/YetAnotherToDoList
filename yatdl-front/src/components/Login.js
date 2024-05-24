import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        username,
        password
      });
      // Stocker le jeton JWT ou gérer la réponse de connexion ici
      console.log(response.data);
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <Container maxWidth="sm">
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
    </Container>
  );
};

export default Login;
