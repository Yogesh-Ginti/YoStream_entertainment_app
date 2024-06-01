import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <div>
      <Link to="/">
        <img
          className='rounded-xl'
          src="./images/logo.png" alt="logo" sm:height='100' width='70' /></Link>
    </div>
  )
}

export default Logo
