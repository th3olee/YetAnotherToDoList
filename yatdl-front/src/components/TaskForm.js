import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        label="Nouvelle tâche"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
        Ajouter
      </Button>
    </Box>
  );
};

export default TaskForm;
