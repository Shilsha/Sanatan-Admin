// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from 'axios'
// const import.meta.env.VITE_BASE_URL = 'http://sanatanjyoti-env.eba-ab3znppq.ap-south-1.elasticbeanstalk.com'

// export const getHitsPanchang = createAsyncThunk('HITS_PANCHANG/GET_HITS_PANCHANG',
//     async (data) => {     
//         console.log(data,'this is action date') 
//         let OPTIONS = {
//             // url: `${import.meta.env.VITE_BASE_URL}/api/getHits?module=festivalModule&createdAt&page=0&size=20`,
//             url: `https://62be-2405-201-4041-c01c-20fb-c0da-32bc-a7e6.in.ngrok.io/api/getHits?module=PanchangModule&createdAt=${data}`,
        

//             method: "GET",
//             headers: {
//               'Accept': 'application/json'
//             },
//           };
//         return axios(OPTIONS)
//             .then(res => res)
//     })

//     export const getHitsFestival = createAsyncThunk('HITS_FESTIVAL/GET_HITS_FESTIVAL',
//     async (data) => {      
//         let OPTIONS = {
//             // url: `${import.meta.env.VITE_BASE_URL}/api/getHits?module=festivalModule&createdAt&page=0&size=20`,
//             url: `https://62be-2405-201-4041-c01c-20fb-c0da-32bc-a7e6.in.ngrok.io/api/getHits?module=festivalModule&createdAt=${data}`,
        

//             method: "GET",
//             headers: {
//               'Accept': 'application/json'
//             },
//           };
//         return axios(OPTIONS)
//             .then(res => res)
//     })
//     export const getHitsKundali = createAsyncThunk('HITS_KUNDLI/GET_HITS_KUNDLI',
//     async (data) => {      
//         let OPTIONS = {
//             // url: `${import.meta.env.VITE_BASE_URL}/api/getHits?module=festivalModule&createdAt&page=0&size=20`,
//             url: `https://62be-2405-201-4041-c01c-20fb-c0da-32bc-a7e6.in.ngrok.io/api/getHits?module=KundaliModule&createdAt=${data}`,
        

//             method: "GET",
//             headers: {
//               'Accept': 'application/json'
//             },
//           };
//         return axios(OPTIONS)
//             .then(res => res)
//     })
    
//     export const getHitsContact  = createAsyncThunk('HITS_CONTACT/GET_HITS_CONTACT',
//     async (data) => {      
//         let OPTIONS = {
//             // url: `${import.meta.env.VITE_BASE_URL}/api/getHits?module=festivalModule&createdAt&page=0&size=20`,
//             url: `https://62be-2405-201-4041-c01c-20fb-c0da-32bc-a7e6.in.ngrok.io/api/getHits?module=ContactModule&createdAt=${data}`,
        

//             method: "GET",
//             headers: {
//               'Accept': 'application/json'
//             },
//           };
//         return axios(OPTIONS)
//             .then(res => res)
//     })
//     export const getHitsHoroscope  = createAsyncThunk('HITS_HOROSCOPE/GET_HITS_HOROSCOPE',
//     async () => {      
//         let OPTIONS = {
//             // url: `${import.meta.env.VITE_BASE_URL}/api/getHits?module=festivalModule&createdAt&page=0&size=20`,
//             url: `https://62be-2405-201-4041-c01c-20fb-c0da-32bc-a7e6.in.ngrok.io/api/getHits?module=HoroscopeModule&createdAt=2023-01-11`,
        

//             method: "GET",
//             headers: {
//               'Accept': 'application/json'
//             },
//           };
//         return axios(OPTIONS)
//             .then(res => res)
//     })
//     export const getHitsArticle = createAsyncThunk('HITS_ARTICLE/GET_HITS_ARTICLE',
//     async () => {      
//         let OPTIONS = {
//             // url: `${import.meta.env.VITE_BASE_URL}/api/getHits?module=festivalModule&createdAt&page=0&size=20`,
//             url: `https://62be-2405-201-4041-c01c-20fb-c0da-32bc-a7e6.in.ngrok.io/api/getHits?module=ArticleModule&createdAt=2023-01-11`,
        

//             method: "GET",
//             headers: {
//               'Accept': 'application/json'
//             },
//           };
//         return axios(OPTIONS)
//             .then(res => res)
//     })
//     export const getHitsMatchMaking = createAsyncThunk('HITS_MATCH_MAKING/GET_HITS_MATCH_MAKING',
//     async () => {      
//         let OPTIONS = {
//             // url: `${import.meta.env.VITE_BASE_URL}/api/getHits?module=festivalModule&createdAt&page=0&size=20`,
//             url: `https://62be-2405-201-4041-c01c-20fb-c0da-32bc-a7e6.in.ngrok.io/api/getHits?module=MatchMakingModule&createdAt=2023-01-11`,
        

