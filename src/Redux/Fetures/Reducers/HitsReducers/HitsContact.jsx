import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getHitsContact  = createAsyncThunk('HITS_CONTACT/GET_HITS_CONTACT',
async (data) => {      
    let OPTIONS = {
        url: `${import.meta.env.VITE_BASE_URL}/api/getHits?module=ContactModule&createdAt=${data}`,
        // url: `https://62be-2405-201-4041-c01c-20fb-c0da-32bc-a7e6.in.ngrok.io/api/getHits?module=ContactModule&createdAt=${data}`,
    

        method: "GET",
        headers: {
          'Accept': 'application/json'
        },
      };
    return axios(OPTIONS)
        .then(res => res)
})
const contactHits = createSlice({
        name: 'GET HITS',
    initialState: {
        loading: false,
        result: [],
        error: null
    },

    
  extraReducers: {
    // ==============GET REQUEST PANCHNAG=============
    [getHitsContact.pending]: (state, action) => {
        state.loading = true;
    },
    [getHitsContact.fulfilled]: (state, action) => {
        state.loading = false,
            state.result = action.payload.data.data
    },
    [getHitsContact.rejected]: (state, action) => {
        state.loading = false,
            state.error = action
    },

}

})


export default contactHits.reducer;
