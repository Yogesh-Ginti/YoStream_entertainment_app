import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { tmdb_base_url, apiKey } from "../../../utils/constants";

export const fetchSearchItems = createAsyncThunk(
  'searchBar/fetchSearchItems',
  async(query, {rejectWithValue})=>{
    try {
      const res = await axios.get(`${tmdb_base_url}/3/search/multi?api_key=${apiKey}&query=${query}&include_adult=false&language=en-US&page=1`)
      return res.data.results
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }

)

const searchBarSlice = createSlice({
  name : "searchBar",
  initialState:{
    searchTerm : "",
    searchResults : [],
    status :"idle",
    error : null

  },
  reducers:{
    setSearchTerm : (state, action)=>{
      state.searchTerm = action.payload
    },
    resetSearchTerm:(state, action)=>{
      state.searchTerm = ''
      state.searchResults = []
    }
  },
  extraReducers:(builder)=>{
    builder
      .addCase(fetchSearchItems.pending, (state, action)=>{
        state.status = "loading"
      })
      .addCase(fetchSearchItems.fulfilled, (state, action)=>{
        state.status = "succeded"
        state.searchResults = action.payload
      })
      .addCase(fetchSearchItems.rejected, (state, action)=>{
        state.status = "rejected"
        state.error = action.payload
      })

  }
})

export const {setSearchTerm, resetSearchTerm } = searchBarSlice.actions
export default searchBarSlice.reducer