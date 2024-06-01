import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaBookmark } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { AddToUserBookmarks } from '../redux/async/bookmarks/bookmarksSlice';




function SearchCard({ sr, poster, title, vote, type }) {
  const dispatch = useDispatch()

  if (type === "tv") {
    type = "tvshows"
  } else {
    type = "movies"
  }

  const handleBookmarks = ()=>{
    dispatch(AddToUserBookmarks({sr, poster, title, type}))
  }

  return (
    <div className='hover:scale-105 m-2'>
      <div className="relative">
        <div className="relative">
          <NavLink to={`/${type}/${sr}`}>
            <img
              src={poster ? `https://image.tmdb.org/t/p/w500/${poster}` : 'default-poster.jpg'}
              alt={title} height={100} width={250} />
          </NavLink>
          {/* Bookmark logo */}
          <span className='absolute opacity-80 top-1 right-1 bg-gray-400 hover:bg-amber-400 rounded-full p-2'
            //here
            onClick={handleBookmarks}
          >
            <FaBookmark size={10} />
          </span>
        </div>
      </div>
      <div className='p-2'>
        <div className='flex gap-4'>
          <span className='text-yellow-500 px-4'>{vote}</span>
          <span>{type}</span>
        </div>
        <div className='flex  w-[70%]'>
          <span>{title}</span>
        </div>

      </div>


    </div>
  )
}



export default SearchCard
