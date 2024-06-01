import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieContent } from '../../redux/async/MoviesSlice/movieContentSlice';
import { useParams } from 'react-router-dom';

function MovieContent() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieContent, status, error } = useSelector(state => state.movieContent);
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movieContent.poster_path}`;

  useEffect(() => {
    dispatch(fetchMovieContent(id));
  }, [dispatch, id]);

  
  if (status === 'loading') {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <div
        className={`bg-cover bg-center h-[90%] w-full  overflow-hidden relative`}
        style={{ backgroundImage: `url(${imageUrl})` }}>
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        <div className='relative p-2 h-full flex flex-col sm:flex-row justify-end sm:justify-normal items-end  sm:items-end'>
          <div className='w-full sm:w-[60%] text-white'>
            <h1 className='m-2 text-4xl font-bold  '>{movieContent.original_title}</h1>
            <span className='m-2 flex gap-2 text-white'>
              <li className='text-yellow-400  font-semibold'>{movieContent.vote_average}</li>
              <li className='font-semibold '>{movieContent.runtime} Min</li>
              {movieContent.spoken_languages &&
                <li className='font-semibold '>{movieContent.spoken_languages.map(lang=>lang.name)}</li>
              }
            </span>
            <p className='shadow-lg m-2 '>{movieContent.overview}</p>
            {movieContent.genres && (
              <span className='flex font-medium gap-2 m-2'>
                {movieContent.genres.map(e => (
                  <span key={e.id} className=''>{e.name}|</span>
                ))}
              </span>
            )}
          </div>
          <div className='mx-auto mb-10'>
            <button className='text-2xl bg-red-500 font-semibold h-16 w-52 shadow-md rounded-lg'>Watch</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieContent;
