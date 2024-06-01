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

// Configure the Redux store with multiple reducers
const store = configureStore({
  reducer: {
    upComingMoviesList: upcomingMoviesReducer, // Reducer for upcoming movies
    nowPlayingMoviesList: nowPlayingMoviesReducer, // Reducer for currently playing movies
    topRatedMoviesList: topRatedMoviesReducer, // Reducer for top-rated movies
    popularMoviesList: popularMoviesReducer, // Reducer for popular movies
    airingTodayShowsList: airingTodayShowsReducer, // Reducer for shows airing today
    topRatedShowsList: topRatedShowsReducer, // Reducer for top-rated shows
    popularShowsList: popularShowsReducer, // Reducer for popular shows
    trendingMoviesList: trendingMoviesReducer, // Reducer for trending movies
    trendingShowsList: trendingShowsReducer, // Reducer for trending shows
    searchBar: searchBarReducer, // Reducer for search bar functionality
    movieContent: movieContentReducer, // Reducer for movie content details
    tvContent: tvContentReducer, // Reducer for TV content details
    formInput: formInputReducer, // Reducer for form input management
    auth: authReducer, // Reducer for user authentication
    bookmarks: bookmarksReducer // Reducer for bookmarks
  }
});

export default store;
