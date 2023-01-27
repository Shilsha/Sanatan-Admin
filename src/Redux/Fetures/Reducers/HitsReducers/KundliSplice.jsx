import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getHitsKundali = createAsyncThunk('HITS_KUNDLI/GET_HITS_KUNDLI',
    async (data) => {      
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/getHits?module=KundaliModule&createdAt=${data}`,
            // url: `https://62be-2405-201-4041-c01c-20fb-c0da-32bc-a7e6.in.ngrok.io/api/getHits?module=KundaliModule&createdAt=${data}`,
        

            method: "GET",
            headers: {
              'Accept': 'application/json'
            },
          };
        return axios(OPTIONS)
            .then(res => res)
    })
 export const getDateRangeHitsKundali = createAsyncThunk('HITS_DATE_RANGE_KUNDLI/GET_HITS_DATE_RANGE_KUNDALI',
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

const kundliHits = createSlice({
        name: 'GET HITS',
    initialState: {
        loading: false,
        result: [],
        error: null
    },

    
  extraReducers: {
    // ==============GET REQUEST PANCHNAG=============
    
    [getHitsKundali.pending]: (state, action) => {
        state.loading = true;
    },
    [getHitsKundali.fulfilled]: (state, action) => {
        state.loading = false,
            state.result = action.payload.data
    },
    [getHitsKundali.rejected]: (state, action) => {
        state.loading = false,
            state.error = action
    },
    [getDateRangeHitsKundali.pending]: (state, action) => {
        state.loading = true;
    },
    [getDateRangeHitsKundali.fulfilled]: (state, action) => {
        state.loading = false,
            state.result = action.payload.data
    },
    [getDateRangeHitsKundali.rejected]: (state, action) => {
        state.loading = false,
            state.error = action
    },
}

})


export default kundliHits.reducer;
