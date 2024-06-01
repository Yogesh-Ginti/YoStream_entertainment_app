import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tmdb_base_url, apiKey } from "../../../utils/constants";

// Async thunk function to fetch top rated movies list from the API
export const fetchTopRatedMoviesList = createAsyncThunk(
  'topRatedMoviesList/fetchTopRatedMoviesList',
  async(_, {rejectWithValue} )=>{
    try {
      const res = await axios.get(`${tmdb_base_url}/3/movie/top_rated?api_key=${apiKey}`)
      return res.data.results // Returning the fetched results
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred"); // Handling errors
    }
  }
)

// Slice to manage state related to top rated movies list
const topRatedMoviesListSlice = createSlice({
  name: "topRatedMoviesList",
  initialState :{
    topRatedMoviesList : [], // Initial empty array for the list
    status: "idle", // Initial status
    error : null // Initial error state
  },
  reducers:{}, // No additional reducers defined
  extraReducers:(builder)=>{
    builder
      .addCase(fetchTopRatedMoviesList.pending, (state, action)=>{
        state.status = "loading" // Set status to 'loading' while fetching data
      })
      .addCase(fetchTopRatedMoviesList.fulfilled, (state, action)=>{
        state.status = "succeeded" // Set status to 'succeeded' when fetch is successful
        state.topRatedMoviesList = action.payload // Update top rated movies list with fetched data
      })
      .addCase(fetchTopRatedMoviesList.rejected, (state, action)=>{
        state.status = "failed" // Set status to 'failed' if fetch is rejected
        state.error = action.payload // Store error message in state
      })  
  }
})

export default topRatedMoviesListSlice.reducer // Exporting reducer for use in store
