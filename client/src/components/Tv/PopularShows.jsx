import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPopularShowsList } from '../../redux/async/TVSlice/popularShowsList'
import Card from '../cards/Card'

function PopularShows() {
  const dispatch = useDispatch()
  const {popularShowsList,status,error} = useSelector(state => state.popularShowsList)

  useEffect(()=>{
    if(status==="idle"){
      dispatch(fetchPopularShowsList())
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
        <h1 className='p-2 text-2xl font-semibold'>Popular Shows</h1>
        <div className='mt-2 flex gap-2 items-center flex-wrap justify-center sm:justify-normal'>
          {popularShowsList.map((show) => <Card key={show.id} sr={show.id} poster={show.poster_path} title={show.original_name} type={"tvshows"}  />
          )}
        </div>
      </div>
    </>
  )
}

export default PopularShows
