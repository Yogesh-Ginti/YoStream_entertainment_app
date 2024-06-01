import React from 'react';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <div>
      {/* Link to the home page */}
      <Link to="/">
        {/* Logo image */}
        <img
          className='rounded-xl'
          src="./images/logo.png" alt="logo" sm:height='100' width='70' /> {/* Provide appropriate path to your logo image */}
      </Link>
    </div>
  );
}

export default Logo;
