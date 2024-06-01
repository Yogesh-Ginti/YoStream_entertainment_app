import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  password: '',
  repassword: '',
  emailError : '',
  rePasswordError : '',
};

const formInputSlice = createSlice({
  name: 'formInput',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setRepassword: (state, action) => {
      state.repassword = action.payload;
    },
    setEmailError: (state, action) => {
      state.emailError = action.payload;
    },
    setRePasswordError : (state, action)=>{
      state.rePasswordError = action.payload
    },
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

export const { setUsername,setEmail, setPassword, setRepassword,setEmailError,setRePasswordError, resetForm } = formInputSlice.actions;
export default formInputSlice.reducer;
  