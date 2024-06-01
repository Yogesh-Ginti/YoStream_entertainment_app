import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tmdb_base_url, apiKey } from "../../../utils/constants";


export const fetchTVContent = createAsyncThunk(
  'tvContent/fetchTVContent',
  async(tv_id, {rejectWithValue})=>{
    try {
      const res = await axios.get(`${tmdb_base_url}/3/tv/${tv_id}?api_key=${apiKey}`)
      return res.data
    } catch (error) {
      return rejectWithValue(error.massage || "An Unkonwn error is occured")
    }
  }
)

const tvContentSlice = createSlice({
  name: "tvContent",
  initialState:{
    tvContent : [],
    status : "idle",
    error : null
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(fetchTVContent.pending, (state, action)=>{
        state.status = "loading"
      })
      .addCase(fetchTVContent.fulfilled, (state, action)=>{
        state.status = "succeeded"
        state.tvContent = action.payload
      })
      .addCase(fetchTVContent.rejected,(state, action)=>{
        state.status = "failed"
        state.error = "action.payload"
      })
  }
})

export default tvContentSlice.reducer
