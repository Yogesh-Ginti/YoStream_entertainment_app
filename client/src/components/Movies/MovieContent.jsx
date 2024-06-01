import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieContent } from '../../redux/async/MoviesSlice/movieContentSlice';
import { useParams } from 'react-router-dom';

function MovieContent() {
  const { id } = useParams(); // Extracting movie ID from the URL params
  const dispatch = useDispatch();
  const { movieContent, status, error } = useSelector(state => state.movieContent); // Getting movie content state from Redux store
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movieContent.poster_path}`; // Generating URL for movie poster image

  useEffect(() => {
    // Fetch movie content data when component mounts or movie ID changes
    dispatch(fetchMovieContent(id));
  }, [dispatch, id]);

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
      {/* Movie content */}
      <div
        className={`bg-cover bg-center h-[90%] w-full  overflow-hidden relative`}
        style={{ backgroundImage: `url(${imageUrl})` }}>
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        {/* Movie details */}
        <div className='relative p-2 h-full flex flex-col sm:flex-row justify-end sm:justify-normal items-end  sm:items-end'>
          <div className='w-full sm:w-[60%] text-white'>
            {/* Movie title */}
            <h1 className='m-2 text-4xl font-bold  '>{movieContent.original_title}</h1>
            {/* Movie rating, runtime, and languages */}
            <span className='m-2 flex gap-2 text-white'>
              <li className='text-yellow-400  font-semibold'>{movieContent.vote_average}</li>
              <li className='font-semibold '>{movieContent.runtime} Min</li>
              {movieContent.spoken_languages &&
                <li className='font-semibold '>{movieContent.spoken_languages.map(lang=>lang.name)}</li>
              }
            </span>
            {/* Movie overview */}
            <p className='shadow-lg m-2 '>{movieContent.overview}</p>
            {/* Movie genres */}
            {movieContent.genres && (
              <span className='flex font-medium gap-2 m-2'>
                {movieContent.genres.map(e => (
                  <span key={e.id} className=''>{e.name}|</span>
                ))}
              </span>
            )}
          </div>
          {/* Watch button */}
          <div className='mx-auto mb-10'>
            <button className='text-2xl bg-red-500 font-semibold h-16 w-52 shadow-md rounded-lg'>Watch</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieContent;
