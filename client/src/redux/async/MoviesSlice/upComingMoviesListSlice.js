import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tmdb_base_url, apiKey } from "../../../utils/constants";

// Fetch Movies List
export const fetchUpcomingMoviesList = createAsyncThunk(
  'upcomingMoviesList/fetchUpcomingMoviesList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${tmdb_base_url}/3/movie/upcoming?api_key=${apiKey}`
      );
      return response.data.results; // Return only the results array
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
);

const upcomingMoviesListSlice = createSlice({
  name: "upcomingMoviesList",
  initialState: {
    upcomingMoviesList: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingMoviesList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpcomingMoviesList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.upcomingMoviesList = action.payload;
      })
      .addCase(fetchUpcomingMoviesList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  }
});

export default upcomingMoviesListSlice.reducer;
