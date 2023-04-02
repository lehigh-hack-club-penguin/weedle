import React, { useState } from 'react';
import './styles/NavbarStyle.css'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { PersonFill } from 'react-bootstrap-icons';
import Login from './Login';
import Upload from './Upload';

export default function Navbar(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [showUpload, setShowUpload] = useState(false);
  const handleCloseUpload = () => setShowUpload(false);
  const [userLoggedIn, setUserLoggedIn] = useState(localStorage.getItem('userLoggedIn') === 'true');

  function handleButtonClick() {
    // remove local storage for testing
    // localStorage.removeItem('userLoggedIn');
    if (userLoggedIn) {
      setShowUpload(true);
    } else {
      setShow(true);
    }
  }

  return (
    <div className='navbar'>
        <div className='title'>Weedle</div>
        <Link className='link' id='leaderboard-link' to='/leaderboard'>Leaderboard</Link>
        <Link className='link' id='radar-link' to='/radar'>Radar</Link>
      
        <Button 
          className='link' 
          id='weedle-link' 
          variant="primary"
          onClick={handleButtonClick}
        >
          Weedle
        </Button>
        <Login show={show && !userLoggedIn} handleClose={handleClose} db={props.db} setUserLoggedIn={setUserLoggedIn} setShowUpload={setShowUpload}/>
        <Upload showUpload={showUpload && userLoggedIn} handleCloseUpload={handleCloseUpload} db={props.db}/>
        <Button variant="primary"  className="rounded-circle link" id='profile-button'>
          <PersonFill /> 
        </Button>
    </div>
  )
}
