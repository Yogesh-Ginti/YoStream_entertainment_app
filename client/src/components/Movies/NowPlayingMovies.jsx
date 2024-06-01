import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchNowPlayingMoviesList } from '../../redux/async/MoviesSlice/nowPlayingMoviesListSlice'
import Card from '../cards/Card'

function NowPlayingMovies() {
  const dispatch = useDispatch()
  const { nowPlayingMoviesList, status } = useSelector(state => state.nowPlayingMoviesList)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNowPlayingMoviesList())
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
      <div className='mt-4'>
        <h1 className='p-2 text-2xl font-semibold'>Now Playing</h1>
        <div className='mt-2 flex gap-2 items-center flex-wrap justify-center sm:justify-normal'>
          {nowPlayingMoviesList.map((movie) => <Card key={movie.id} sr={movie.id} poster={movie.poster_path} title={movie.title} type={"movies"} />
          )}
        </div>
      </div>
    </>
  )
}

export default NowPlayingMovies
