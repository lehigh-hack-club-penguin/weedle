import {React, useEffect, useState, useRef} from 'react'
import './styles/RadarStyles.css'
import PlantInfo from './PlantInfo'
import './styles/MapStyles.css'
import pin from './imgs/pin.png'
import dot from './imgs/dot.png'
import { ref, get } from "firebase/database"
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import GoogleMapReact from 'google-map-react';

var userLat = 40.600526;
var userLng = -75.362015;

export default function Radar(props) {

    const [data, setData] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedPlant, setSelectedPlant] = useState()
    const [invasiveList, setInvasiveList] = useState()

    function handle(index) {
        setSelectedIndex(index)
        setSelectedPlant(data[index])
    }

    function calculateDistance(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    async function loadData() {
        var d = []
        var frequency = []
        const query = ref(props.db, 'plants/')
        await get(query).then((plants) => {
            var plant = plants.val()
            for (var p in plant) {
                var counter = 0
                var thisPlant = plant[p].observations.data
                for (var i = 0; i < thisPlant['decimalLatitude'].length; i++) {
                    if (calculateDistance(userLat, userLng, thisPlant['decimalLatitude'][i], thisPlant['decimalLongitude'][i]) < 500) {
                        counter++
                    }
                }
                frequency.push(counter)
                d.push({ name: plant[p].commonName, desc: plant[p].description, img: plant[p].image, frequency: 0 })
            }
            var sum=0
            for(var i=0; i<d.length; i++) {
                sum += frequency[i]
            }
            for (var i=0; i<d.length; i++) {
                d[i]['frequency'] = (100*(frequency[i] / sum)).toFixed(2)
            }
        });
        d.sort((a, b) => b.frequency - a.frequency);
        setData(d)
    }

    function makeInvasive(highlighted) {
        return(
            data.map((plant, index) => {
                return(
                    <div className='side-button' id={highlighted===index ? 'highlighted':'unhighlighted'} key={index} onClick={() => handle(index)}>
                        <div className='table-frequency'>{(plant.frequency)+'%'}</div>
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
    });
    if (!isLoaded) return <div>Loading...</div>

    return (
        <div className='plant-container'>
            <div className='plant-list'>
                {invasiveList}
            </div>
            <div className='plant-map'>
                {selectedPlant ? <PlantInfo name={selectedPlant.name} desc={selectedPlant.desc} img={selectedPlant.img} /> : <></>}
                {selectedPlant ? <Map plant={selectedPlant.name} db={props.db}/> : <></>}
            </div>
        </div>
    )
}

const Mark = ({ icon }) => <div style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }}><img src={icon}></img></div>;

function Map(props) {
    
    const [marks, setMarks] = useState()
    const [positions, setPositions] = useState()

    async function loadLocations() {
        var d = []
        const query = ref(props.db, 'plants/')
        await get(query).then((plants) => {
            var plant = plants.val()
            for (var p in plant) {
                if(plant[p].commonName === props.plant) {
                    var coords = plant[p].observations.data
                    var lat = coords['decimalLatitude']
                    var log = coords['decimalLongitude']
                    for(var i=0; i<lat.length; i++) {
                        d.push({x: lat[i], y: log[i]})
                    }
                    break
                }
            }
        });
        setPositions(d)
    }

    function makePos() {
        return (positions.map((pos, index) => {
            return <Mark lat={pos.x} lng={pos.y} icon={pin} key={index}/>
        }))
    }

    useEffect(() => {
        loadLocations()
    }, [props.plant])

    useEffect(() => {
        if(positions!=null && positions.length !== 0) {
            setMarks(makePos())
        }
    }, [positions])

    return (
        <GoogleMapReact
            zoom={12}
            center={{ lat: userLat, lng: userLng }}
            className="map-container"
        >
            <Mark lat={userLat} lng={userLng} icon={dot}/>
            {marks}
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