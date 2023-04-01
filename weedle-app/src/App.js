import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import LeaderBoard from './LeaderBoard';
import Radar from './Radar';
import React, { useRef } from 'react';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route exact path="/" component={Home} />
        <Route path="/leaderboard" component={LeaderBoard} />
        <Route path="/radar" component={Radar} />
      </Routes>
    </div>
  );
}

export default App;
