import React, { useEffect, useState } from 'react'
import './styles/LeaderboardStyles.css'
import {ref, onValue} from "firebase/database"
export default function LeaderBoard(props) {
  const [elements, setElements] = useState()
  function fetchLeaderboards() {
    const query = ref(props.db, 'users/' + 1)
    onValue(query, (user) => {
      const data = user.val()
      console.log(data)
    })
    const data = [
      {
        user: 'Alice',
        points: 23,
      },
      {
        user: 'Mike Hawk',
        points: 12,
      },
      {
        user: 'Jerry',
        points: 56,
      }
    ]
    setElements(
      data.map((userData, index) => {
        return( 
          <div className='row' id={index%2 ? 'white':'grey'}>
            <p className='row-element'>#{index+1}</p>
            <p className='row-element'>{userData.user}</p>
            <p className='row-element'>{userData.points}</p>
          </div>
        );
      })
    )
  }
  console.log(elements)

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