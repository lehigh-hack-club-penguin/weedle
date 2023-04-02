import {React, useEffect, useState} from 'react'
import './styles/RadarStyles.css'
import PlantInfo from './PlantInfo'
import { ref, get } from "firebase/database"

export default function Radar(props) {

    const [data, setData] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedPlant, setSelectedPlant] = useState()
    const [invasiveList, setInvasiveList] = useState()
    const [fetched, setFetched] = useState(false)

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

    return (
        <div className='container'>
            <div className='plant-list'>
                <div className='invasive-title'>
                    <div className='center-text'>Invasive Plants</div>
                </div>
                <div className='plant-list'>
                    {invasiveList}
                </div>
            </div>
            {selectedPlant ? <PlantInfo name={selectedPlant.name} desc={selectedPlant.desc} img={selectedPlant.img}/>: <></>}
        </div>
    )
}