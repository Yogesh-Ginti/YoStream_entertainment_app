import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tmdb_base_url, apiKey } from "../../../utils/constants";


export const fetchTrendingShowsList = createAsyncThunk(
  'trendingShowsList/fetchTrendingShowsList',
  async(_, {rejectWithValue} )=>{
    try {
      const res = await axios.get(`${tmdb_base_url}/3/trending/tv/day?api_key=${apiKey}`)
      return res.data.results
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
)

const trendingShowsListSlice = createSlice({
  name: "trendingShowsList",
  initialState :{
    trendingShowsList : [],
    status: "idle",
    error : null
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(fetchTrendingShowsList.pending, (state, action)=>{
        state.status = "loading"
      })
      .addCase(fetchTrendingShowsList.fulfilled, (state, action)=>{
        state.status = "succeeded"
        state.trendingShowsList = action.payload
      })
      .addCase(fetchTrendingShowsList.rejected, (state, action)=>{
        state.status = "failed"
        state.error = action.payload
      })
      

  }
})

export default trendingShowsListSlice.reducer