import {React, useEffect, useState} from 'react'
import './styles/RadarStyles.css'
import PlantInfo from './PlantInfo'
import './styles/MapStyles.css'
import pin from './imgs/pin.png' 
import { ref, get } from "firebase/database"
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import GoogleMapReact from 'google-map-react';

var userLat = 40.600526;
var userLng = -75.362015;
const id = ["404f73171fbd2fa8"];

export default function Radar(props) {

    const [data, setData] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedPlant, setSelectedPlant] = useState()
    const [invasiveList, setInvasiveList] = useState()

    function handle(index) {
        setSelectedIndex(index)
        setSelectedPlant(data[index])
    }

    async function loadData() {
        var d = []
        const query = ref(props.db, 'plants/')
        await get(query).then((plants) => {
            var plant = plants.val()
            for (var p in plant) {
                d.push({ name: plant[p].commonName, desc: plant[p].description, img: plant[p].image, frequency: .5 })
            }
        });
        setData(d)
    }

    function makeInvasive(highlighted) {
        return(
            data.map((plant, index) => {
                return(
                    <div className='side-button' id={highlighted===index ? 'highlighted':'unhighlighted'} key={index} onClick={() => handle(index)}>
                        <div className='table-frequency'>{100*(plant.frequency)+'%'}</div>
                        <div className='table-name'>{plant.name}</div>
                    </div>
                )
            }
        ))
    }

    useEffect(() => {
        setInvasiveList(makeInvasive(selectedIndex))
    }, [selectedPlant])

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        if(data.length != 0) {
            setSelectedPlant(data[selectedIndex])
        }
    }, [data])

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDJ7LumYrHTspXN4rQmFZBrpMx3Ugg7Oak',
        mapIds: { id }
    });
    if (!isLoaded) return <div>Loading...</div>

    return (
        <div className='plant-container'>
            <div className='plant-list'>
                {invasiveList}
            </div>
            <div className='plant-map'>
                {selectedPlant ? <PlantInfo name={selectedPlant.name} desc={selectedPlant.desc} img={selectedPlant.img} /> : <></>}
                <Map />
            </div>
        </div>
    )
}

const AnyReactComponent = ({ icon }) => <img src={icon}></img>;

function Map() {

    return (
        <GoogleMapReact
            zoom={12}
            center={{ lat: userLat, lng: userLng }}
            className="map-container"
        >
            <AnyReactComponent
                lat={userLat}
                lng={userLng}
                icon={pin}
            />
        </GoogleMapReact>
    );
} 
(function getUserLocation() {
    if (navigator.geolocation) {
        // get user's current position
        navigator.geolocation.getCurrentPosition(
            // success callback
            (position) => {
                userLat = position.coords.latitude;
                userLng = position.coords.longitude;
            },
            // error callback
            (error) => {
                console.error(error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
})();