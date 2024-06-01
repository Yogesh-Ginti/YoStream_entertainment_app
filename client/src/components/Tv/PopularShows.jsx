import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularShowsList } from '../../redux/async/TVSlice/popularShowsList';
import Card from '../cards/Card';

function PopularShows() {
  const dispatch = useDispatch();
  const { popularShowsList, status, error } = useSelector(state => state.popularShowsList);

  useEffect(() => {
    // Fetch popular shows list if the status is idle
    if (status === "idle") {
      dispatch(fetchPopularShowsList());
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
      {/* Displaying popular shows */}
      <div className='m-2'>
        <h1 className='p-2 text-2xl font-semibold'>Popular Shows</h1>
        <div className='mt-2 flex gap-2 items-center flex-wrap justify-center sm:justify-normal'>
          {popularShowsList.map((show) => (
            <Card key={show.id} sr={show.id} poster={show.poster_path} title={show.original_name} type={"tvshows"} />
          ))}
        </div>
      </div>
    </>
  );
}

export default PopularShows;
