import NowPlayingMovies from "../../components/Movies/NowPlayingMovies"
import PopularMovies from "../../components/Movies/PopularMovies"
import TopRatedMovies from "../../components/Movies/TopRatedMovies"
import UpComingMovies from "../../components/Movies/UpComingMovies"
import SearchBar from '../../components/SearchBar';
import Logo from '../../components/Logo';

function Movies() {


  return (
    <div className="py-2 sm:py-0 sm:px-1">
      <div className='sticky top-0 bg-black p-2 sm:p-0 w-full flex justify-between items-center z-50'>
        <div className='sm:hidden'><Logo /></div>
        <div className='sm:w-full px-4'><SearchBar /></div>
      </div>
      <div className="flex flex-col gap-4">
        <UpComingMovies />
        <NowPlayingMovies />
        <TopRatedMovies />
        <PopularMovies />
      </div>

    </div>
  )
}

export default Movies
