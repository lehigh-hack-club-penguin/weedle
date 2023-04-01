import React, { useEffect, useState } from 'react'
import './styles/LeaderboardStyles.css'
import {ref, onValue, get} from "firebase/database"

export default function LeaderBoard(props) {

  const [elements, setElements] = useState()

  async function fetchLeaderboards() {
    var userData = []
    const query = ref(props.db, 'users/')
    await get(query).then((users) => {
      const data = users.val()
      data.forEach((user) => {
        userData.push({ username: user.username, points: user.points })
      })
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
        <p className='row-element'><strong>Position</strong></p>
        <p className='row-element'><strong>Username</strong></p>
        <p className='row-element'><strong>Points</strong></p>
      </div>
      {elements}
    </div>
  )
}