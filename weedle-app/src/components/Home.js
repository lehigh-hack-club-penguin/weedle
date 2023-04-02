import React from 'react'
import './styles/HomeStyles.css'
export default function Home() {
  return (
    <>
      <div className='home-container'>
        <div className='home-title'>Weasel the Weeds</div>
        <div className='home-content'>
          <div className='home-text' id='p1'>
            Weedle empowers everday people by giving them the ability to fight back against invasive
            plant species. Simply report an invasive species by "weedling" it and burning it off the face
            of the earth. By contributing to the mortal demise of these invasive monsters, each user is 
            rewarded points. The greater amount of points you have, the higher up on the leaderboard 
            you climb!
          </div>
          <div className='home-text' id='p2'>
            Weedle pulls data from the US Department of Agriculture to find invasive plants in the 
            United States. Then that data is compared to sightings posted on INaturalist.com. This
            comparison creates a list of plants by you sorted by frequencies. In addition, a Google
            Maps API is employed to show you the invasive sightings in your area. 
          </div>
        </div>
      </div>
    </>
  )

}