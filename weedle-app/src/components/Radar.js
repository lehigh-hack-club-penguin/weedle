import React from 'react'
import './styles/RadarStyles.css'
export default function Radar() {
    return (
        <div className='container'>
            <div className='plant-list'>
                <div className='invasive-title'>
                    <div className='center-text'>Invasive Plants</div>
                </div>
            </div>
            <div className='plant-map'>
                <div className='plant-name'>Big Leaf</div>
                <div className='plant-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            </div>
        </div>
    )
}