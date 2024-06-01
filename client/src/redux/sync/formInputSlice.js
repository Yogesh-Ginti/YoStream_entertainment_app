import { createSlice } from '@reduxjs/toolkit';

// Initial state for form inputs
const initialState = {
  username: '',
  email: '',
  password: '',
  repassword: '',
  emailError : '',
  rePasswordError : '',
};

// Slice for managing form inputs
const formInputSlice = createSlice({
  name: 'formInput',
  initialState,
  reducers: {
    // Reducer to set username
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    // Reducer to set email
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    // Reducer to set password
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    // Reducer to set re-entered password
    setRepassword: (state, action) => {
      state.repassword = action.payload;
    },
    // Reducer to set email error
    setEmailError: (state, action) => {
      state.emailError = action.payload;
    },
    // Reducer to set re-entered password error
    setRePasswordError : (state, action)=>{
      state.rePasswordError = action.payload;
    },
    // Reducer to reset form inputs
    resetForm: (state) => {
      state.username = '';
      state.email = '';
      state.emailError='';
      state.password = '';
      state.repassword = '';
      state.rePasswordError='';
    },
  },
});

// Exporting actions and reducer
export const { setUsername, setEmail, setPassword, setRepassword, setEmailError, setRePasswordError, resetForm } = formInputSlice.actions;
export default formInputSlice.reducer;
