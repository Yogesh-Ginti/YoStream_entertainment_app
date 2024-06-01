import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUpcomingMoviesList } from '../../redux/async/MoviesSlice/upComingMoviesListSlice';
import LargeCard from '../cards/LargeCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from '../../utils/sliderSetting';


function UpComingMovies() {
  const dispatch = useDispatch();
  const { upcomingMoviesList, status } = useSelector(state => state.upComingMoviesList);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUpcomingMoviesList());
    }
  }, [dispatch, status]);

  

  if (status === 'loading') {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className='m-2'>
      <h1 className='p-2 text-2xl font-semibold'>Upcoming Movies</h1>
      <div className='w-full p-4'>
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
