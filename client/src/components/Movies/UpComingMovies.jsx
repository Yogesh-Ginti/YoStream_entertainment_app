import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUpcomingMoviesList } from '../../redux/async/MoviesSlice/upComingMoviesListSlice';
import LargeCard from '../cards/LargeCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from '../../utils/sliderSetting'; // Assuming settings are predefined in a separate file

function UpComingMovies() {
  const dispatch = useDispatch();
  const { upcomingMoviesList, status, error } = useSelector(state => state.upComingMoviesList);

  useEffect(() => {
    // Fetch upcoming movies list if the status is idle
    if (status === 'idle') {
      dispatch(fetchUpcomingMoviesList());
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
      {/* Displaying upcoming movies */}
      <h1 className='p-2 text-2xl font-semibold'>Upcoming Movies</h1>
      <div className='w-full p-4'>
        {/* Slider component for displaying large cards */}
        <Slider {...settings}>
          {upcomingMoviesList.map((movie) => (
            <LargeCard key={movie.id} type="movies" sr={movie.id} poster={movie.poster_path} title={movie.title} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default UpComingMovies;
