import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tmdb_base_url,apiKey } from "../../../utils/constants";


export const fetchNowPlayingMoviesList = createAsyncThunk(
  'nowPlayingMoviesList/fetchNowPlayingMoviesList',
  async(_, {rejectWithValue} )=>{
    try {
      const res = await axios.get(`${tmdb_base_url}/3/movie/now_playing?api_key=${apiKey}`)
      return res.data.results
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
)

const nowPlayingMoviesListSlice = createSlice({
  name: "nowPlayingMoviesList",
  initialState :{
    nowPlayingMoviesList : [],
    status: "idle",
    error : null
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(fetchNowPlayingMoviesList.pending, (state, action)=>{
        state.status = "loading"
      })
      .addCase(fetchNowPlayingMoviesList.fulfilled, (state, action)=>{
        state.status = "succeeded"
        state.nowPlayingMoviesList = action.payload
      })
      .addCase(fetchNowPlayingMoviesList.rejected, (state, action)=>{
        state.status = "failed"
        state.error = action.payload
      })
      

  }
})

export default nowPlayingMoviesListSlice.reducer