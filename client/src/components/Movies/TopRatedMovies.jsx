import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTopRatedMoviesList } from '../../redux/async/MoviesSlice/topRatedMoviesList';
import Card from '../cards/Card';

function TopRatedMovies() {
  const dispatch = useDispatch();
  const { topRatedMoviesList, status, error } = useSelector(state => state.topRatedMoviesList);

  useEffect(() => {
    // Fetch top rated movies list if the status is idle
    if (status === 'idle') {
      dispatch(fetchTopRatedMoviesList());
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
      {/* Displaying top rated movies */}
      <div className='mt-8'>
        <h1 className='p-2 text-2xl font-semibold'>Top Rated Movies</h1>
        <div className='mt-2 flex gap-2 items-center flex-wrap justify-center sm:justify-normal'>
          {topRatedMoviesList.map((movie) => (
            <Card key={movie.id} sr={movie.id} poster={movie.poster_path} title={movie.title} type={"movies"} />
          ))}
        </div>
      </div>
    </>
  );
}

export default TopRatedMovies;
