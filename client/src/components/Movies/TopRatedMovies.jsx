import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTopRatedMoviesList } from '../../redux/async/MoviesSlice/topRatedMoviesList'
import Card from '../cards/Card'
function TopRatedMovies() {
  const dispatch = useDispatch()
  const { topRatedMoviesList, status } = useSelector(state => state.topRatedMoviesList)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTopRatedMoviesList())
    }
  }, [])

  

  if (status === 'loading') {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <div className='mt-8'>
        <h1 className='p-2 text-2xl font-semibold'>Top Rated Movies</h1>
        <div className='mt-2 flex gap-2 items-center flex-wrap justify-center sm:justify-normal '>
          {topRatedMoviesList.map((movie) => <Card key={movie.id} sr={movie.id} poster={movie.poster_path} title={movie.title} type={"movies"} />
          )}
        </div>
      </div>
    </>
  )
}

export default TopRatedMovies
