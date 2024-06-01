import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tmdb_base_url, apiKey } from "../../../utils/constants";


export const fetchTopRatedShowsList = createAsyncThunk(
  'topRatedShowsList/fetchTopRatedShowsList',
  async(_, {rejectWithValue} )=>{
    try {
      const res = await axios.get(`${tmdb_base_url}/3/tv/top_rated?api_key=${apiKey}`)
      return res.data.results
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
)

const topRatedShowsListSlice = createSlice({
  name: "topRatedShowsList",
  initialState :{
    topRatedShowsList : [],
    status: "idle",
    error : null
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(fetchTopRatedShowsList.pending, (state, action)=>{
        state.status = "loading"
      })
      .addCase(fetchTopRatedShowsList.fulfilled, (state, action)=>{
        state.status = "succeeded"
        state.topRatedShowsList = action.payload
      })
      .addCase(fetchTopRatedShowsList.rejected, (state, action)=>{
        state.status = "failed"
        state.error = action.payload
      })
      

  }
})

export default topRatedShowsListSlice.reducer