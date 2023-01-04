import {
    GET_ALL_QUERIES_REQUEST,
    GET_ALL_QUERIES_SUCCESS,
    GET_ALL_QUERIES_FAILURE,

    UPDATE_QUERIES_REQUEST,
    UPDATE_QUERIES_SUCCESS,
    UPDATE_QUERIES_FAILURE,

    DELETE_SINGLE_QUERY_REQUEST,
    DELETE_SINGLE_QUERY_SUCCESS,
    DELETE_SINGLE_QUERY_FAILURE,

    GET_SINGLE_QUERY_REQUEST,
    GET_SINGLE_QUERY_SUCCESS,
    GET_SINGLE_QUERY_FAILURE,

  
} from '../Constant/QueriesContant'
import { toast } from 'react-toastify'
import axios from 'axios'
const baseUrl ='http://sanatanjyoti-env.eba-ab3znppq.ap-south-1.elasticbeanstalk.com'
// const baseUrl ='https://b4ab-2401-4900-1c60-58d-19d9-1de2-f899-981f.in.ngrok.io'
// ========================= get all queries=====================
export const getAllQueries = (type='NEW',page=0,filterSearch='hi') => {

   
    return function (dispatch) {
      dispatch({
        type: GET_ALL_QUERIES_REQUEST,
        payload: true,
      });
      let OPTIONS = {
        url: `${baseUrl}/api/get_Contacts_on_Filter?status=${type}&createdDate&keyword=${filterSearch}&page=${page}&size=16`,
        method: "GET",
        headers: {
          'Accept': 'application/json'
        },
      };
      axios(OPTIONS)
        .then((res) => {
          dispatch(getAllQueriesPre(res.data));
        
        })
  
        .catch((error) => {
            dispatch({
              type: GET_ALL_QUERIES_FAILURE,
              loading: false,
              payload: false,
              msg: error.msg,
            });
          });;
  
    };
  };
  
  export const getAllQueriesPre = (data) => {

    return {
      type: GET_ALL_QUERIES_SUCCESS,
      payload: true,
      result: data,
      msg: "success"
    };
  };

  // ==================update comment===========================
  export const updateQueries = (data) => {
    return function (dispatch) {
      dispatch({
        type: UPDATE_QUERIES_REQUEST,
        payload: true,
      });
      let OPTIONS = {
        url: `${baseUrl}/api/update_Contact`,
        data: data,
        method: "PUT",
        headers: {
          'Accept': 'application/json'
        },
      };
      axios(OPTIONS)
        .then((res) => {
          dispatch(updateQueriesPre(res.data));
        })
  
        .catch((error) => {
          console.log(error, 'err')
          dispatch({
            type: UPDATE_QUERIES_FAILURE,
            loading: false,
            payload: false,
            msg: error.msg,
          });
        });
  
    };
  };
  
  export const updateQueriesPre = (data) => {
    return {
      type: UPDATE_QUERIES_SUCCESS,
      payload: false,
      result: data,
      msg: "success"
    };
  };
  

  // ===================DELETE COMMENT==========================
  
export const deleteSingleQuery = (id) => {

  const baseUrl = 'https://1a71-2405-201-4041-c01c-3476-950-f2aa-3382.in.ngrok.io'

  return function (dispatch) {
   
    dispatch({
      type: DELETE_SINGLE_QUERY_REQUEST,
      payload: true,
    });
    let OPTIONS = {
      url: `${baseUrl}/api/delete_Contact?contactId=${id}`,
      method: "DELETE",
      headers: {
        'Accept': 'application/json'
      },
    };
    axios(OPTIONS)
      .then((res) => {
        dispatch(deleteSingleQueryPre(res.data));
      })

      .catch((error) => {
        dispatch({
          type: DELETE_SINGLE_QUERY_FAILURE,
          loading: false,
          payload: false,
          msg: error.msg,
        });
      });

  };
};

export const deleteSingleQueryPre = (data) => {  
  toast.success("Comment Successful deleted")
  return {
    type: DELETE_SINGLE_QUERY_SUCCESS,
    payload: true,
    result: data,
    msg: "success"
  };
};


// =======================get single query +++++============================

export const getSingleQuery = (id) => {

   
  return function (dispatch) {
    dispatch({
      type: GET_SINGLE_QUERY_REQUEST,
      payload: true,
    });
    let OPTIONS = {
      url: `${baseUrl}/api/get_Contact_By_Id?contactId=${id}`,
      method: "GET",
      headers: {
        'Accept': 'application/json'
      },
    };
    axios(OPTIONS)
      .then((res) => {
        dispatch(getSingleQueryPre(res.data));
        // console.log(res.data,'this is response single query')
      
      })

      .catch((error) => {
          dispatch({
            type: GET_SINGLE_QUERY_FAILURE,
            loading: false,
            payload: false,
            msg: error.msg,
          });
        });;

  };
};

export const getSingleQueryPre = (data) => {

  return {
    type: GET_SINGLE_QUERY_SUCCESS,
    payload: true,
    result: data,
    msg: "success"
  };
};

