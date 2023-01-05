import {
    GET_THOUGHT_OF_DAY,
    UPDATE_THOUGHT_OF_DAY,
    
} from '../Constant/ThoughtConstant'

import axios from 'axios'
const baseUrl ='http://sanatanjyoti-env.eba-ab3znppq.ap-south-1.elasticbeanstalk.com'


// =============================get thought=======================
export const getThoughtOfDay = () => {
    return function (dispatch) {
        //   dispatch({
        //     type: c,
        //     payload: true,
        //   });
        let OPTIONS = {
            url: `${baseUrl}/api/get_thought?thoughtId=2&todayDate=`,
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
        };
           axios(OPTIONS)
            .then((res) => {

                dispatch( getThoughtOfDayPre(res.data));
                // console.log(res.data,'thoo')

            })

            .catch((error) => {
                // dispatch({
                //   type: GET_ALL_QUERIES_FAILURE,
                //   loading: false,
                //   payload: false,
                //   msg: error.msg,
                // });
                console.log(error, 'request fail')
            });;

    };
};

export const getThoughtOfDayPre = (data) => {
    
    return {
        type: GET_THOUGHT_OF_DAY,
        payload: false,
        result: data,
        msg: "thought get "
    };
};




// =================================update thought================================
// /api/update_thought

export const updateThoughtOfDay = (data) => {
    return function (dispatch) {
        //   dispatch({
        //     type: c,
        //     payload: true,
        //   });
        let OPTIONS = {
            url: `${baseUrl}/api/update_thought`,
            method: "PUT",

            data:data,
            headers: {
                'Accept': 'application/json'
            },

        };
           axios(OPTIONS)
            .then((res) => {

                dispatch( updateThoughtOfDayPre(res.data));
                // console.log(res.data,'thoo')

            })

            .catch((error) => {
                // dispatch({
                //   type: GET_ALL_QUERIES_FAILURE,
                //   loading: false,
                //   payload: false,
                //   msg: error.msg,
                // });
                console.log(error, 'request fail')
            });;

    };
};

export const updateThoughtOfDayPre = (data) => {
    
    return {
        type: UPDATE_THOUGHT_OF_DAY,
        payload: false,
        result: data,
        msg: "thought get "
    };
};
