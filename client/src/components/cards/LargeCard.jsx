import React from 'react'
import { NavLink } from 'react-router-dom'


function LargeCard({sr, type, poster, title }) {

  return (
    <div className='hover:scale-105'>
      <NavLink to={`/${type}/${sr}`}>
        <img
          src={poster ? `https://image.tmdb.org/t/p/w500/${poster}` : 'default-poster.jpg'}
          alt={title} height={100} width={400} />
      </NavLink>
    </div>
  )
}



export default LargeCard
