import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tmdb_base_url, apiKey } from "../../../../utils/constants";

// Async thunk function to fetch trending movies list from the API
export const fetchTrendingMoviesList = createAsyncThunk(
  'trendingMoviesList/fetchTrendingMoviesList',
  async(_, {rejectWithValue} )=>{
    try {
      const res = await axios.get(`${tmdb_base_url}/3/trending/movie/day?api_key=${apiKey}`)
      return res.data.results; // Returning only the results array
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred"); // Handling errors
    }
  }
)

// Slice to manage state related to trending movies list
const trendingMoviesListSlice = createSlice({
  name: "trendingMoviesList",
  initialState :{
    trendingMoviesList : [], // Initial empty array for the list
    status: "idle", // Initial status
    error : null // Initial error state
  },
  reducers:{}, // No additional reducers defined
  extraReducers:(builder)=>{
    builder
      .addCase(fetchTrendingMoviesList.pending, (state, action)=>{
        state.status = "loading"; // Set status to 'loading' while fetching data
      })
      .addCase(fetchTrendingMoviesList.fulfilled, (state, action)=>{
        state.status = "succeeded"; // Set status to 'succeeded' when fetch is successful
        state.trendingMoviesList = action.payload; // Update trending movies list with fetched data
      })
      .addCase(fetchTrendingMoviesList.rejected, (state, action)=>{
        state.status = "failed"; // Set status to 'failed' if fetch is rejected
        state.error = action.payload; // Store error message in state
      })  
  }
})

export default trendingMoviesListSlice.reducer; // Exporting reducer for use in store
