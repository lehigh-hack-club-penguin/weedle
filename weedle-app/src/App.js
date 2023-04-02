import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import LeaderBoard from './components/LeaderBoard';
import Radar from './components/Radar';
import Navbar from './components/Navbar';

function App(props) {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/radar" element={<Radar db={props.db}/>}></Route>
          <Route path="/leaderboard" element={<LeaderBoard db={props.db}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
