import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopRatedShowsList } from '../../redux/async/TVSlice/topRatedShowsList'; // Importing async action creator
import Card from '../cards/Card';

function TopRatedShows() {
  const dispatch = useDispatch(); // Hook to dispatch actions
  const { topRatedShowsList, status, error } = useSelector(state => state.topRatedShowsList); // Selecting state from Redux store

  useEffect(() => { // Effect hook for fetching data
    // If the status is idle or error, dispatch the action to fetch top-rated shows list
    if (status === "idle" || status === "error") {
      dispatch(fetchTopRatedShowsList());
    }
  }, [dispatch, status]); // Dependencies: dispatch and status

  if (status === 'loading') { // Display spinner while loading
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (status === 'error') { // Display error message if there's an error
    return (
      <div className="error-message">
        Error: {error}
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
    <>
      <div className='m-2'>
        <h1 className='p-2 text-2xl font-semibold'>Top Rated Shows</h1>
        <div className='mt-2 flex gap-2 items-center flex-wrap justify-center sm:justify-normal'>
          {/* Map through top-rated shows list and render Card component for each show */}
          {topRatedShowsList && topRatedShowsList.map((show) => (
            <Card key={show.id} sr={show.id} poster={show.poster_path} title={show.original_name} type={"tvshows"} />
          ))}
        </div>
      </div>
    </>
  );
}

export default TopRatedShows;
