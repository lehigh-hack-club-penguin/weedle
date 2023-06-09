import React, { useEffect, useState } from 'react';
import './styles/NavbarStyle.css'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { PersonFill } from 'react-bootstrap-icons';
import Login from './Login';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Upload from './Upload';
import Profile from './Profile';
import logo from '../weedle-logo.svg';

export default function Header(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const handleCloseUpload = () => setShowUpload(false);
  const handleCloseProfile = () => setShowProfile(false);
  // const [userLoggedIn, setUserLoggedIn] = useState(localStorage.getItem('userLoggedIn') === 'true');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [option, setOption] = useState('');


  function handleButtonClick() {
    setOption('weedle');
    // remove local storage for testing
    // localStorage.removeItem('userLoggedIn');
    if (userLoggedIn) {
      // console.log(localStorage.getItem('userLoggedIn'))
      setShowUpload(true);
    } else {
      setShow(true);
    }
  }

  function handleProfileButtonClick() {
    setOption('profile');
    if (userLoggedIn) {
      setShowProfile(true);
    } else {
      setShow(true);
    }
  }

  return (
    <>
    <Navbar id="navbar" sticky="top">
    <Container>
      <Navbar.Brand href="/">
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Weedle
      </Navbar.Brand>
      &nbsp;&nbsp;
      &nbsp;&nbsp;
      <Nav variant="pills" className="me-auto">
              <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
              &nbsp;&nbsp;
              &nbsp;&nbsp;
              <Nav.Link href="/radar">Radar</Nav.Link>
      </Nav>
      <Button
        variant="success"
        class="btn btn-green"
        style={{ color: "white", background: "#006400" }}
        size="sm"
        onClick={handleButtonClick}
        >
          <svg id="icon_content_add_24px" data-name="icon/content/add_24px" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <rect id="Boundary" width="20" height="20" fill="none"/>
            <path id="_Color" data-name=" ↳Color" d="M14,8H8v6H6V8H0V6H6V0H8V6h6Z" transform="translate(5 5)" fill="#fff"/>
          </svg>
          &nbsp;&nbsp;&nbsp;&nbsp;
          Weedle
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
        <Login show={show && !userLoggedIn} handleClose={handleClose} db={props.db} setUserLoggedIn={setUserLoggedIn} setShowUpload={setShowUpload} setShowProfile={setShowProfile} option={option}/>
        <Upload showUpload={showUpload && userLoggedIn} handleCloseUpload={handleCloseUpload} db={props.db}/>
        <Profile showProfile={showProfile && userLoggedIn} handleCloseProfile={handleCloseProfile} db={props.db}/>
        <Button 
          variant="success" 
          class="btn btn-green"
          style={{ color: "white", background: "#006400" }}
          size="sm" 
          id='profile-button'
          onClick={handleProfileButtonClick}>
          <PersonFill /> 
        </Button>
        </Container>
    </Navbar>
    </>
  )
}
