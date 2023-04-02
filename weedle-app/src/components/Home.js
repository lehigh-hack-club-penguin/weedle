import React from 'react'
import './styles/HomeStyles.css'
import Card from 'react-bootstrap/Card'
import logo from '../logo.svg'
export default function Home() {
  return (
    <>
      <div className='main-container'>
        <div className='page-title'>Weasel the Weeds</div>
        {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={logo} alt="Weedle Logo" style={{ width: '5%', height: 'auto' }} />
        </div> */}
        <div className='home-content' style={{position: 'relative'}}>
        <Card style={{ height: '35%', width: '50rem' }}>
          <Card.Body>
            <Card.Title>Gamifying 👾 Sustainability Into Habit</Card.Title>
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
        <Card style={{ height: '10%',width: '50rem'}}>
          <Card.Body>
            <Card.Title>Powered ⚡️ By The Big Guys</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Weedle pulls data from the US Department of Agriculture to find invasive plants in the 
              United States</Card.Subtitle>
            <Card.Text>
               Then that data is compared to sightings posted on iNaturalist.org : a citizen science project and 
               online social network of naturalists, citizen scientists, and biologists built on the concept of mapping 
               and sharing observations of biodiversity across the globe.
            </Card.Text>
          </Card.Body>
        </Card>
        </div>
        <br></br><br></br>
        <br></br><br></br>
        <br></br><br></br>
        <br></br><br></br>
        <br></br>
        <Card style={{ width: '50rem' }}>
        <Card.Body>
            <Card.Title>Raising 🙌 Awareness To Your Surroundings</Card.Title>
            <Card.Subtitle className="mb-2 text-muted"> Weedle shows how your neirghborhood and surrounding area is affected</Card.Subtitle>
            <Card.Text>
              We compare and sort which invasive species is most impacting your area. You can view observation data, through
              Google Map API  to show you the invasive sightings in your area. This also comes into play in our point system where the 
              rarer the species in your area the more reward you get in reporting it!
            </Card.Text>
          </Card.Body>
        </Card>
        </div>
      </div>
    </>
  )

}