import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Checkbox, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    setLoading(true);
    axios.get('http://localhost:8080/tasks')
      .then(response => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim() === "") return;

    const newTask = { title: newTaskTitle, done: false };

    axios.post('http://localhost:8080/tasks', newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTaskTitle("");
      })
      .catch(error => {
        setError(error);
      });
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Erreur lors de la récupération des tâches</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Liste des tâches
      </Typography>
      <Box display="flex" mb={2}>
        <TextField 
          label="Nouvelle tâche" 
          value={newTaskTitle} 
          onChange={(e) => setNewTaskTitle(e.target.value)} 
          fullWidth 
        />
        <Button variant="contained" color="primary" onClick={handleAddTask} style={{ marginLeft: '8px' }}>
          Ajouter
        </Button>
      </Box>
      <List>
        {tasks.map(task => (
          <ListItem key={task.id}>
            <Checkbox edge="start" checked={task.done} />
            <ListItemText primary={task.title} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TodoList;
