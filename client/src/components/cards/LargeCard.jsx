import React from 'react';
import { NavLink } from 'react-router-dom';

function LargeCard({ sr, type, poster, title }) {
  return (
    <div className='hover:scale-105'>
      {/* Link to the detail page of the movie or show */}
      <NavLink to={`/${type}/${sr}`}>
        <img
          src={poster ? `https://image.tmdb.org/t/p/w500/${poster}` : 'default-poster.jpg'} // Show poster or a default image
          alt={title}
          height={100}
          width={400}
        />
      </NavLink>
    </div>
  );
}

export default LargeCard;
