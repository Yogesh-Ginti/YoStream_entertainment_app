import AiringTodayShows from "../../components/Tv/AiringTodayShows"
import PopularShows from "../../components/Tv/PopularShows"
import TopRatedShows from "../../components/Tv/TopRatedShows"
import SearchBar from '../../components/SearchBar';
import Logo from '../../components/Logo';

function TvShows() {

  return (
    <div className="py-2 sm:py-0 sm:px-1">
      <div className='sticky top-0 bg-black p-2 sm:p-0 w-full flex justify-between items-center z-50'>
        <div className='sm:hidden'><Logo /></div>
        <div className='sm:w-full px-4'><SearchBar /></div>
      </div >
      <div className="flex flex-col gap-4">
        <AiringTodayShows />
        <TopRatedShows />
        <PopularShows />
      </div>
    </div>
  )
}

export default TvShows
