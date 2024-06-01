import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tmdb_base_url, apiKey } from "../../../utils/constants";


export const fetchMovieContent = createAsyncThunk(
  'movieContent/fetchMovieContent',
  async(movie_id, {rejectWithValue})=>{
    try {
      const res = await axios.get(`${tmdb_base_url}/3/movie/${movie_id}?api_key=${apiKey}`)
      return res.data
    } catch (error) {
      return rejectWithValue(error.massage || "An Unkonwn error is occured")
    }
  }
)

const movieContentSlice = createSlice({
  name: "movieContent",
  initialState:{
    movieContent : [],
    status : "idle",
    error : null
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(fetchMovieContent.pending, (state, action)=>{
        state.status = "loading"
      })
      .addCase(fetchMovieContent.fulfilled, (state, action)=>{
        state.status = "succeeded"
        state.movieContent = action.payload
      })
      .addCase(fetchMovieContent.rejected,(state, action)=>{
        state.status = "failed"
        state.error = "action.payload"
      })
  }
})

export default movieContentSlice.reducer
