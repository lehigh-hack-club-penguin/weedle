import React, { useState } from 'react';
import './styles/NavbarStyle.css'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { PersonFill } from 'react-bootstrap-icons';
import Login from './Login';

export default function Navbar(props) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <div className='navbar'>
        <div className='title'>Weedle</div>
        <Link className='link' id='leaderboard-link' to='/leaderboard'>Leaderboard</Link>
        <Link className='link' id='radar-link' to='/radar'>Radar</Link>
      
        <Button 
          className='link' 
          id='weedle-link' 
          variant="primary"
          onClick={handleShow}
        >
          Weedle
        </Button>
        <Login show={show} handleClose={handleClose} handleShow={handleShow} db={props.db}/>

        <Button variant="primary"  className="rounded-circle link" id='profile-button'>
          <PersonFill /> 
        </Button>
    </div>
  )
}
