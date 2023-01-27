import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getHitsPanchang = createAsyncThunk('HITS_PANCHANG/GET_HITS_PANCHANG',
    async (data) => {     
        console.log(data,'this is action date') 
        let OPTIONS = {
            url:`${import.meta.env.VITE_BASE_URL}/api/getHits?module=PanchangModule&createdAt=${data}`,
            // url: `https://62be-2405-201-4041-c01c-20fb-c0da-32bc-a7e6.in.ngrok.io/api/getHits?module=PanchangModule&createdAt=${data}`,
            method: "GET",
            headers: {
              'Accept': 'application/json'
            },
          };
        return axios(OPTIONS)
            .then(res => res)
    })


// ==============================date range=================================

export const getDateRangeHitsPanchang = createAsyncThunk('HITS_DATE_RANGE_PANCHANG/GET_HITS_DATE_RANGE_PANCHANG',
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

const panchangHits = createSlice({
        name: 'GET HITS',
    initialState: {
        loading: false,
        result: [],
        error: null
    },

    
  extraReducers: {
    // ==============GET REQUEST PANCHNAG=============
    [getHitsPanchang.pending]: (state, action) => {
        state.loading = true;
    },
    [getHitsPanchang.fulfilled]: (state, action) => {
        state.loading = false,
            state.result = action.payload.data.data
    },
    [getHitsPanchang.rejected]: (state, action) => {
        state.loading = false,
            state.error = action
    },
    // ======================date range==============================
    [getDateRangeHitsPanchang.pending]: (state, action) => {
        state.loading = true;
    },
    [getDateRangeHitsPanchang.fulfilled]: (state, action) => {
        state.loading = false,
            state.result = action.payload.data.data
    },
    [getDateRangeHitsPanchang.rejected]: (state, action) => {
        state.loading = false,
            state.error = action
    },

}

})


export default panchangHits.reducer;
