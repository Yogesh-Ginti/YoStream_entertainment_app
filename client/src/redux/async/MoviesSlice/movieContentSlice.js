import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tmdb_base_url, apiKey } from "../../../utils/constants";

// Async thunk to fetch movie content by ID
export const fetchMovieContent = createAsyncThunk(
  'movieContent/fetchMovieContent',
  async (movie_id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${tmdb_base_url}/3/movie/${movie_id}?api_key=${apiKey}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
);

// Slice for movie content
const movieContentSlice = createSlice({
  name: "movieContent",
  initialState: {
    movieContent: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Cases for pending, fulfilled, and rejected states of fetching movie content
      .addCase(fetchMovieContent.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchMovieContent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movieContent = action.payload;
      })
      .addCase(fetchMovieContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  }
});

export default movieContentSlice.reducer;
