import React from 'react'
import './styles/PlantInfoStyles.css'
export default function PlantInfo(props) {
    return (
        <div className='plant-map'>
            <div className='plant-info'>
                <div className='plant-name'>{props.name}</div>
                <div className='plant-description'>{props.desc}</div>
            </div>
            <img className='plant-img' src={props.img}></img>
        </div>
    )
}
