import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,

  UPDATE_SINGLE_USER_REQUEST,
  UPDATE_SINGLE_USER_SUCCESS,
  UPDATE_SINGLE_USER_FAILURE,

  DELETE_SINGLE_USER_REQUEST,
  DELETE_SINGLE_USER_SUCCESS,
  DELETE_SINGLE_USER_FAILURE


} from "../Constant/UserConstant"

import axios from "axios";
import { toast } from 'react-toastify';
// api/get_registeredUsers?enabled=0&page=0&size=10'

const baseUrl = 'http://sanatanjyoti-env.eba-ab3znppq.ap-south-1.elasticbeanstalk.com'

// const baseUrl = 'https://b4ab-2401-4900-1c60-58d-19d9-1de2-f899-981f.in.ngrok.io'

// ----------------------------GET USER---------------------------------------------
export const GetUser = (page = '0') => {


  // console.log(page, 'this is form in action ')
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
      payload: true,
    });
    let OPTIONS = {
      url: `${baseUrl}/api/get_registeredUsers?enabled=true&page=${page}&size=16`,
      method: "GET",
      headers: {
        'Accept': 'application/json'
      },
    };
    axios(OPTIONS)
      .then((res) => {
        dispatch(getUserPre(res.data));
      })

      .catch((error) => {
        dispatch({
          type: GET_USER_FAILURE,
          loading: false,
          payload: false,
          msg: error.msg,
        });
      });

  };
};

export const getUserPre = (data) => {

  return {
    type: GET_USER_SUCCESS,
    payload: true,
    result: data,
    msg: "success"
  };
};


// ---------------------UPDATE USER -----------------------------

export const updateSingleUser = (data) => {

  console.log(data, 'this is single user update form in action ')
  return function (dispatch) {
    dispatch({
      type: UPDATE_SINGLE_USER_REQUEST,
      payload: true,
    });
    let OPTIONS = {
      url: `${baseUrl}/api/update_user`,
      method: "PUT",
      headers: {
        'Accept': 'application/json'
      },
    };
    axios(OPTIONS)
      .then((res) => {
        dispatch(updateSingleUserPre(res.data));
      })

      .catch((error) => {
        dispatch({
          type: UPDATE_SINGLE_USER_FAILURE,
          loading: false,
          payload: false,
          msg: error.msg,
        });
      });

  };
};

export const updateSingleUserPre = (data) => {

  return {
    type: UPDATE_SINGLE_USER_SUCCESS,
    payload: true,
    result: data,
    msg: "success"
  };
};

// =========================DELETE_SINGLE_USER==========================

export const deleteSingleUser = (id) => {
 
  return function (dispatch) {
    dispatch({
      type: DELETE_SINGLE_USER_REQUEST,
      payload: true,
    });

    let OPTION = {
      url: `${baseUrl}/api/deleteUser?userId=${id}&page=0&size=10`,
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    };

    axios(OPTION)
      .then((res) => {

        dispatch(deleteSingleUserPre(res.data.data));

      })
      .catch((error) => {
        dispatch({
          type: DELETE_SINGLE_USER_FAILURE,
          payload: false,
          error: error,
          msg: "Failed to load the information",
        });
      });
  };
};
export const deleteSingleUserPre = (data) => {
  toast.success("Deleted Successfully!");
  console.log(data,'response from delete action')

  return {
    type: DELETE_SINGLE_USER_SUCCESS,
    result: data,
    payload: true,
    msg: "SUCCESS",
  };
}