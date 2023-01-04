import {
    GET_THOUGHT_OF_DAY,
} from '../Constant/ThoughtConstant'

import axios from 'axios'
const baseUrl ='http://sanatanjyoti-env.eba-ab3znppq.ap-south-1.elasticbeanstalk.com'
export const getThoughtOfDay = () => {
    return function (dispatch) {
        //   dispatch({
        //     type: c,
        //     payload: true,
        //   });
        let OPTIONS = {
            url: `${baseUrl}/api/get_thought?thoughtId=11&todayDate=`,
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
        };
           axios(OPTIONS)
            .then((res) => {

                dispatch( getThoughtOfDayPre(res.data));

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
