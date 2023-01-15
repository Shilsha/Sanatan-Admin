import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const baseUrl = 'http://sanatanjyoti-env.eba-ab3znppq.ap-south-1.elasticbeanstalk.com'

export const getHitsFestival = createAsyncThunk('HITS_FESTIVAL/GET_HITS_FESTIVAL',
async (data) => {      
    let OPTIONS = {
        url: `${baseUrl}/api/getHits?module=festivalModule&createdAt=${data}`,
        // url: `https://62be-2405-201-4041-c01c-20fb-c0da-32bc-a7e6.in.ngrok.io/api/getHits?module=festivalModule&createdAt=${data}`,
        method: "GET",
        headers: {
          'Accept':'application/json'
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
}})


export default festivalsHits.reducer;
