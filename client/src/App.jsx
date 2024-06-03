import './App.css'; // Importing CSS file
import { Routes, Route } from 'react-router-dom'; // Importing Routes and Route from react-router-dom
import Header from './components/Header'; // Importing Header component
import Homepage from './pages/Home/Homepage'; // Importing Homepage component
import Movies from './pages/Movies/Movies'; // Importing Movies component
import MoviesDetails from './pages/Movies/MoviesDetails'; // Importing MoviesDetails component
import TvShows from './pages/TV/TvShows'; // Importing TvShows component
import TvShowsDetails from './pages/TV/TvShowsDetails'; // Importing TvShowsDetails component
import Bookmarks from './pages/Bookmarks/Bookmarks'; // Importing Bookmarks component
import SignUp from './pages/Profile/SignUp'; // Importing SignUp component
import Login from './pages/Profile/Login'; // Importing Login component
import SearchResults from './components/SearchResults'; // Importing SearchResults component
import Profile from './pages/Profile/Profile'; // Importing Profile component

// App component function
function App() {
  return (
    <>
      {/* Main container */}
      <div className='py-2 sm:py-4 gap-2 h-screen w-full flex flex-col-reverse sm:flex-row'>
        {/* Header container which contains logo and navigation icon */}
        <div className='sm:p-2 sm:w-[10%]'>
          <Header />
        </div>
        {/* Pages container */}
        <div className='sm:mt-3 flex flex-col items-center sm:w-[90%] h-full'>
          {/* Pages content */}
          <div className='mt-8 sm:mt-0 w-full h-full overflow-y-auto'>
            {/* Routing setup */}
            <Routes>
              {/* Define routes for different pages */}
              <Route path='/' element={<Homepage />} /> {/* Homepage route */}
              <Route path='/movies' element={<Movies />} /> {/* Movies route */}
              <Route path='/movies/:id' element={<MoviesDetails />} /> {/* Movie details route */}
              <Route path='/tvshows' element={<TvShows />} /> {/* TV shows route */}
              <Route path='/tvshows/:id' element={<TvShowsDetails />} /> {/* TV show details route */}
              <Route path='/bookmarks' element={<Bookmarks />} /> {/* Bookmarks route */}
              <Route path='/search' element={<SearchResults />} /> {/* Search results route */}
              <Route path='/signup' element={<SignUp />} /> {/* Sign up route */}
              <Route path='/login' element={<Login />} /> {/* Login route */}
              <Route path='/profile' element={<Profile />} /> {/* Profile route */}
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App; // Exporting App component
