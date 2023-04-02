import React from 'react';
import jwt_decode from "jwt-decode";
import Modal from 'react-bootstrap/Modal';
import { GoogleLogin } from '@react-oauth/google';
import { ref, onValue, set } from "firebase/database";

// import css
import './styles/Login.css';

export default function Login(props) {
    
    const userLoggedIn = props.userLoggedIn;
    
    function handleCallbackResponse(response) {
        const tokenId = response.credential;
        // console.log("Encoded JWT ID token: " + tokenId);
        const userObj = jwt_decode(tokenId);
        console.log(userObj);
        const username = userObj.given_name.toLowerCase() + userObj.family_name.toLowerCase();
        // check if user exists
        // sub is the unique user id
        const sub = userObj.sub;
        // save userLoggedIn to local storage
        localStorage.setItem('userID', sub);
        // console.log('user id: ' + sub)
        // CHECK IF USER EXISTS
        const query = ref(props.db, 'users/' + sub);
        onValue(query, (user) => {
            const data = user.val();
            if (data === null) {
                console.log('User does not exist');
                // CREATE USER
                set(ref(props.db, 'users/' + sub), {
                    username: username,
                    points: 0,
                    email: userObj.email,
                    profile_url: userObj.picture,
                });
            } else {
                console.log('User exists');
            }
        });
        props.setUserLoggedIn(true);
        props.handleClose();
        // props.setShowUpload(true);
        // props.setShowProfile(true);
        if (props.option === 'weedle') {
            props.setShowUpload(true);
        } else if (props.option === 'profile') {
            props.setShowProfile(true);
        }
    }

  return (
    <>
    <Modal show={props.show && !userLoggedIn} onHide={props.handleClose} centered >
        <Modal.Header closeButton>
            <Modal.Title as="h5">You need to sign in to use this feature!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{justifyContent: 'center', display: 'flex'}}>
            <GoogleLogin  
                onSuccess={handleCallbackResponse}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </Modal.Body>
    </Modal>
    
    </>
  );
}