import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTrendingShowsList } from '../../redux/async/SearchBar/TrendingSlice/trendingShowsSlice'; // Importing async action creator
import LargeCard from '../cards/LargeCard';
import Slider from "react-slick"; // Importing Slider component from react-slick library
import "slick-carousel/slick/slick.css"; // Importing slick carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Importing slick carousel theme CSS
import { settings } from '../../utils/sliderSetting'; // Importing slider settings

function TrendingShows() {
  const dispatch = useDispatch(); // Hook to dispatch actions
  const { trendingShowsList, status, error } = useSelector(state => state.trendingShowsList); // Selecting state from Redux store

  useEffect(() => { // Effect hook for fetching data
    // If the status is idle, dispatch the action to fetch trending shows list
    if (status === 'idle') {
      dispatch(fetchTrendingShowsList());
    }
  }, [dispatch, status]); // Dependencies: dispatch and status

  if (status === 'loading') { // Display spinner while loading
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
    <div className='m-2'>
      <h1 className='p-2 text-2xl font-semibold'>Trending Shows</h1>
      <div className='w-full p-4'>
        {/* Slider component with settings */}
        <Slider {...settings}>
          {/* Map through trending shows list and render LargeCard component for each show */}
          {trendingShowsList.map((show) => (
            <LargeCard key={show.id} type="tvshows" sr={show.id} poster={show.poster_path} title={show.title} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default TrendingShows;
