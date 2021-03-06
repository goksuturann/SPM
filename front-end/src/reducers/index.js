// frontend/src/reducers/index.js

import { LOGOUT_SUCCESS } from '../actions/types'; // added
import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from './auth';
// export default combineReducers({
//   form: formReducer,
//   todos,
//   auth
// });

const appReducer = combineReducers({
  form: formReducer,
  auth
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;