import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getHitsLogin = createAsyncThunk('HITS_LOGIN/GET_HITS_LOGIN',
async () => {      
    let OPTIONS = {
        url: `${import.meta.env.VITE_BASE_URL}/api/getHits?module=LoginModule&createdAt=2023-01-11`,
        method: "GET",
        headers: {
          'Accept': 'application/json'
        },
      };
    return axios(OPTIONS)
        .then(res => res)
})

export const getDateRangeHitsLogin = createAsyncThunk('HITS_DATE_RANGE_LOGIN/GET_HITS_DATE_RANGE_LOGIN',
    async (data) => {
        console.log(data, 'this is action date')
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/Hits?createdAt=${data.startDate}&endDate=${data.endDate}&module=${data.module}`,
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
        };
        return axios(OPTIONS)
            .then(res => res)
    })
const loginHits = createSlice({
        name: 'GET HITS',
    initialState: {
        loading: false,
        result: [],
        error: null
    },

    
  extraReducers: {
    // ==============GET REQUEST PANCHNAG=============
    [getHitsLogin.pending]: (state, action) => {
        state.loading = true;
    },
    [getHitsLogin.fulfilled]: (state, action) => {
        state.loading = false,
            state.result = action.payload.data.data
    },
    [getHitsLogin.rejected]: (state, action) => {
        state.loading = false,
            state.error = action
    },
    [getDateRangeHitsLogin.pending]: (state, action) => {
        state.loading = true;
    },
    [getDateRangeHitsLogin.fulfilled]: (state, action) => {
        state.loading = false,
            state.result = action.payload.data.data
    },
    [getDateRangeHitsLogin.rejected]: (state, action) => {
        state.loading = false,
            state.error = action
    },

}

})


export default loginHits.reducer;
