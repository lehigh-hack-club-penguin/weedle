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

      setElements(userData.map((user, index) => {
        return( 
          <div className='row' key={index} id={index%2 ? 'white':'grey'}>
            <p className='row-element'>#{index+1}</p>
            <p className='row-element'>{user.username}</p>
            <p className='row-element'>{user.points}</p>
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
        <div className='row-element'><strong>Position</strong></div>
        <div className='row-element'><strong>Username</strong></div>
        <div className='row-element'><strong>Points</strong></div>
      </div>
      {elements}
    </div>
  )
}