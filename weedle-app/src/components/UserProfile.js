import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ref, onValue, set, child, push, update, get } from "firebase/database";


function UserProfile(props) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [points , setPoints] = useState(0);
  const userID = localStorage.getItem('userID');

    useEffect(() => {
    // Fetch user profile data from database
        if (userID !== null) {
            const query = ref(props.db, 'users/' + userID);
            onValue(query, (user) => {
                const data = user.val();
                // console.log(data);
                setName(data.username);
                setEmail(data.email);
                setProfileUrl(data.profileUrl);
                setPoints(data.points);
            });
            // console.log(name);
        }
    }, []);

  return (
    <>
      
    </>
  );
}

export default UserProfile;
