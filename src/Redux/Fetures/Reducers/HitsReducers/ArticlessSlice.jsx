import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getHitsArticle  = createAsyncThunk('HITS_ARTICLE/GET_HITS_ARTICLE',
async (data) => {      
    let OPTIONS = {
        url: `${import.meta.env.VITE_BASE_URL}/api/getHits?module=ArticleModule&createdAt=${data}`,
        // url: `https://62be-2405-201-4041-c01c-20fb-c0da-32bc-a7e6.in.ngrok.io/api/getHits?module=ContactModule&createdAt=${data}`,
    

        method: "GET",
        headers: {
          'Accept': 'application/json'
        },
      };
    return axios(OPTIONS)
        .then(res => res)
})
const articleHits = createSlice({
        name: 'GET ARTICLE HITS',
    initialState: {
        loading: false,
        result: [],
        error: null
    },

    
  extraReducers: {
    // ==============GET REQUEST PANCHNAG=============
    [getHitsArticle.pending]: (state, action) => {
        state.loading = true;
    },
    [getHitsArticle.fulfilled]: (state, action) => {
        state.loading = false,
            state.result = action.payload.data.data
    },
    [getHitsArticle.rejected]: (state, action) => {
        state.loading = false,
            state.error = action
    },

}

})


export default articleHits.reducer;
