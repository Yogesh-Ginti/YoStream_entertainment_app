import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tmdb_base_url, apiKey } from "../../../utils/constants";


export const fetchTopRatedMoviesList = createAsyncThunk(
  'topRatedMoviesList/fetchTopRatedMoviesList',
  async(_, {rejectWithValue} )=>{
    try {
      const res = await axios.get(`${tmdb_base_url}/3/movie/top_rated?api_key=${apiKey}`)
      return res.data.results
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
)

const topRatedMoviesListSlice = createSlice({
  name: "topRatedMoviesList",
  initialState :{
    topRatedMoviesList : [],
    status: "idle",
    error : null
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(fetchTopRatedMoviesList.pending, (state, action)=>{
        state.status = "loading"
      })
      .addCase(fetchTopRatedMoviesList.fulfilled, (state, action)=>{
        state.status = "succeeded"
        state.topRatedMoviesList = action.payload
      })
      .addCase(fetchTopRatedMoviesList.rejected, (state, action)=>{
        state.status = "failed"
        state.error = action.payload
      })
      

  }
})

export default topRatedMoviesListSlice.reducer