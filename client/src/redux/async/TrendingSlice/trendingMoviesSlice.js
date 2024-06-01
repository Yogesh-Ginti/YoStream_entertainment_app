import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tmdb_base_url, apiKey } from "../../../utils/constants";


export const fetchTrendingMoviesList = createAsyncThunk(
  'trendingMoviesList/fetchTrendingMoviesList',
  async(_, {rejectWithValue} )=>{
    try {
      const res = await axios.get(`${tmdb_base_url}/3/trending/movie/day?api_key=${apiKey}`)
      return res.data.results
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
)

const trendingMoviesListSlice = createSlice({
  name: "trendingMoviesList",
  initialState :{
    trendingMoviesList : [],
    status: "idle",
    error : null
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(fetchTrendingMoviesList.pending, (state, action)=>{
        state.status = "loading"
      })
      .addCase(fetchTrendingMoviesList.fulfilled, (state, action)=>{
        state.status = "succeeded"
        state.trendingMoviesList = action.payload
      })
      .addCase(fetchTrendingMoviesList.rejected, (state, action)=>{
        state.status = "failed"
        state.error = action.payload
      })
      

  }
})

export default trendingMoviesListSlice.reducer