//             method: "GET",
//             headers: {
//               'Accept': 'application/json'
//             },
//           };
//         return axios(OPTIONS)
//             .then(res => res)
//     })
//     export const getHitsLogin = createAsyncThunk('HITS_LOGIN/GET_HITS_LOGIN',
//     async () => {      
//         let OPTIONS = {
//             // url: `${import.meta.env.VITE_BASE_URL}/api/getHits?module=festivalModule&createdAt&page=0&size=20`,
//             url: `https://62be-2405-201-4041-c01c-20fb-c0da-32bc-a7e6.in.ngrok.io/api/getHits?module=LoginModule&createdAt=2023-01-11`,
        

//             method: "GET",
//             headers: {
//               'Accept': 'application/json'
//             },
//           };
//         return axios(OPTIONS)
//             .then(res => res)
//     })
// const Hits = createSlice({
//         name: 'GET HITS',
//         initialState: {
//         loading: false,
//         result: [],
//         result_fes:[],
//         result_Zodiac :[],
//         result_Horoscope :[],
//         result_Article:[],
//         result_festival :[],
//         result_Kundali :[],
//         result_Contact :[],
//         result_makeMatching :[],
//         result_login :[],
//         error: null
//     },

//   extraReducers: {
//         // ==============GET REQUEST PANCHNAG=============
//         [getHitsPanchang.pending]: (state, action) => {
//             state.loading = true;
//         },
//         [getHitsPanchang.fulfilled]: (state, action) => {
//             state.loading = false,
//                 state.result = action.payload.data.data
//         },
//         [getHitsPanchang.rejected]: (state, action) => {
//             state.loading = false,
//                 state.error = action
//         },
//         // ==============GET REQUEST FESTIVAL=============
//         [getHitsFestival.pending]: (state, action) => {
//             state.loading = true;
//         },
//         [getHitsFestival.fulfilled]: (state, action) => {
//             state.loading = false,
//                 state.result_fes = action.payload.data.data
//         },
//         [getHitsFestival.rejected]: (state, action) => {
//             state.loading = false,
//                 state.error = action
//         },
//         // ==============GET REQUEST Kundali=============
//         [getHitsKundali.pending]: (state, action) => {
//             state.loading = true;
//         },
//         [getHitsKundali.fulfilled]: (state, action) => {
//             state.loading = false,
//                 state.result_Kundali = action.payload.data.data
//         },
//         [getHitsKundali.rejected]: (state, action) => {
//             state.loading = false,
//                 state.error = action
//         },
  
//         // ==============GET REQUEST ArticleModule=============
//         [getHitsArticle.pending]: (state, action) => {
//             state.loading = true;
//         },
//         [getHitsArticle.fulfilled]: (state, action) => {
//             state.loading = false,
//                 state.result_Article = action.payload.data.data
//         },
//         [getHitsArticle.rejected]: (state, action) => {
//             state.loading = false,
//                 state.error = action
//         },
    
//         // ==============GET REQUEST Contact=============
//         [getHitsContact.pending]: (state, action) => {
//             state.loading = true;
//         },
//         [getHitsContact.fulfilled]: (state, action) => {
//             state.loading = false,
//                 state.result_Contact = action.payload.data.data
//         },
//         [getHitsContact.rejected]: (state, action) => {
//             state.loading = false,
//                 state.error = action
//         },
//         // ==============GET REQUEST Contact=============
//         [getHitsHoroscope.pending]: (state, action) => {
//             state.loading = true;
//         },
//         [getHitsHoroscope.fulfilled]: (state, action) => {
//             state.loading = false,
//                 state.result_Horoscope = action.payload.data.data
//         },
//         [getHitsHoroscope.rejected]: (state, action) => {
//             state.loading = false,
//                 state.error = action
//         },

//         // ==============GET REQUEST MATCH MAKING=============
//         [getHitsMatchMaking.pending]: (state, action) => {
//             state.loading = true;
//         },
//         [getHitsMatchMaking.fulfilled]: (state, action) => {
//             state.loading = false,
//                 state.result_makeMatching = action.payload.data.data
//         },
//         [getHitsMatchMaking.rejected]: (state, action) => {
//             state.loading = false,
//                 state.error = action
//         },
//         // ==============GET REQUEST lOGIN=============
//         [getHitsLogin.pending]: (state, action) => {
//             state.loading = true;
//         },
//         [getHitsLogin.fulfilled]: (state, action) => {
//             state.loading = false,
//                 state.result_login = action.payload.data.data
//         },
//         [getHitsLogin.rejected]: (state, action) => {
//             state.loading = false,
//                 state.error = action
//         },
//     }

// })


// export default Hits.reducer;