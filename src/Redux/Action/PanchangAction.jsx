import {

    PANCHNAG_REQUEST,
    PANCHANG_SUCCESS,
    PANCHANG_FAILURE

} from '../Constant/PanchangConstant'

const url="https://json.astrologyapi.com/v1/advanced_panchang"


export  const panchang = (data) => { 

//   console.log(data,'this is form in action ')


     return function (dispatch) {
      dispatch({
        type: PANCHNAG_REQUEST,
        payload: true,
      });

    
              
 fetch(url, data)
    .then(response => response.json())
    .then(res => {
      //  console.log(res,'actions res')
        dispatch(panchangPre(res));       
    })
    .catch((error) => {
        // alert("error")
          dispatch({
            type: PANCHANG_FAILURE,
            loading: false,
            payload: false,
            msg: error.msg,
          });
        });
     
    };
  };
 
  export const panchangPre = (data) => {   
    return {
      type: PANCHANG_SUCCESS,
      payload: false,
      result: data,
      AdminLogin: true,
      msg: "success"
    };
  };
 
