import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNowPlayingMoviesList } from '../../redux/async/MoviesSlice/nowPlayingMoviesListSlice';
import Card from '../cards/Card';

function NowPlayingMovies() {
  const dispatch = useDispatch();
  const { nowPlayingMoviesList, status, error } = useSelector(state => state.nowPlayingMoviesList);

  useEffect(() => {
    // Fetch now playing movies list if the status is idle
    if (status === 'idle') {
      dispatch(fetchNowPlayingMoviesList());
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
    <>
      {/* Displaying now playing movies */}
      <div className='mt-4'>
        <h1 className='p-2 text-2xl font-semibold'>Now Playing</h1>
        <div className='mt-2 flex gap-2 items-center flex-wrap justify-center sm:justify-normal'>
          {nowPlayingMoviesList.map((movie) => (
            <Card key={movie.id} sr={movie.id} poster={movie.poster_path} title={movie.title} type={"movies"} />
          ))}
        </div>
      </div>
    </>
  );
}

export default NowPlayingMovies;
