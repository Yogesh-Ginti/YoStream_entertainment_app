import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTrendingShowsList } from '../../redux/async/TrendingSlice/trendingShowsSlice';
import LargeCard from '../cards/LargeCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from '../../utils/sliderSetting';


function TrendingShows() {
  const dispatch = useDispatch();
  const { trendingShowsList, status } = useSelector(state => state.trendingShowsList);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTrendingShowsList());
    }
  }, [dispatch, status]);

  

  if (status === 'loading') {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className='m-2'>
      <h1 className='p-2 text-2xl font-semibold'>Trending Shows</h1>
      <div className='w-full p-4'>
        <Slider {...settings}>
          {trendingShowsList.map((show) => (
            <LargeCard key={show.id} type="tvshows" sr={show.id} poster={show.poster_path} title={show.title} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default TrendingShows;
