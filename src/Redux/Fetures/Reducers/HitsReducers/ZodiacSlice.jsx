import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getHitsZodiacSign  = createAsyncThunk('HITS_ZODIAC_SIGN/GET_HITS_ZODIAC_SIGN',
async (data) => {      
    let OPTIONS = {
        url: `${import.meta.env.VITE_BASE_URL}/api/getHits?module=ZodiacSignModule&createdAt=${data}`,
        // url: `https://62be-2405-201-4041-c01c-20fb-c0da-32bc-a7e6.in.ngrok.io/api/getHits?module=ContactModule&createdAt=${data}`,
        method: "GET",
        headers: {
          'Accept': 'application/json'
        },
      };
    return axios(OPTIONS)
        .then(res => res)
})


export const getDateRangeHitsZodiacSign = createAsyncThunk('HITS_DATE_RANGE_ZODIAC_SIGN/GET_HITS_DATE_RANGE_ZODIAC_SIGN',
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
const zodiacSignHits = createSlice({
        name: 'GET ZODIAC_SIGN HITS',
    initialState: {
        loading: false,
        result: [],
        error: null
    },

    
  extraReducers: {
    // ==============GET REQUEST PANCHNAG=============
    [getHitsZodiacSign.pending]: (state, action) => {
        state.loading = true;
    },
    [getHitsZodiacSign.fulfilled]: (state, action) => {
        state.loading = false,
            state.result = action.payload.data.data
    },
    [getHitsZodiacSign.rejected]: (state, action) => {
        state.loading = false,
            state.error = action
    },
    [getDateRangeHitsZodiacSign.pending]: (state, action) => {
        state.loading = true;
    },
    [getDateRangeHitsZodiacSign.fulfilled]: (state, action) => {
        state.loading = false,
            state.result = action.payload.data.data
    },
    [getDateRangeHitsZodiacSign.rejected]: (state, action) => {
        state.loading = false,
            state.error = action
    },

}

})


export default zodiacSignHits.reducer;
