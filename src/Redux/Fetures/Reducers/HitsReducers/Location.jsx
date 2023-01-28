import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getHitsLocation = createAsyncThunk('HITS_LOCATION/GET_HITS_LOCATION',
    async (data) => {
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/getHits?module=LocationModule&createdAt=${data}`,
            // url: `https://62be-2405-201-4041-c01c-20fb-c0da-32bc-a7e6.in.ngrok.io/api/getHits?module=ContactModule&createdAt=${data}`,
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
        };
        return axios(OPTIONS)
            .then(res => res)
    })


export const getDateRangeHitsLocation = createAsyncThunk('HITS_DATE_RANGE_LOCATION/GET_HITS_DATE_RANGE_LOCATION',
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
const locationHits = createSlice({
    name: 'GET LOCATION',
    initialState: {
        loading: false,
        result: [],
        error: null
    },


    extraReducers: {
        // ==============GET REQUEST PANCHNAG=============
        [getHitsLocation.pending]: (state, action) => {
            state.loading = true;
        },
        [getHitsLocation.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload.data.data
        },
        [getHitsLocation.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },
        [getDateRangeHitsLocation.pending]: (state, action) => {
            state.loading = true;
        },
        [getDateRangeHitsLocation.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload.data.data
        },
        [getDateRangeHitsLocation.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },

    }

})


export default locationHits.reducer;
