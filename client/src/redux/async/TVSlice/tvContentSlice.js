import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tmdb_base_url, apiKey } from "../../../utils/constants";

// Async thunk function to fetch TV content details from the API
export const fetchTVContent = createAsyncThunk(
  'tvContent/fetchTVContent',
  async(tv_id, {rejectWithValue})=>{
    try {
      const res = await axios.get(`${tmdb_base_url}/3/tv/${tv_id}?api_key=${apiKey}`)
      return res.data; // Returning data from the API
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred"); // Handling errors
    }
  }
)

// Slice to manage state related to TV content
const tvContentSlice = createSlice({
  name: "tvContent",
  initialState:{
    tvContent : [], // Initial empty array for TV content
    status : "idle", // Initial status
    error : null // Initial error state
  },
  reducers:{}, // No additional reducers defined
  extraReducers:(builder)=>{
    builder
      .addCase(fetchTVContent.pending, (state, action)=>{
        state.status = "loading"; // Set status to 'loading' while fetching data
        state.error = "";
      })
      .addCase(fetchTVContent.fulfilled, (state, action)=>{
        state.status = "succeeded"; // Set status to 'succeeded' when fetch is successful
        state.tvContent = action.payload; // Update TV content with fetched data
      })
      .addCase(fetchTVContent.rejected,(state, action)=>{
        state.status = "failed"; // Set status to 'failed' if fetch is rejected
        state.error = action.payload; // Store error message in state
      })
  }
})

export default tvContentSlice.reducer; // Exporting reducer for use in store
