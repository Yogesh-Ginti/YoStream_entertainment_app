import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backend_base_url } from "../../../utils/constants";
import axios from "axios";

export const AddToUserBookmarks = createAsyncThunk(
  'bookmarks/AddToUserBookmarks',
  async ({ sr, poster, title, type }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backend_base_url}/bookmarks/add`, { sr, poster, title, type }, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Getting error while adding bookmarks");
    }
  }
);

export const RemoveToUserBookmarks = createAsyncThunk(
  'bookmarks/RemoveToUserBookmarks',
  async ({ orgId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backend_base_url}/bookmarks/remove`, { orgId }, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Getting error while removing from bookmarks");
    }
  }
);

export const fetchUserBookmarks = createAsyncThunk(
  'bookmarks/fetchUserBookmarks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backend_base_url}/bookmarks`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Getting error while fetching bookmarks");
    }
  }
);

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
      .addCase(AddToUserBookmarks.pending, (state) => {
        state.status = "loading";
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
