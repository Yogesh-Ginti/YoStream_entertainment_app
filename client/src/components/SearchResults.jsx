import React from 'react'
import { useSelector } from 'react-redux'
import TrendingMovies from './Movies/TrendingMovies'
import TrendingShows from './Tv/TrendingShows'
import SearchCard from './SearchCard'
import SearchBar from './SearchBar';
import Logo from './Logo';


function SearchResults() {
  const { searchResults } = useSelector(state => state.searchBar)
  const { searchTerm } = useSelector(state => state.searchBar)
  return (
    <>
      <div className='sticky top-0 bg-black p-2 sm:p-0 w-full flex justify-between items-center z-50'>
        <div className='sm:hidden'><Logo /></div>
        <div className='sm:w-full px-4'><SearchBar /></div>
      </div>
      {
        searchTerm ?
        <div className='mt-4'>
          <h1 className='text-2xl font-semibold'>Top Result for "{searchTerm}" </h1>
          <div className='flex flex-wrap gap-2'>
            {searchResults.map((item) => (
              <SearchCard
                key={item.id} sr={item.id} poster={item.poster_path} title={item.name || item.title}
                vote={item.vote_average} type={item.media_type}
              />
            )
            )}
          </div>
        </div> :
        <div className='p-1'>
        <TrendingMovies />
        <TrendingShows />
      </div>
        
      }
    </>
  )
}

export default SearchResults
