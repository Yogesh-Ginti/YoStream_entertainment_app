import React from 'react';
import { FaBookmark } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RemoveToUserBookmarks } from '../../redux/async/bookmarks/bookmarksSlice';

function BCard({ sr, poster, title,type, orgId }) {
  const dispatch = useDispatch()
  const handleBookmarks = ()=>{
    dispatch(RemoveToUserBookmarks({orgId}))
  }
  return (
    <div>
      <div className='hover:scale-110 relative'>
        <div className='relative'>
          <NavLink to={`/${type}/${sr}`} >
            <img
              className='rounded-lg'
              src={poster ? `https://image.tmdb.org/t/p/w500/${poster}` : 'default-poster.jpg'}
              alt={title}
              height={150}
              width={150}
            />
          </NavLink>
          {/* Bookmark logo */}
          <span className='absolute opacity-80 hover:opacity-100 top-1 right-1 hover:bg-gray-400 bg-amber-400 rounded-full p-2'
          //here
            onClick={handleBookmarks}
          >
            <FaBookmark size={10} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default BCard;
