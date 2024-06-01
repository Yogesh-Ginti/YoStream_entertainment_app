import React, { useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import Logo from '../../components/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookmarks } from '../../redux/async/bookmarks/bookmarksSlice';
import BCard from '../../components/cards/BCard';

function Bookmarks() {
  const dispatch = useDispatch();
  const { userBookmarks, status, error } = useSelector(state => state.bookmarks.fetchedBookmarks); // Selecting user bookmarks and status from Redux store

  useEffect(() => {
    // Fetch user bookmarks when component mounts
    dispatch(fetchUserBookmarks());
  }, [dispatch]);

  if (status === 'loading') {
    // Display spinner while loading bookmarks
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  // Render error message if there's an error
  if (status === 'failed') {
    return (
      <div className="error-container">
        <p className="error-message">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className='h-full w-full py-2 sm:py-0'>
      {/* Header with logo and search bar */}
      <div className='sticky top-0 bg-black p-2 sm:p-0 w-full flex justify-between items-center z-50'>
        <div className='sm:hidden'><Logo /></div>
        <div className='sm:w-full px-4'><SearchBar /></div>
      </div>
      
      {/* Main content */}
      {userBookmarks.bookmarks && userBookmarks.bookmarks.length > 0 ? (
        // If there are bookmarks
        <div className='flex flex-col gap-6 p-2'>
          {/* Bookmarked movies */}
          <div className='p-1'>
            <h2 className='text-2xl font-semibold mb-2'>Bookmarked Movies</h2>
            <div className='flex flex-wrap gap-6'>
              {userBookmarks.bookmarks.map(media => media.mediaType === "movies" && <BCard key={media._id} orgId={media._id} sr={media.mediaId} title={media.mediaTitle} poster={media.mediaPoster} type={media.mediaType} />)}
            </div>
          </div>
          {/* Bookmarked TV shows */}
          <div className='p-1'>
            <h2 className='text-2xl font-semibold mb-2'>Bookmarked Tv Shows</h2>
            <div className='flex flex-wrap gap-6'>
              {userBookmarks.bookmarks.map(media => media.mediaType === "tvshows" && <BCard key={media._id} orgId={media._id} sr={media.mediaId} title={media.mediaTitle} poster={media.mediaPoster} type={media.mediaType} />)}
            </div>
          </div>
        </div>
      ) : (
        // If bookmarks array is empty
        <div className='p-2'>
          <h1 className='text-2xl font-semibold mx-2 px-4'>No Bookmarks</h1>
        </div>
      )}
    </div>
  );
}

export default Bookmarks;
