import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tmdb_base_url, apiKey } from "../../../utils/constants";

// Async thunk function to fetch upcoming movies list from the API
export const fetchUpcomingMoviesList = createAsyncThunk(
  'upcomingMoviesList/fetchUpcomingMoviesList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${tmdb_base_url}/3/movie/upcoming?api_key=${apiKey}`
      );
      return response.data.results; // Returning only the results array
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
);

// Slice to manage state related to upcoming movies list
const upcomingMoviesListSlice = createSlice({
  name: "upcomingMoviesList",
  initialState: {
    upcomingMoviesList: [], // Initial empty array for the list
    status: "idle", // Initial status
    error: null // Initial error state
  },
  reducers: {}, // No additional reducers defined
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingMoviesList.pending, (state) => {
        state.status = "loading"; // Set status to 'loading' while fetching data
      })
      .addCase(fetchUpcomingMoviesList.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to 'succeeded' when fetch is successful
        state.upcomingMoviesList = action.payload; // Update upcoming movies list with fetched data
      })
      .addCase(fetchUpcomingMoviesList.rejected, (state, action) => {
        state.status = "failed"; // Set status to 'failed' if fetch is rejected
        state.error = action.payload; // Store error message in state
      });
  }
});

export default upcomingMoviesListSlice.reducer; // Exporting reducer for use in store
