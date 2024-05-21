import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Gestionnaire de Tâches
      </Typography>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} />
    </Container>
  );
};

export default App;
