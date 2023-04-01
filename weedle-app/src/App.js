import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
        <Route path="/" element={<Login />} />
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
