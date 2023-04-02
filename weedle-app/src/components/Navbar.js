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
import logo from '../logo.svg';

export default function Header(props) {
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
    <>
    <style> type="text/css"
        {`
        .btn-weedle {
          background-color: #8159EB;
          font-size: 12px;
          color: white;
          border: none;
        }
        
        .btn-weedle:hover {
          background-color: #6747bd;
          font-size: 12px;
          color: white;
          border: none;
        }
        `}
    </style>
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
        className="btn btn-green"
        style={{ color: "white", background: "#014421" }}
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
        <Login show={show && !userLoggedIn} handleClose={handleClose} db={props.db} setUserLoggedIn={setUserLoggedIn} setShowUpload={setShowUpload}/>
        <Upload showUpload={showUpload && userLoggedIn} handleCloseUpload={handleCloseUpload} db={props.db}/>
        <Button 
          variant="success" 
          className="btn btn-green"
          style={{ color: "white", background: "#014421" }}
          size="sm" 
          id='profile-button'>
          <PersonFill /> 
        </Button>
        </Container>
    </Navbar>
    </>
  )
}
