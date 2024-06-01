import React from 'react';
import TrendingMovies from "../../components/Movies/TrendingMovies";
import TrendingShows from "../../components/Tv/TrendingShows";
import SearchBar from '../../components/SearchBar';
import Logo from '../../components/Logo';

function Homepage() {
  return (
    <div className='w-full sm:px-1 py-2 sm:py-0'>
      <div className='sticky top-0 bg-black p-2 sm:p-0 w-full flex justify-between items-center z-50'>
        <div className='sm:hidden'><Logo /></div>
        <div className='sm:w-full px-4'><SearchBar /></div>
      </div>
      <div>
        <TrendingMovies />
        <TrendingShows />
      </div>
    </div>
  );
}

export default Homepage;
