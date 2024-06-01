import React from 'react';
import TvContent from '../../components/Tv/TvContent';
import SearchBar from '../../components/SearchBar';
import Logo from '../../components/Logo';

function TvShowsDetails() {
  return (
    <div className='py-2 sm:py-0 w-full h-full'>
      {/* Sticky Navigation Bar */}
      <div className='sticky top-0 bg-black p-2 sm:p-0 sm:w-full flex flex-col sm:flex-row justify-between items-center z-50'>
        <div className='sm:hidden'><Logo /></div> {/* Logo */}
        <div className='sm:w-full px-4'><SearchBar /></div> {/* Search Bar */}
      </div>
      {/* TV Show Content */}
      <TvContent />
    </div>
  );
}

export default TvShowsDetails;
