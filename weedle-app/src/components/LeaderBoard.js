import React, { useEffect, useState } from 'react'
import './styles/LeaderboardStyles.css'
import {ref, get} from "firebase/database"

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
      if(userData.length !=0)
      setElements(userData.map((user, index) => {
        return(
          <div className='row' key={index} id={index%2 ? 'white':'grey'}>
            <div id='leader-position' className='row-element'>#{index+1}</div>
            <div id='row-user' className='row-element'>
              <img src={user.profile_url} id='row-pic'></img>
              <div id='row-user' className='row-element'>{user.username}</div>
            </div>
            <div id='row-user' className='row-element'>{user.username}</div>
            <div id='row-points' className='row-element'>{user.points}</div>
          </div>
        );
      }))
  }

  useEffect(() => {
    fetchLeaderboards()
  }, [])

  return (
    <div className='list'>
      <div className='row'>
        <p id='leader-position' className='row-element'><strong>Position</strong></p>
        <p id='row-user' className='row-element'><strong>Username</strong></p>
        <p id='row-points' className='row-element'><strong>Points</strong></p>
      </div>
      {elements}
    </div>
  )
}