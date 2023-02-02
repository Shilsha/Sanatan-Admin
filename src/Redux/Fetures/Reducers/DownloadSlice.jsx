
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toast } from "react-toastify";
export const exportDataAction = createAsyncThunk('EXPORT/GET_EXPORT',
    async (type) => {

        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/get_registeredUsers_downloadExcel?enabled=${type}`,
            method: "GET",


        };
        return axios(OPTIONS)
            .then(res => res)
    })
export const exportLogsDataAction = createAsyncThunk('EXPORT_LOGS/GET_EXPORT_LOGS',
    async (data) => {

        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/get_log_downloadExcel?module=${data.module}&createdAt=${data.dateStart}&endDate=${data.dateEnd}`,
            method: "GET",


        };
        return axios(OPTIONS)
            .then(res => res)
    })


const exportData = createSlice({
    name: 'EXPORT ',
    initialState: {
        loading: false,
        result: [],
        error: null
    },
   
    extraReducers: {
        [exportDataAction.pending]: (state, action) => {
            state.loading = true;
        },
        [exportDataAction.fulfilled]: (state, action) => {
            // console.log(action.payload.data.data,'payload')
            state.loading = false
            state.result = action.payload.data.data

        },
        [exportDataAction.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        },
        [exportLogsDataAction.pending]: (state, action) => {
            state.loading = true;
        },
        [exportLogsDataAction.fulfilled]: (state, action) => {
    
            state.loading = false
            state.result = action.payload.data.data

        },
        [exportLogsDataAction.rejected]: (state, action) => {
            state.loading = false,
                state.error = action
        }
    }
})

export default exportData.reducer;