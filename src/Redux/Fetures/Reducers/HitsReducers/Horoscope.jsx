import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const baseUrl = 'http://sanatanjyoti-env.eba-ab3znppq.ap-south-1.elasticbeanstalk.com'

export const getHitsHoroscope  = createAsyncThunk('HITS_HOROSCOPE/GET_HITS_HOROSCOPE',
    async (data) => {      
        let OPTIONS = {
            url: `${baseUrl}/api/getHits?module=HoroscopeModule&createdAt=${data}`,
            // url: `https://62be-2405-201-4041-c01c-20fb-c0da-32bc-a7e6.in.ngrok.io/api/getHits?module=HoroscopeModule&createdAt=2023-01-11`,
            method: "GET",
            headers: {
              'Accept': 'application/json'
            },
          };
        return axios(OPTIONS)
            .then(res => res)
    })
const horoscopeHits = createSlice({
        name: 'GET HITS',
    initialState: {
        loading: false,
        result: [],
        error: null
    },

    
  extraReducers: {
    // ==============GET REQUEST PANCHNAG=============
    [getHitsHoroscope.pending]: (state, action) => {
        state.loading = true;
    },
    [getHitsHoroscope.fulfilled]: (state, action) => {
        state.loading = false,
            state.result = action.payload.data.data
    },
    [getHitsHoroscope.rejected]: (state, action) => {
        state.loading = false,
            state.error = action
    },

}

})


export default horoscopeHits.reducer;
