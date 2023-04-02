import React from 'react'
import './styles/NavbarStyle.css'
import { Link } from 'react-router-dom';
import Login from './Login'

export default function Navbar() {
  return (
    <div className='navbar'>
      <Link className='title link' to='/'>Weedle</Link>
      <Link className='link' id='radar-link' to='/radar'>Radar</Link>
      <Link className='link' id='leaderboard-link' to='/leaderboard'>Leaderboard</Link>
    </div>
  )
}
