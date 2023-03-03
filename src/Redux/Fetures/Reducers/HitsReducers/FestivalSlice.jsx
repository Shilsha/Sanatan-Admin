import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getHitsFestival = createAsyncThunk('HITS_FESTIVAL/GET_HITS_FESTIVAL',
async (data) => {      
    let OPTIONS = {
        url: `${import.meta.env.VITE_BASE_URL}/api/getHits?module=festivalModule&createdAt=${data}`,
        // url: `https://62be-2405-201-4041-c01c-20fb-c0da-32bc-a7e6.in.ngrok.io/api/getHits?module=festivalModule&createdAt=${data}`,
        method: "GET",
        headers: {
          'Accept':'application/json'
        },
      };
    return axios(OPTIONS)
        .then(res => res)
})


export const getDateRangeHitsFestival = createAsyncThunk('HITS_DATE_RANGE_FESTIVAL/GET_HITS_DATE_RANGE_FESTIVAL',
    async (data) => {     
        
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

    const festivalsHits = createSlice({
        name: 'GET HITS',
        initialState: {
        loading: false,
        result: [],
        error: null
    },

    
  extraReducers: {
    // ==============GET REQUEST PANCHNAG=============
    [getHitsFestival.pending]: (state, action) => {
        state.loading = true;
    },
    [getHitsFestival.fulfilled]: (state, action) => {
        state.loading = false,
            state.result = action.payload.data.data
    },
    [getHitsFestival.rejected]: (state, action) => {
        state.loading = false,
            state.error = action
    },
    [getDateRangeHitsFestival.pending]: (state, action) => {
        state.loading = true;
    },
    [getDateRangeHitsFestival.fulfilled]: (state, action) => {
        state.loading = false,
            state.result = action.payload.data.data
    },
    [getDateRangeHitsFestival.rejected]: (state, action) => {
        state.loading = false,
            state.error = action
    },
}})


export default festivalsHits.reducer;
