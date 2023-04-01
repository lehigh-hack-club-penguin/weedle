import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";
import axios from 'axios';

export default function Login() {
    const [user, setUser] = useState({});
    const [userExists, setUserExists] = useState(false);
  
  function handleCallbackResponse(response) {
      const tokenId = response.credential;
      console.log("Encoded JWT ID token: " + tokenId);
      const userObj = jwt_decode(tokenId);
      console.log(userObj);
      setUser(userObj);
      // use LocalStore to store user email
      localStorage.setItem("email", userObj.email);
      // use LocalStore to store user name
      localStorage.setItem("username", userObj.email.split("@")[0]);
      
      document.getElementById("signInDiv").hidden = true;
      console.log("In handleCallbackResponse");
      checkNewUser(tokenId);
  }
 // {iStatus: 'ok', iMessage: 'true', iData: '1013060934'}
  function checkNewUser(tokenId){
    console.log("In checkNewUser");
    axios
      .post('https://thebuzz-google.herokuapp.com/tokenID', {
        tokenID: tokenId
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        if (res.data.iMessage === "true"){
          console.log("Existing user");
          setUserExists(true);
          // set sessionKey in context
          var sessionKey = res.data.iData;
          localStorage.setItem("sessionKey", sessionKey);
          // Navigate("/feed");
        } else {
          console.log("New user");
          setUserExists(false);
          // set sessionKey in context
          var sessionKey = res.data.iData;
          localStorage.setItem("sessionKey", sessionKey);
          // Navigate("/signup");
        }

      })
      .catch(err => {
        console.log(err);
      }
    );
  }
    

  /* useEffect is a React hook that runs after the component is rendered. */
  useEffect(() => {
    /* global google */
    const google = window.google;
    google.accounts.id.initialize({
      client_id: "457068054329-aao8u6novt3lnda08i4jcoulfukbnuut.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large", text: "long", width: 220 }
    );

    google.accounts.id.prompt();

    console.log("In useEffect");
  }, []);

  return (
    <div className='login'>
      <div id="signInDiv"></div>
      {Object.keys(user).length > 0 && userExists && <Navigate replace to="/feed" />}
      {Object.keys(user).length > 0 && !userExists && <Navigate replace to="/signup"/>}
    </div>
  );
}


