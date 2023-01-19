import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getHitsLogin = createAsyncThunk('HITS_LOGIN/GET_HITS_LOGIN',
async () => {      
    let OPTIONS = {
        url: `${import.meta.env.VITE_BASE_URL}/api/getHits?module=LoginModule&createdAt=2023-01-11`,
    
        // url: `https://62be-2405-201-4041-c01c-20fb-c0da-32bc-a7e6.in.ngrok.io/api/getHits?module=LoginModule&createdAt=2023-01-11`,
    

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

}

})


export default loginHits.reducer;
