import React from 'react'
import MovieContent from '../../components/Movies/MovieContent'
import SearchBar from '../../components/SearchBar';
import Logo from '../../components/Logo';

function MoviesDetails() {
  return (
    <div className='w-full h-full'>
      <div className='sticky top-0 bg-black p-2 sm:p-0 sm:w-full flex flex-col sm:flex-row justify-between items-center z-50'>
        <div className='sm:hidden'><Logo /></div>
        <div className='sm:w-full px-4'><SearchBar /></div>
      </div>
      <MovieContent />
    </div>
  )
}

export default MoviesDetails
