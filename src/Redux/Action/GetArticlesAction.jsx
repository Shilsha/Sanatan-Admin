import {
  GET_ARTICLES_REQUEST,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILURE,

  ARTICLE_TYPE_UPDATE_REQUEST,
  ARTICLE_TYPE_UPDATE_SUCCESS,
  ARTICLE_TYPE_UPDATE_FAILURE,

  PUBLISH_MESSAGE_REQUEST,
  PUBLISH_MESSAGE_SUCCESS,
  PUBLISH_MESSAGE_FAILURE,

  REJECT_ARTICLE_REQUEST,
  REJECT_ARTICLE_SUCCESS,
  REJECT_ARTICLE_FAILURE,

  GET_SINGLE_ARTICLES_REQUEST,
  GET_SINGLE_ARTICLES_SUCCESS,
  GET_SINGLE_ARTICLES_FAILURE,



} from '../Constant/GetArticlesConstant'

import axios from "axios";

import { toast } from 'react-toastify';
// api/get_registeredUsers?enabled=0&page=0&size=10'

// ----------------------------GET USER---------------------------------------------
export const GetArticles = (type = 'PUBLISH') => {

  const baseUrl = `http://sanatanjyoti-env.eba-ab3znppq.ap-south-1.elasticbeanstalk.com/article/filter?category=All&keyword=&articleType=${type}&page=0&size=20`

  return function (dispatch) {
    dispatch({
      type: GET_ARTICLES_REQUEST,
      payload: true,
    });
    let OPTIONS = {
      url: `${baseUrl}`,
      method: "GET",
      headers: {
        'Accept': 'application/json'
      },
    };
    axios(OPTIONS)
      .then((res) => {
        dispatch(GetArticlesPre(res.data));
      })

      .catch((error) => {
        dispatch({
          type: GET_ARTICLES_FAILURE,
          loading: false,
          payload: false,
          msg: error.msg,
        });
      });

  };
};

export const GetArticlesPre = (data) => {

  return {
    type: GET_ARTICLES_SUCCESS,
    payload: true,
    result: data,
    msg: "success"
  };
};

// ==========================GET SINGLE ARTICLE ======================================
export const GetSingleArticle = (id) => {

  const baseUrl = `http://sanatanjyoti-env.eba-ab3znppq.ap-south-1.elasticbeanstalk.com/article/get_articleById?articleId=${id}`

  return function (dispatch) {
    dispatch({
      type: GET_SINGLE_ARTICLES_REQUEST,
      payload: true,
    });
    let OPTIONS = {
      url: `${baseUrl}`,
      method: "GET",
      headers: {
        'Accept': 'application/json'
      },
    };
    axios(OPTIONS)
      .then((res) => {
        dispatch(GetSingleArticlePre(res.data));
      })

      .catch((error) => {
        dispatch({
          type: GET_SINGLE_ARTICLES_FAILURE,
          loading: false,
          payload: false,
          msg: error.msg,
        });
      });

  };
};

export const GetSingleArticlePre = (data) => {
  
  return {
    type: GET_SINGLE_ARTICLES_SUCCESS,
    payload: true,
    result: data,
    msg: "success"
  };
};



// ================================= UPDATE ARTICLE TYPE=============== 

export const UpdateArticleType = (data) => {

  const baseUrl = 'http://sanatanjyoti-env.eba-ab3znppq.ap-south-1.elasticbeanstalk.com/api/approveArticle'

  return function (dispatch) {
    dispatch({
      type: ARTICLE_TYPE_UPDATE_REQUEST,
      payload: true,
    });
    let OPTIONS = {
      url: `${baseUrl}`,
      data: data,
      method: "PUT",
      headers: {
        'Accept': 'application/json'
      },
    };
    axios(OPTIONS)
      .then((res) => {
        dispatch(UpdateArticleTypePre(res.data));
      })

      .catch((error) => {
        console.log(error, 'err')
        dispatch({
          type: ARTICLE_TYPE_UPDATE_FAILURE,
          loading: false,
          payload: false,
          msg: error.msg,
        });
      });

  };
};

export const UpdateArticleTypePre = (data) => {
  return {
    type: ARTICLE_TYPE_UPDATE_SUCCESS,
    payload: true,
    result: data,
    msg: "success"
  };
};







// ============================Publish article message ==========================
export const PublishArticleMessage = (data) => {

  const baseUrl = 'http://sanatanjyoti-env.eba-ab3znppq.ap-south-1.elasticbeanstalk.com/api/approveArticle'

  return function (dispatch) {
    console.log(data, 'form publish form')
    dispatch({
      type: PUBLISH_MESSAGE_REQUEST,
      payload: true,
    });
    let OPTIONS = {
      url: `${baseUrl}`,
      data: data,
      method: "PUT",
      headers: {
        'Accept': 'application/json'
      },
    };
    axios(OPTIONS)
      .then((res) => {
        dispatch(PublishArticleMessagePre(res.data));
      })

      .catch((error) => {
        dispatch({
          type: PUBLISH_MESSAGE_FAILURE,
          loading: false,
          payload: false,
          msg: error.msg,
        });
      });

  };
};

export const PublishArticleMessagePre = (data) => {

  return {
    type: PUBLISH_MESSAGE_SUCCESS,
    payload: true,
    result: data,
    msg: "success"
  };
};


// =============================REJECT ARTICLE MESSAGE================================

export const RejectArticleMessage = (data) => {

  const baseUrl = 'http://sanatanjyoti-env.eba-ab3znppq.ap-south-1.elasticbeanstalk.com/api/delete_Article'

  return function (dispatch) {
    // console.log(data, 'form rejct form')
    dispatch({
      type: REJECT_ARTICLE_REQUEST,
      payload: true,
    });
    let OPTIONS = {
      url: `${baseUrl}`,
      data: data,
      method: "DELETE",
      headers: {
        'Accept': 'application/json'
      },
    };
    axios(OPTIONS)
      .then((res) => {
        dispatch(RejectArticleMessagePre(res.data));
      })

      .catch((error) => {
        dispatch({
          type: REJECT_ARTICLE_FAILURE,
          loading: false,
          payload: false,
          msg: error.msg,
        });
      });

  };
};

export const RejectArticleMessagePre = (data) => {

  toast.success("Your article has rejected")
    return {
    type: REJECT_ARTICLE_SUCCESS,
    payload: false,
    result: data,
    msg: "success"
  };
};
