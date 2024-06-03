import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Checkbox, Typography, TextField, Button, Box, CircularProgress, Grid } from '@mui/material';
import { API_BASE_URL } from './Utils';
import UserCard from './UserCard';
import Cookies from 'js-cookie';


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
    axios.get(API_BASE_URL + '/tasks', {headers : {'Authorization' : 'Bearer ' + Cookies.get('token')} })
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

    const newTask = { Title: newTaskTitle, Status: false };

    axios.post(API_BASE_URL + '/task', newTask,  {headers : {'Authorization' : 'Bearer ' + Cookies.get('token')}})
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
    <Grid container spacing={4} sx = {{padding:10,}}>


        <Grid item xs={10}>
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
              <ListItem key={task.ID}>
                <Checkbox edge="start" checked={task.Status} />
                <ListItemText primary={task.Title} />
              </ListItem>
            ))}
          </List>
        </Grid>


        <Grid item xs={2}>
          <UserCard></UserCard>
        </Grid>

    </Grid>
  );
};

export default TodoList;
