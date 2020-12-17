import axios from 'axios';
import { stopSubmit } from 'redux-form';

import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    JOB_POST_FAIL,
    JOB_POST_SUCCESS,
    APPLICATION_SUCCESS,
    APPLICATION_FAIL
  } from './types';

const backend = "http://127.0.0.1:8000"

// POST JOB
export const post_job = ({job_title, keywords, salary,min_req,recommend_req},oed, employer_id) => async dispatch => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
      // Request Body
      
      const body = JSON.stringify({job_title, keywords, salary,min_req,recommend_req,"employer_id":employer_id.id,"offer_end_date":oed });
  
      try {
        const res = await axios.post(backend+'/api/jobs/create-job/', body, config);
        dispatch({
          type: JOB_POST_SUCCESS,
          payload: res.data
        });
      } catch (err) {
        dispatch({
          type: JOB_POST_FAIL
        });
      }
  };

  export const add_applicant = (employee_id, job_id) => async dispatch => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
      // Request Body
      
      const body = JSON.stringify({"employee_id":employee_id});
  
      try {
        const res = await axios.post(backend+'/api/jobs/'+job_id+'/add-applicant/', body, config);
        dispatch({
          type: JOB_POST_SUCCESS,
          payload: res.data
        });
      } catch (err) {
        dispatch({
          type: JOB_POST_FAIL
        });
      }
  };
  