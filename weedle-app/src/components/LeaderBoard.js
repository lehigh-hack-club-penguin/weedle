import React, { useEffect, useState } from 'react'
import './styles/LeaderboardStyles.css'
import {ref, get} from "firebase/database"
import Container from 'react-bootstrap/Container';

export default function LeaderBoard(props) {

  const [elements, setElements] = useState()

  async function fetchLeaderboards() {
    var userData = []
    const query = ref(props.db, 'users/')
    await get(query).then((users) => {
      var user = users.val()
      for (var u in user) {
        userData.push({ username: user[u].username, points: user[u].points })
      }
    });

    userData.sort((a, b) => b.points - a.points);
      
      setElements(userData.map((user, index) => {
        return(
          <>
          <Container key={index} className={index%2 ? 'white':'grey'} style={{borderRadius:'10em'}}>
            <p id='leader-position' className='row-element'><span style={{fontWeight:'bold'}}>#{index+1}</span></p>
            <p id='row-user' className='row-element'>{user.username}</p>
            <p id='row-points' className='row-element'>{user.points}</p>
          </Container>
          <br></br>
          </>
        );
      }))
  }

  useEffect(() => {
    fetchLeaderboards()
  }, [])

  return (
    <div class='main-container'>
    <div className='page-title'>Leaderboard</div>
    <br></br>
    <br></br>
    <br></br>
    <div className='list'>
      <div className='row'>
      
        <p id='leader-position' className='row-element' style={{fontSize:'1.5em'}}><strong>Position</strong></p>
        <p id='row-user' className='row-element' style={{fontSize:'1.5em'}}><strong>Username</strong></p>
        <p id='row-points' className='row-element' style={{fontSize:'1.5em'}}><strong>Points</strong></p>
      
      </div>
      {elements}
    </div>
    </div>
  )
}