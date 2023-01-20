import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify';

// =======================GET============================
export const getBroadCastAction = createAsyncThunk('BROADCAST_OF_DAY/GET_BROADCAST',
    async () => {
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/get_all_announcement`,
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
        };
        return axios(OPTIONS)
            .then(res => res)
    })

// ============================================add broadcast==============================
export const addBroadcastAction = createAsyncThunk('BROADCAST_OF_DAY/ADD_BROADCAST',
    async (data) => {
        let OPTIONS = {
            // url: `${import.meta.env.VITE_BASE_URL}/api/add_announcement`,
            url: `https://2772-49-36-177-157.in.ngrok.io/api/add_announcement`,
            method: "POST",
            headers: {
                'Accept': 'application/json'
            },
            data: data
        };
        return axios(OPTIONS)
            .then(res => res)
    })

// ========================Update==============================================================

export const updateBroadcastAction = createAsyncThunk('UPDATE_BROADCAST_OF_DAY/UPDATE_BROADCAST_OF_DAY',
    async (data) => {
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/update_announcement`,
            method: "PUT",

            data: data,
            headers: {
                'Accept': 'application/json'
            },

        };
        return axios(OPTIONS)
            .then(res => res)
    })

// ======================delete broadcast============================

export const deleteBroadcastAction = createAsyncThunk('DELETE_BROADCAST_OF_DAY/DELETE_BROADCAST_OF_DAY',
    async (ID) => {
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/delete_announcement?announcementId=${ID}`,
            method: "DELETE",
            headers: {
                'Accept': 'application/json'
            },

        };
        return axios(OPTIONS)
            .then(res => res)
    })
const getBroadCastOfDay = createSlice({
    name: 'Braodcast Of Day',
    initialState: {
        loading: false,
        result: [],
        error: null,

    },

    extraReducers: {
        // ==============GET REQUEST=============
        [getBroadCastAction.pending]: (state, action) => {
            state.loading = true;
        },
        [getBroadCastAction.fulfilled]: (state, action) => {
            state.loading = false,
                state.result = action.payload.data.data
        },
        [getBroadCastAction.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },

        // ==============UPADTE REQUEST=============
        [updateBroadcastAction.pending]: (state, action) => {
            state.loading = true;
        },
        [updateBroadcastAction.fulfilled]: (state, action) => {
            console.log(state.result, 'stae')
            console.log(action.payload.data.data, 'action')
            state.loading = false,
                // state.result = state.result.map((data)=>data.announcementId==action.payload.data.data.announcementId?{...data,action.payload.data.data}:data)
                state.result = [...state.result.filter(d => d.announcementId !== action.payload.data.data.announcementId), action.payload.data.data,];

        },
        [updateBroadcastAction.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        }
        ,
        // =========================Add Request=================================
        [addBroadcastAction.pending]: (state, action) => {
            state.loading = true;
        },
        [addBroadcastAction.fulfilled]: (state, action) => {
            // toast.success('Added successfully')
            console.log( action.payload.data.status,'action add')
            toast.success( action.payload.data.status.message)
            state.loading = false
            [state.result.push(action.payload.data.data)]
        },
        [addBroadcastAction.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },

        // =======================delete request=======================
        [deleteBroadcastAction.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteBroadcastAction.fulfilled]: (state, action) => {
            toast.success('Broadcast has deactivated successfully')
        
            state.loading = false
            state.result = [...state.result.filter(d => d.announcementId !== action.payload.data.data.announcementId), action.payload.data.data,];

       
            // state.result=state.result.filter((data)=>data.announcementId==action.payload.data.data.announcementId)
        },
        [deleteBroadcastAction.rejected]: (state, action) => {
           
            state.loading = false,
                state.error = action
        },

    }
})


export default getBroadCastOfDay.reducer;