import React from 'react'
import './App.css'
import {Link} from 'react-router-dom'

function Nav() {

  const navStyle={
    color: 'white',
    
  }

  return (
    <nav>
      <h1>LAMBDA Eats</h1>
        <ul className="nav-links">
          <Link to ='/' >
            <li  style={navStyle}>Home</li>
          </Link>
          <Link to ='/form'>
            <li style={navStyle} >Order</li>
          </Link>
          <Link to ='/help'>

            <li style={navStyle}>Help</li>
          </Link>
      </ul>
    </nav>
  )
}

export default Nav