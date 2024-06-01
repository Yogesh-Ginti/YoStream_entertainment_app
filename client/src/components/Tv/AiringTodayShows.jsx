import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAiringTodayShowsList } from '../../redux/async/TVSlice/airingTodayShowsList';
import { settings } from '../../utils/sliderSetting'; // Assuming settings are predefined in a separate file
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LargeCard from '../cards/LargeCard';

function AiringTodayShows() {
  const dispatch = useDispatch();
  const { airingTodayShowsList, status, error } = useSelector(state => state.airingTodayShowsList);

  useEffect(() => {
    // Fetch airing today shows list if the status is idle
    if (status === "idle") {
      dispatch(fetchAiringTodayShowsList());
    }
  }, [dispatch, status]); // Adding dispatch and status as dependencies for useEffect

  // Render spinner while data is loading
  if (status === 'loading') {
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
      {/* Displaying airing today shows */}
      <h1 className='p-2 text-2xl font-semibold'>Airing Today</h1>
      <div className='w-full p-4'>
        {/* Slider component for displaying large cards */}
        <Slider {...settings}>
          {airingTodayShowsList && airingTodayShowsList.map((show) => (
            <LargeCard key={show.id} type="tvshows" sr={show.id} poster={show.poster_path} title={show.title} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default AiringTodayShows;
