import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tmdb_base_url, apiKey } from "../../../utils/constants";

// Async thunk function to fetch popular shows list from the API
export const fetchPopularShowsList = createAsyncThunk(
  'popularShowsList/fetchPopularShowsList',
  async(_, {rejectWithValue} )=>{
    try {
      const res = await axios.get(`${tmdb_base_url}/3/tv/popular?api_key=${apiKey}`)
      return res.data.results; // Returning only the results array
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred"); // Handling errors
    }
  }
)

// Slice to manage state related to popular shows list
const popularShowsListSlice = createSlice({
  name: "popularShowsList",
  initialState :{
    popularShowsList : [], // Initial empty array for the list
    status: "idle", // Initial status
    error : null // Initial error state
  },
  reducers:{}, // No additional reducers defined
  extraReducers:(builder)=>{
    builder
      .addCase(fetchPopularShowsList.pending, (state, action)=>{
        state.status = "loading"; // Set status to 'loading' while fetching data
        state.error = "";
      })
      .addCase(fetchPopularShowsList.fulfilled, (state, action)=>{
        state.status = "succeeded"; // Set status to 'succeeded' when fetch is successful
        state.popularShowsList = action.payload; // Update popular shows list with fetched data
      })
      .addCase(fetchPopularShowsList.rejected, (state, action)=>{
        state.status = "failed"; // Set status to 'failed' if fetch is rejected
        state.error = action.payload; // Store error message in state
      })  
  }
})

export default popularShowsListSlice.reducer; // Exporting reducer for use in store
