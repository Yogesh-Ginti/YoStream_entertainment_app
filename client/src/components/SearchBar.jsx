import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { MdClear } from "react-icons/md";
import { fetchSearchItems, setSearchTerm, resetSearchTerm } from '../redux/async/SearchBar/searchBarSlice';

function SearchBar() {
  const dispatch = useDispatch()
  const { searchTerm } = useSelector(state => state.searchBar)
  const { searchResults } = useSelector(state => state.searchBar)
  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchSearchItems(searchTerm))
    }, 2000)
  }, [searchTerm])

  
  return (
    <div className='mb-4 flex gap-3 items-center'>
      <FiSearch size={20} />
      <div className='p-1 sm:w-[90%] pr-6 flex items-center justify-between border-2 border-gray-600 gap-4 rounded-lg'>
        <Link  to="/search">
          <input className='bg-black sm:px-3 sm:w-[500px] outline-none'
            type="text"
            placeholder='Search for Movies and TV Shows'
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            value={searchTerm}
          />
        </Link>
        
        
        {searchTerm && <span onClick={()=>dispatch(resetSearchTerm())}  className=' bg-gray-400 rounded-full'><Link to="/"><MdClear /></Link></span>}
      </div>

    </div>
  )
}

export default SearchBar

//