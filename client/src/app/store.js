import { configureStore } from "@reduxjs/toolkit";
import upcomingMoviesReducer from "../redux/async/MoviesSlice/upComingMoviesListSlice";
import nowPlayingMoviesReducer from "../redux/async/MoviesSlice/nowPlayingMoviesListSlice";
import topRatedMoviesReducer from "../redux/async/MoviesSlice/topRatedMoviesList";
import popularMoviesReducer from "../redux/async/MoviesSlice/popularMoviesListSlice";
import airingTodayShowsReducer from "../redux/async/TVSlice/airingTodayShowsList";
import topRatedShowsReducer from "../redux/async/TVSlice/topRatedShowsList";
import popularShowsReducer from "../redux/async/TVSlice/popularShowsList";
import trendingMoviesReducer from "../redux/async/TrendingSlice/trendingMoviesSlice";
import trendingShowsReducer from "../redux/async/TrendingSlice/trendingShowsSlice";
import searchBarReducer from "../redux/async/SearchBar/searchBarSlice";
import movieContentReducer from "../redux/async/MoviesSlice/movieContentSlice";
import tvContentReducer from "../redux/async/TVSlice/tvContentSlice";
import formInputReducer from "../redux/sync/formInputSlice";
import authReducer from "../redux/async/userAuth/authSlice";
import bookmarksReducer from "../redux/async/bookmarks/bookmarksSlice";



const store = configureStore({
  reducer:{
    upComingMoviesList : upcomingMoviesReducer,
    nowPlayingMoviesList: nowPlayingMoviesReducer,
    topRatedMoviesList : topRatedMoviesReducer,
    popularMoviesList : popularMoviesReducer,
    airingTodayShowsList : airingTodayShowsReducer,
    topRatedShowsList : topRatedShowsReducer,
    popularShowsList : popularShowsReducer,
    trendingMoviesList : trendingMoviesReducer,
    trendingShowsList : trendingShowsReducer,
    searchBar : searchBarReducer,
    movieContent : movieContentReducer,
    tvContent : tvContentReducer,
    formInput : formInputReducer,
    auth: authReducer,
    bookmarks :bookmarksReducer
    
    
  }
})

export default store;