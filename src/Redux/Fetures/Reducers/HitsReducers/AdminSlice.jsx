import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getHitsAdmin  = createAsyncThunk('HITS_Admin/GET_HITS_Admin',
async (data) => {      
    let OPTIONS = {
        url: `${import.meta.env.VITE_BASE_URL}/api/getHits?module=AdminModule&createdAt=${data}`,
        // url: `https://62be-2405-201-4041-c01c-20fb-c0da-32bc-a7e6.in.ngrok.io/api/getHits?module=ContactModule&createdAt=${data}`,
        method: "GET",
        headers: {
          'Accept': 'application/json'
        },
      };
    return axios(OPTIONS)
        .then(res => res)
})


export const getDateRangeHitsAdmin = createAsyncThunk('HITS_DATE_RANGE_ADMIN/GET_HITS_DATE_RANGE_ADMIN',
async (data) => {     
    console.log(data,'this is action date') 
    let OPTIONS = {
        url:`${import.meta.env.VITE_BASE_URL}/api/Hits?createdAt=${data.startDate}&endDate=${data.endDate}&module=${data.module}`,
        method: "GET",
        headers: {
          'Accept': 'application/json'
        },
      };
    return axios(OPTIONS)
        .then(res => res)
})
const adminHits = createSlice({
        name: 'GET ADMIN HITS',
    initialState: {
        loading: false,
        result: [],
        error: null
    },

    
  extraReducers: {
    // ==============GET REQUEST PANCHNAG=============
    [getHitsAdmin.pending]: (state, action) => {
        state.loading = true;
    },
    [getHitsAdmin.fulfilled]: (state, action) => {
        state.loading = false,
            state.result = action.payload.data.data
    },
    [getHitsAdmin.rejected]: (state, action) => {
        state.loading = false,
            state.error = action
    },
    [getDateRangeHitsAdmin.pending]: (state, action) => {
        state.loading = true;
    },
    [getDateRangeHitsAdmin.fulfilled]: (state, action) => {
        state.loading = false,
            state.result = action.payload.data.data
    },
    [getDateRangeHitsAdmin.rejected]: (state, action) => {
        state.loading = false,
            state.error = action
    },

}

})


export default adminHits.reducer;
