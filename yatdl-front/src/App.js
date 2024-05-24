import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import TodoList from './components/TodoList';

const App = () => {

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Gestionnaire de Tâches
      </Typography>
      <TodoList />
    </Container>
  );
};

export default App;
