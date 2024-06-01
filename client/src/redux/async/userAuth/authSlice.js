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
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Getting error on login");
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
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Getting error on SignUp");
    }
  }
);

// Thunk for logout up the user
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backend_base_url}/user/logout`,{}, { withCredentials: true });
      localStorage.removeItem('user');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Getting error on Logout");
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      // different cases for loginUser user
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
        state.error = action.payload;
      })

      // different cases for signUp user
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
        state.error = action.payload;
      })

      // different cases for logoutUser
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
