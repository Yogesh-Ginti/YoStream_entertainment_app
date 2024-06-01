import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tmdb_base_url, apiKey } from "../../../utils/constants";

// Async thunk function to fetch top rated shows list from the API
export const fetchTopRatedShowsList = createAsyncThunk(
  'topRatedShowsList/fetchTopRatedShowsList',
  async(_, {rejectWithValue} )=>{
    try {
      const res = await axios.get(`${tmdb_base_url}/3/tv/top_rated?api_key=${apiKey}`)
      return res.data.results; // Returning only the results array
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred"); // Handling errors
    }
  }
)

// Slice to manage state related to top rated shows list
const topRatedShowsListSlice = createSlice({
  name: "topRatedShowsList",
  initialState :{
    topRatedShowsList : [], // Initial empty array for the list
    status: "idle", // Initial status
    error : null // Initial error state
  },
  reducers:{}, // No additional reducers defined
  extraReducers:(builder)=>{
    builder
      .addCase(fetchTopRatedShowsList.pending, (state, action)=>{
        state.status = "loading"; // Set status to 'loading' while fetching data
        state.error = "";
      })
      .addCase(fetchTopRatedShowsList.fulfilled, (state, action)=>{
        state.status = "succeeded"; // Set status to 'succeeded' when fetch is successful
        state.topRatedShowsList = action.payload; // Update top rated shows list with fetched data
      })
      .addCase(fetchTopRatedShowsList.rejected, (state, action)=>{
        state.status = "failed"; // Set status to 'failed' if fetch is rejected
        state.error = action.payload; // Store error message in state
      })  
  }
})

export default topRatedShowsListSlice.reducer; // Exporting reducer for use in store
