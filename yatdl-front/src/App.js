import React, { useState } from 'react';
import { Container, Typography, Switch } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import Login from './components/Login';
import NotFound from './components/notFound';


const App = () => {

  return (
    <Router>

      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/todo" element={<TodoList/>}/> 
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
};

export default App;
