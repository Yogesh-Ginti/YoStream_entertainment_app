import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tmdb_base_url, apiKey } from "../../../utils/constants";

// Async thunk to fetch popular movies list
export const fetchPopularMoviesList = createAsyncThunk(
  'popularMoviesList/fetchPopularMoviesList',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${tmdb_base_url}/3/movie/popular?api_key=${apiKey}`);
      return res.data.results;
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
);

// Slice for popular movies list
const popularMoviesListSlice = createSlice({
  name: "popularMoviesList",
  initialState: {
    popularMoviesList: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Cases for pending, fulfilled, and rejected states of fetching popular movies list
      .addCase(fetchPopularMoviesList.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchPopularMoviesList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.popularMoviesList = action.payload;
      })
      .addCase(fetchPopularMoviesList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  }
});

export default popularMoviesListSlice.reducer;
