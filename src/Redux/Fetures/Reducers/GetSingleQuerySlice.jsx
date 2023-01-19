import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getSingleQuery = createAsyncThunk('QUERIES/GET_SINGLE_QUERY',
    async (id) => {
       
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/get_Contact_By_Id?contactId=${id}`,
            method: "GET",
            headers: {
              'Accept': 'application/json'
            },
          };
        return axios(OPTIONS)
            .then(res => res)
    })

    export const updateQueriesAction = createAsyncThunk('QUERIES_UPDATE/UPADTE_QUERIES',
    async (data) => {
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/update_Contact`,
            method: "PUT",
            headers: {
                'Accept': 'application/json'
            },
            data:data,
        };
        return axios(OPTIONS)
                .then(res => res)
    })


    
const singleQuery = createSlice({
        name: 'Single Query',
    initialState: {
        loading: false,
        result: [],
        error: null
    },

  extraReducers: {
        // ==============GET REQUEST=============
        [getSingleQuery.pending]: (state, action) => {
            state.loading = true;
        },
        [getSingleQuery.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload.data.data
        },
        [getSingleQuery.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },

           // =============UPDATE QUERY======================
      

          [updateQueriesAction.pending]: (state, action) => {
            state.loading = true;
        },
        [updateQueriesAction.fulfilled]: (state, action) => {
           
            state.loading = false,
                state.result =action.payload.data.data
                console.log(state.result,'after update')
                console.log(action.payload.data.data,'this is action ')
        },
        [updateQueriesAction.rejected]: (state, action) => {
            console.log('error')
            state.loading = false,
                state.error = action
        }
    }

})


export default singleQuery.reducer;