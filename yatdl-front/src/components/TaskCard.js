import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TaskCard = ({ task }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{task}</Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
