import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Homepage from './pages/Home/Homepage'
import Movies from './pages/Movies/Movies'
import MoviesDetails from './pages/Movies/MoviesDetails'
import TvShows from './pages/TV/TvShows'
import TvShowsDetails from './pages/TV/TvShowsDetails'
import Bookmarks from './pages/Bookmarks/Bookmarks'
import SignUp from './pages/Profile/SignUp'
import Login from './pages/Profile/Login'
import SearchResults from './components/SearchResults'
import Profile from './pages/Profile/Profile'

function App() {
  return (
    <>

      <div className='sm:py-4 gap-2 h-screen w-full flex flex-col-reverse sm:flex-row'>
        {/* Header container which contain logo and nav icon */}
        <div className='sm:p-2 sm:w-[10%]  '>
          <Header />
        </div>
        <div className='sm:mt-3 flex flex-col items-center sm:w-[90%] h-full '>
          
          {/* pages container  */}
          <div className='mt-8 sm:mt-0 w-full h-full overflow-y-auto'>
            <Routes>
              <Route path='/' element={<Homepage/>} />
              <Route path='/movies' element={<Movies/>} />
              <Route path='/movies/:id' element={<MoviesDetails/>} />
              <Route path='/tvshows' element={<TvShows/>} />
              <Route path='/tvshows/:id' element={<TvShowsDetails/>} />
              <Route path='/bookmarks' element={<Bookmarks />} />
              <Route path='/search'element={<SearchResults />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
          </div>
        </div>

      </div>

    </>
  )
}

export default App
