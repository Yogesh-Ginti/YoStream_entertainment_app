import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTVContent } from '../../redux/async/TVSlice/tvContentSlice'; // Importing async action creator
import { useParams } from 'react-router-dom';

function TvContent() {
  const { id } = useParams(); // Extracting id from URL params
  const dispatch = useDispatch(); // Hook to dispatch actions
  const { tvContent, status, error } = useSelector(state => state.tvContent); // Selecting state from Redux store

  useEffect(() => { // Effect hook for fetching data
    // Dispatch the action to fetch TV content with the specified id
    dispatch(fetchTVContent(id));
  }, [dispatch, id]); // Dependencies: dispatch and id

  // Constructing the image URL for the TV content poster
  const imageUrl = `https://image.tmdb.org/t/p/w500/${tvContent.poster_path}`;

  if (status === 'loading') { // Display spinner while loading
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    )
  }

  // Render error message if there's an error
  if (status === 'failed') {
    return (
      <div className="error-container">
        <p className="error-message">Error: {error}</p>
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
      {/* Background image container */}
      <div
        className={`bg-cover bg-center h-[90%] w-full  overflow-hidden relative`}
        style={{ backgroundImage: `url(${imageUrl})` }}>
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        {/* Content container */}
        <div className='relative p-2 h-full flex flex-col sm:flex-row justify-end sm:justify-normal items-end  sm:items-end'>
          {/* TV content details */}
          <div className='w-full sm:w-[60%] text-white'>
            <h1 className='m-2 text-4xl font-bold  '>{tvContent.original_name}</h1>
            {/* Metadata */}
            <span className='m-2 flex gap-2 text-white'>
              <li className='text-yellow-400  font-semibold'>{tvContent.vote_average}</li>
              <li className='font-semibold '>{tvContent.episode_run_time} Min</li>
              {/* Displaying spoken languages */}
              {tvContent.spoken_languages &&
                <li className='font-semibold '>{tvContent.spoken_languages.map(lang=>lang.name)}</li>
              }
            </span>
            <p className='shadow-lg m-2 '>{tvContent.overview}</p>
            {/* Displaying genres */}
            {tvContent.genres && (
              <span className='flex font-medium gap-2 m-2'>
                {tvContent.genres.map(e => (
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

export default TvContent;
