import React from 'react'
import './styles/HomeStyles.css'
import Card from 'react-bootstrap/Card';
export default function Home() {
  return (
    <>
      <div className='home-container'>
        <div className='home-title'>Weasel the Weeds</div>
        <div className='home-content' style={{position: 'relative'}}>
        <Card style={{ width: '50rem' }}>
          <Card.Body>
            <Card.Title>Gamifying Sustainability Into Habit</Card.Title>
            <Card.Subtitle className="mb-2 text-muted"> Weedle empowers everday people by giving them the ability to fight back against invasive
              plants</Card.Subtitle>
            <Card.Text>
              Simply report an invasive species by "weedling" it and burning it off the face
              of the earth. By contributing to the mortal demise of these invasive monsters, each user is 
              rewarded points. The greater amount of points you have, the higher up on the leaderboard 
              you climb!
            </Card.Text>
          </Card.Body>
        </Card>
        <br></br><br></br>
        <div style={{position: 'absolute', right:'7%'}}>
        <Card style={{ width: '50rem'}}>
          <Card.Body>
            <Card.Title>Powered By The Big Guys</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Weedle pulls data from the US Department of Agriculture to find invasive plants in the 
              United States</Card.Subtitle>
            <Card.Text>
               Then that data is compared to sightings posted on INaturalist.com. This
              comparison creates a list of plants by you sorted by frequencies. In addition, a Google
              Maps API is employed to show you the invasive sightings in your area.
            </Card.Text>
          </Card.Body>
        </Card>
        </div>
          {/* <div className='home-text' id='p1'>
            Weedle empowers everday people by giving them the ability to fight back against invasive
            plant species. Simply report an invasive species by "weedling" it and burning it off the face
            of the earth. By contributing to the mortal demise of these invasive monsters, each user is 
            rewarded points. The greater amount of points you have, the higher up on the leaderboard 
            you climb!
          </div> */}
          {/* <div className='home-text' id='p2'>
            Weedle pulls data from the US Department of Agriculture to find invasive plants in the 
            United States. Then that data is compared to sightings posted on INaturalist.com. This
            comparison creates a list of plants by you sorted by frequencies. In addition, a Google
            Maps API is employed to show you the invasive sightings in your area. 
          </div> */}
        </div>
      </div>
    </>
  )

}