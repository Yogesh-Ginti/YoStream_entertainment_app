import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tmdb_base_url, apiKey } from "../../../utils/constants";

// Async thunk function to fetch trending shows list from the API
export const fetchTrendingShowsList = createAsyncThunk(
  'trendingShowsList/fetchTrendingShowsList',
  async(_, {rejectWithValue} )=>{
    try {
      const res = await axios.get(`${tmdb_base_url}/3/trending/tv/day?api_key=${apiKey}`)
      return res.data.results; // Returning only the results array
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred"); // Handling errors
    }
  }
)

// Slice to manage state related to trending shows list
const trendingShowsListSlice = createSlice({
  name: "trendingShowsList",
  initialState :{
    trendingShowsList : [], // Initial empty array for the list
    status: "idle", // Initial status
    error : null // Initial error state
  },
  reducers:{}, // No additional reducers defined
  extraReducers:(builder)=>{
    builder
      .addCase(fetchTrendingShowsList.pending, (state, action)=>{
        state.status = "loading"; // Set status to 'loading' while fetching data
        state.error = "";
      })
      .addCase(fetchTrendingShowsList.fulfilled, (state, action)=>{
        state.status = "succeeded"; // Set status to 'succeeded' when fetch is successful
        state.trendingShowsList = action.payload; // Update trending shows list with fetched data
      })
      .addCase(fetchTrendingShowsList.rejected, (state, action)=>{
        state.status = "failed"; // Set status to 'failed' if fetch is rejected
        state.error = action.payload; // Store error message in state
      })  
  }
})

export default trendingShowsListSlice.reducer; // Exporting reducer for use in store
