import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tmdb_base_url, apiKey } from "../../../utils/constants";


export const fetchPopularShowsList = createAsyncThunk(
  'popularShowsList/fetchPopularShowsList',
  async(_, {rejectWithValue} )=>{
    try {
      const res = await axios.get(`${tmdb_base_url}/3/tv/popular?api_key=${apiKey}`)
      return res.data.results
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
)

const popularShowsListSlice = createSlice({
  name: "popularShowsList",
  initialState :{
    popularShowsList : [],
    status: "idle",
    error : null
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(fetchPopularShowsList.pending, (state, action)=>{
        state.status = "loading"
      })
      .addCase(fetchPopularShowsList.fulfilled, (state, action)=>{
        state.status = "succeeded"
        state.popularShowsList = action.payload
      })
      .addCase(fetchPopularShowsList.rejected, (state, action)=>{
        state.status = "failed"
        state.error = action.payload
      })
      

  }
})

export default popularShowsListSlice.reducer