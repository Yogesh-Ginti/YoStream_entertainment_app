import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tmdb_base_url, apiKey } from "../../../utils/constants";

export const fetchAiringTodayShowsList = createAsyncThunk(
  'AiringTodayShowsList/fetchAiringTodayShowsList',
  async(_, {rejectWithValue} )=>{
    try {
      const res = await axios.get(`${tmdb_base_url}/3/tv/airing_today?api_key=${apiKey}`)
      return res.data.results
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
)

const airingTodayShowsListSlice = createSlice({
  name: "airingTodayShowsList",
  initialState :{
    airingTodayShowsList : [],
    status: "idle",
    error : null
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(fetchAiringTodayShowsList.pending, (state, action)=>{
        state.status = "loading"
      })
      .addCase(fetchAiringTodayShowsList.fulfilled, (state, action)=>{
        state.status = "succeeded"
        state.airingTodayShowsList = action.payload
      })
      .addCase(fetchAiringTodayShowsList.rejected, (state, action)=>{
        state.status = "failed"
        state.error = action.payload
      })
      

  }
})

export default airingTodayShowsListSlice.reducer