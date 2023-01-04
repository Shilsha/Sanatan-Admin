import {
  GET_ALL_ADMIN_REQUEST,
  GET_ALL_ADMIN_SUCCESS,
  GET_ALL_ADMIN_FAILURE,


    ADD_ADMIN_REQUEST,
    ADD_ADMIN_SUCCESS,
    ADD_ADMIN_FAILURE,

      DELETE_SINGLE_ADMIN_REQUEST,
      DELETE_SINGLE_ADMIN_SUCCESS,
      DELETE_SINGLE_ADMIN_FAILURE,
} from '../Constant/AdminUserContant'
import axios from 'axios';
import { toast } from 'react-toastify';

// const baseUrl = 'https://b4ab-2401-4900-1c60-58d-19d9-1de2-f899-981f.in.ngrok.io'
const baseUrl = 'http://sanatanjyoti-env.eba-ab3znppq.ap-south-1.elasticbeanstalk.com'
// ====================================GET ALL ADMIN=======================
export const getAllAdmin = () => {


  return function (dispatch) {
    dispatch({
      type: GET_ALL_ADMIN_REQUEST,
      payload: true,
    });
    let OPTIONS = {
      url: `${baseUrl}/api/getAdminList?adminStatus=true&page=0&size=20`,
      method: "GET",
      headers: {
        'Accept': 'application/json'
      },
    };
    axios(OPTIONS)
      .then((res) => {
        dispatch(getAllAdminPre(res.data));
      })

      .catch((error) => {
        dispatch({
          type: GET_ALL_ADMIN_FAILURE,
          loading: false,
          payload: false,
          msg: error.msg,
        });
      });

  };
};

export const getAllAdminPre = (data) => {

  return {
    type: GET_ALL_ADMIN_SUCCESS,
    payload: true,
    result: data,
    msg: "success"
  };
};

// ====================ADMIN ADDD=========================================
export const addAdmin=(data)=>{
    
  

    return function (dispatch) {
      // console.log(data, 'form  ')
      dispatch({
        type: ADD_ADMIN_REQUEST,
        payload: true,
      });
      let OPTIONS = {
        url: `${baseUrl}/api/addAdmin`,
        data: data,
        method: "POST",
        headers: {
          'Accept': 'application/json'
        },
      };
      axios(OPTIONS)
        .then((res) => {
          dispatch(addAdminPre(res.data));
        })
  
        .catch((error) => {
          dispatch({
            type: ADD_ADMIN_FAILURE,
            loading: false,
            payload: false,
            msg: error.msg,
          });
        });
  
    };

}

export const addAdminPre = (data) => {
toast.success('New Admin has Added')
    return {
      type: ADD_ADMIN_SUCCESS,
      payload: true,
      result: data,
      msg: "success"
    };
  };
// ===============SINGLE ADMIN DELETE==============================


export const deleteSingleAdmin=(id)=>{
    
  return function (dispatch) {
       dispatch({
      type: DELETE_SINGLE_ADMIN_REQUEST,
      payload: true,
    });
    let OPTIONS = {
      url: `${baseUrl}/api/deleteAdmin?adminId=${id}`,
      method: "DELETE",
      headers: {
        'Accept': 'application/json'
      },
    };
    axios(OPTIONS)
      .then((res) => {
        dispatch(deleteSingleAdminPre(res.data));
      })

      .catch((error) => {
        dispatch({
          type: DELETE_SINGLE_ADMIN_FAILURE,
          loading: false,
          payload: false,
          msg: error.msg,
        });
      });

  };

}

export const deleteSingleAdminPre = (data) => {
  toast.success(' Admin has deleted')
  return {
    type: DELETE_SINGLE_ADMIN_SUCCESS,
    payload: true,
    result: data,
    msg: "success"
  };
};

  