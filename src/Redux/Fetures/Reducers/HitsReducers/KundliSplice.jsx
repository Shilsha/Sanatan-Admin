import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const baseUrl = 'http://sanatanjyoti-env.eba-ab3znppq.ap-south-1.elasticbeanstalk.com'
export const getHitsKundali = createAsyncThunk('HITS_KUNDLI/GET_HITS_KUNDLI',
    async (data) => {      
        let OPTIONS = {
            url: `${baseUrl}/api/getHits?module=KundaliModule&createdAt=${data}`,
            // url: `https://62be-2405-201-4041-c01c-20fb-c0da-32bc-a7e6.in.ngrok.io/api/getHits?module=KundaliModule&createdAt=${data}`,
        

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

}

})


export default kundliHits.reducer;
