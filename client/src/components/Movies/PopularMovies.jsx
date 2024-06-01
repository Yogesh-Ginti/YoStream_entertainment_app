import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPopularMoviesList } from '../../redux/async/MoviesSlice/popularMoviesListSlice'
import Card from '../cards/Card'

function PopularMovies() {
  const dispatch = useDispatch()
  const { popularMoviesList, status } = useSelector(state => state.popularMoviesList)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPopularMoviesList())
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
        <h1 className='p-2 text-2xl font-semibold'>Popular Movies</h1>
        <div className='mt-2 flex gap-2 items-center flex-wrap justify-center sm:justify-normal'>
          {popularMoviesList.map((movie) => <Card key={movie.id} sr={movie.id} poster={movie.poster_path} title={movie.title} type={"movies"} />
          )}
        </div>
      </div>
    </>
  )
}

export default PopularMovies
