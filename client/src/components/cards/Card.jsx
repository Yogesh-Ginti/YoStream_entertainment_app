import React from 'react';
import { FaBookmark } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AddToUserBookmarks } from '../../redux/async/bookmarks/bookmarksSlice';

function Card({sr, poster, title,type }) {
  const dispatch = useDispatch()
  const handleBookmarks = ()=>{
    dispatch(AddToUserBookmarks({sr, poster, title, type}))
  }
  return (
    <div className='hover:scale-110 relative'>
      <div className='relative'>
        <NavLink to={`${sr}`} >
          <img
            className='rounded-lg'
            src={poster ? `https://image.tmdb.org/t/p/w500/${poster}` : 'default-poster.jpg'}
            alt={title}
            height={150}
            width={150}
          />
        </NavLink>
        {/* Bookmark logo */}
        <span className='absolute opacity-80 hover:opacity-100 top-1 right-1 bg-gray-400 hover:bg-amber-400 rounded-full p-2'
          onClick={handleBookmarks}
        >
          <FaBookmark size={10} />
        </span>
      </div>
    </div>
  );
}

export default Card;
