import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <TaskCard key={index} task={task} />
      ))}
    </>
  );
};

export default TaskList;
