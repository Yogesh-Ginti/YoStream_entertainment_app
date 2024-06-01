import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTopRatedShowsList } from '../../redux/async/TVSlice/topRatedShowsList'
import Card from '../cards/Card'

function TopRatedShows() {
  const dispatch = useDispatch()
  const {topRatedShowsList, status, error} = useSelector(state => state.topRatedShowsList)

  useEffect(()=>{
    if(status==="idle"){
      dispatch(fetchTopRatedShowsList())
    }
  },[])

  if (status === 'loading') {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <div className='m-2'>
        <h1 className='p-2 text-2xl font-semibold'>Top Rated Shows</h1>
        <div className='mt-2 flex gap-2 items-center flex-wrap justify-center sm:justify-normal'>
          {topRatedShowsList.map((show) => <Card key={show.id} sr={show.id} poster={show.poster_path} title={show.original_name} type={"tvshows"} />
          )}
        </div>
      </div>
    </>
  )
}

export default TopRatedShows
