import {React, useEffect, useState} from 'react'
import './styles/RadarStyles.css'
import img from './imgs/tree.jpg'
import PlantInfo from './PlantInfo'
import { ref, get } from "firebase/database"

var data = [
    {
        name: 'Big Leaf',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        img: img,
        frequency: .8,
        selected: true
    },
    {
        name: 'Medium Leaf',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        img: img,
        frequency: 0,
        selected: false
    },
    {
        name: 'Small Leaf',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        img: img,
        frequency: .2,
        selected: false
    },
]

export default function Radar(props) {

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedPlant, setSelectedPlant] = useState(data[selectedIndex])
    const [invasiveList, setInvasiveList] = useState(makeInvasive(selectedIndex))

    function handle(index) {
        setSelectedIndex(index)
        setSelectedPlant(data[index])
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
            })
        )
    }

    async function loadData() {
        var data = []
        const query = ref(props.db, 'plants/')
        await get(query).then((plants) => {
            var plant = plants.val()
            for (var p in plant) {
                console.log(p)
                // data.push({})
                // userData.push({ username: user[u].username, points: user[u].points })
            }
        });
    }

    useEffect(() => {
        setInvasiveList(makeInvasive(selectedIndex))
    }, [selectedPlant])

    useEffect(() => {
        var plantData = loadData()
        
        // plantData.sort((a, b) => b.frequency - a.frequency);
    })

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
            <PlantInfo name={selectedPlant.name} desc={selectedPlant.desc} img={selectedPlant.img}/>
        </div>
    )
}