import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getHitsMatchMaking = createAsyncThunk('HITS_MATCH_MAKING/GET_HITS_MATCH_MAKING',
async (data) => {      
    let OPTIONS = {
        url: `${import.meta.env.VITE_BASE_URL}/api/getHits?module=MatchMakingModule&createdAt=${data}`,
        // url: `https://62be-2405-201-4041-c01c-20fb-c0da-32bc-a7e6.in.ngrok.io/api/getHits?module=MatchMakingModule&createdAt=2023-01-11`,
    

        method: "GET",
        headers: {
          'Accept': 'application/json'
        },
      };
    return axios(OPTIONS)
        .then(res => res)
})
const matchMakingHits = createSlice({
        name: 'GET HITS',
    initialState: {
        loading: false,
        result: [],
        error: null
    },

    
  extraReducers: {
    // ==============GET REQUEST PANCHNAG=============
    [getHitsMatchMaking.pending]: (state, action) => {
        state.loading = true;
    },
    [getHitsMatchMaking.fulfilled]: (state, action) => {
        state.loading = false,
            state.result = action.payload.data.data
    },
    [getHitsMatchMaking.rejected]: (state, action) => {
        state.loading = false,
            state.error = action
    },

}

})


export default matchMakingHits.reducer;
