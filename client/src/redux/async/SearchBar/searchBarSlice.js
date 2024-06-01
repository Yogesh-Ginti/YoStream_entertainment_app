import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { tmdb_base_url, apiKey } from "../../../utils/constants";

// Async thunk function to fetch search items from the API based on query
export const fetchSearchItems = createAsyncThunk(
  'searchBar/fetchSearchItems',
  async(query, {rejectWithValue})=>{
    try {
      const res = await axios.get(`${tmdb_base_url}/3/search/multi?api_key=${apiKey}&query=${query}&include_adult=false&language=en-US&page=1`)
      return res.data.results; // Return only the results array
    } catch (error) {
      return rejectWithValue(error.message); // Handling errors
    }
  }
)

// Slice to manage state related to search bar
const searchBarSlice = createSlice({
  name : "searchBar",
  initialState:{
    searchTerm : "", // Initial search term
    searchResults : [], // Initial empty array for search results
    status :"idle", // Initial status
    error : null // Initial error state
  },
  reducers:{
    setSearchTerm : (state, action)=>{
      state.searchTerm = action.payload; // Set search term
    },
    resetSearchTerm:(state, action)=>{
      state.searchTerm = ''; // Reset search term to empty string
      state.searchResults = []; // Clear search results
    }
  },
  extraReducers:(builder)=>{
    builder
      .addCase(fetchSearchItems.pending, (state, action)=>{
        state.status = "loading"; // Set status to 'loading' while fetching data
        state.error = "";
      })
      .addCase(fetchSearchItems.fulfilled, (state, action)=>{
        state.status = "succeeded"; // Set status to 'succeeded' when fetch is successful
        state.searchResults = action.payload; // Update search results with fetched data
      })
      .addCase(fetchSearchItems.rejected, (state, action)=>{
        state.status = "rejected"; // Set status to 'rejected' if fetch is rejected
        state.error = action.payload; // Store error message in state
      })
  }
})

export const {setSearchTerm, resetSearchTerm } = searchBarSlice.actions; // Exporting actions
export default searchBarSlice.reducer; // Exporting reducer for use in store
