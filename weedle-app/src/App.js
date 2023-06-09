import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import LeaderBoard from './components/LeaderBoard';
import Radar from './components/Radar';
import Header from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  return (
    <BrowserRouter>
      <Header db={props.db}/>
      <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/radar" element={<Radar db={props.db}/>}></Route>
          <Route path="/leaderboard" element={<LeaderBoard db={props.db}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
