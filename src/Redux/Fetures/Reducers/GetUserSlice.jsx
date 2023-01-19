import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify';
const baseUrl = 'http://sanatanjyoti-env.eba-ab3znppq.ap-south-1.elasticbeanstalk.com'
// const baseUrl = 'https://0bbe-2405-201-4041-c01c-9dd3-a1e5-c247-8e87.in.ngrok.io'

export const getUser = createAsyncThunk('USER/GET_ALL_USER',
    async (data) => {
        let OPTIONS = {
            url: `${baseUrl}/api/get_registeredUsers?enabled=${data.type}&page=${data.page}&size=16`,
            method: "GET",
            headers: {
              'Accept': 'application/json'
            },
          };
        return axios(OPTIONS)
            .then(res => res)
    })


 export const deleteUser = createAsyncThunk('USER_DELETE/DELETE_USER',
    async (id) => {
        let OPTION = {
            url: `${baseUrl}/api/deleteUser?userId=${id}&page=0&size=10`,
            method: "DELETE",
            headers: {
              "content-type": "application/json",
            },
          };
        return axios(OPTION)
            .then(res => res)
    })


    
 const users = createSlice({
        name: 'USER',
    initialState: {
        loading: false,
        result: [],
        error: null
    },

  extraReducers: {
        // ==============GET REQUEST=============
        [getUser.pending]: (state, action) => {
            state.loading = true;
        },
        [getUser.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload.data.data
        },
        [getUser.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },
        // ==============DELETE USER==================
        [deleteUser.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteUser.fulfilled]: (state, action) => {
            // console.log(action.payload.data.data.userId,'action')
            // toast.success('User deleted successfully')
            state.loading = false,
                state.result =state.result.filter((data)=>data.userId!==action.payload.data.data.userId)
                toast.success('User deactivated successfully ! ')
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },
    }

})


export default users.reducer;