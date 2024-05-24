import React, { useState } from 'react';
import { Container, Typography, Switch } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import Login from './components/Login';

const App = () => {

  return (
    <Router>

      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/todo" element={<TodoList/>}/> 
      </Routes>
    </Router>
  );
};

export default App;
