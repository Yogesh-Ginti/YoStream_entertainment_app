import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backend_base_url } from "../../../utils/constants";

// Thunk for logging in the user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backend_base_url}/user/login`, { email, password }, { withCredentials: true });
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data; // Return user data on successful login
    } catch (error) {
      return rejectWithValue(error.response.data || "An error occurred during login"); // Handling errors
    }
  }
);

// Thunk for signing up the user
export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backend_base_url}/user/signup`, { username, email, password }, { withCredentials: true });
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data; // Return user data on successful sign up
    } catch (error) {
      return rejectWithValue(error.response.data || "An error occurred during sign up"); // Handling errors
    }
  }
);

// Thunk for logging out the user
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backend_base_url}/user/logout`,{}, { withCredentials: true });
      localStorage.removeItem('user');
      return response.data; // Return data on successful logout
    } catch (error) {
      return rejectWithValue(error.response.data || "An error occurred during logout"); // Handling errors
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, // Initial user state fetched from local storage
  loading: false, // Initial loading state
  error: null, // Initial error state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null; // Clear user data on logout
      localStorage.removeItem('user'); // Remove user data from local storage
    },
  },
  extraReducers: (builder) => {
    builder
      // Different cases for loginUser user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Different cases for signUp user
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Different cases for logoutUser
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions; // Exporting logout action
export default authSlice.reducer; // Exporting reducer for use in store
