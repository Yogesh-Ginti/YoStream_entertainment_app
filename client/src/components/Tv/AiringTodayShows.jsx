import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAiringTodayShowsList } from '../../redux/async/TVSlice/airingTodayShowsList'
import { settings } from '../../utils/sliderSetting'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LargeCard from '../cards/LargeCard'

function AiringTodayShows() {
  const dispatch = useDispatch()
  const {airingTodayShowsList, status, error} = useSelector(state => state.airingTodayShowsList)

  useEffect(()=>{
    if(status==="idle"){
      dispatch(fetchAiringTodayShowsList())
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
    <div className='m-2'>
      <h1 className='p-2 text-2xl font-semibold'>Airing Today</h1>
      <div className='w-full p-4'>
        <Slider {...settings}>
          {airingTodayShowsList && airingTodayShowsList.map((show) => (
            <LargeCard key={show.id} type="tvshows"sr={show.id} poster={show.poster_path} title={show.title} />
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default AiringTodayShows
