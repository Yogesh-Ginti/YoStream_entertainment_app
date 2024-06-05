import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to add a bookmark for a user
export const AddToUserBookmarks = createAsyncThunk(
  'bookmarks/AddToUserBookmarks',
  async ({ sr, poster, title, type }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/bookmarks/add`, { sr, poster, title, type }, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "An error occurred while adding bookmarks");
    }
  }
);

// Async thunk to remove a bookmark for a user
export const RemoveToUserBookmarks = createAsyncThunk(
  'bookmarks/RemoveToUserBookmarks',
  async ({ orgId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/bookmarks/remove`, { orgId }, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "An error occurred while removing from bookmarks");
    }
  }
);

// Async thunk to fetch user bookmarks
export const fetchUserBookmarks = createAsyncThunk(
  'bookmarks/fetchUserBookmarks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/bookmarks`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "An error occurred while fetching bookmarks");
    }
  }
);

// Slice for bookmarks
const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: {
    status: "idle",
    res: [],
    error: "",
    fetchedBookmarks: {
      status: "idle",
      userBookmarks: [],
      error: ""
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Cases for adding a bookmark
      .addCase(AddToUserBookmarks.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(AddToUserBookmarks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.res = action.payload;
      })
      .addCase(AddToUserBookmarks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Cases for fetching user bookmarks
      .addCase(fetchUserBookmarks.pending, (state) => {
        state.fetchedBookmarks.status = "loading";
        state.fetchedBookmarks.error = "";
      })
      .addCase(fetchUserBookmarks.fulfilled, (state, action) => {
        state.fetchedBookmarks.status = "succeeded";
        state.fetchedBookmarks.userBookmarks = action.payload;
      })
      .addCase(fetchUserBookmarks.rejected, (state, action) => {
        state.fetchedBookmarks.status = "failed";
        state.fetchedBookmarks.error = action.payload;
      })

      // Cases for removing bookmarks
      .addCase(RemoveToUserBookmarks.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(RemoveToUserBookmarks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fetchedBookmarks.userBookmarks = action.payload;
      })
      .addCase(RemoveToUserBookmarks.rejected, (state, action) => {
        state.status = "failed";
        state.fetchedBookmarks.error = action.payload;
      });
  }
});

export default bookmarksSlice.reducer;
