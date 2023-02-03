import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';
export const addAdmin = createAsyncThunk('ADD_ADMIN/ADD_ADMIN',
    async (data) => {
        let OPTIONS = {
            url: `${import.meta.env.VITE_BASE_URL}/api/addAdmin`,
            data: data,
            method: "POST",
            headers: {
                'Accept': 'application/json'
            },
        };
        
        return  axios(OPTIONS)
        // .then(unwrapResult)
        .then((res)=>{
            console.log('res')
            return res

        })
        .catch(err=>{
           
            console.log({err},'err')
            const realErr={err}
            // console.log(unwrapResult(realErr),'real error')
            return rejectWithValue((realErr))
        })
      
        

    })

const addAdmins = createSlice({
    name: 'DELETE ADMIN',
    initialState: {
        loading: false,
        result: [],
        error: null
    },
    extraReducers: {

        // ==================ADD ADMIN ===================
        [addAdmin.pending]: (state, action) => {
            state.loading = true;
        },
        [addAdmin.fulfilled]: (state, action) => {
            console.log('successs')
            state.loading = false,
            state.result=action
            // console.log(action.payload.data.status.message,'err')
            // toast.success(action.payload.data.status.message)
        },
        [addAdmin.rejected]: (state, action) => {
            // console.log(action,'action error')
                state.loading = false,
                state.error = action,
                toast.warning("Please enter strong password like a test@123")
        }



    }

})


export default addAdmins.reducer;