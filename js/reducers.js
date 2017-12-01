// @flow

import { combineReducers } from 'redux';
import { SET_SEARCH_TERM, ADD_API_DATA } from './actions';

// action shape should be like:
/*
{
  // required:
  type: string,
  payload: whatever state to pass in,
  // optional
  error: Error,
  metadata: some object of metadata
}
*/

const searchTerm = (state = '', action: Action) => {
  if (action.type === SET_SEARCH_TERM) {
    return action.payload;
  }
  return state;
};

const apiData = (state = {}, action: Action) => {
  if (action.type === ADD_API_DATA) {
    // we add a prop to our new apiData state object; it has the imdbID as it's key and a show obj for a value
    return Object.assign({}, state, { [action.payload.imdbID]: action.payload });
  }
  return state;
};

// combineReducers({searchTerm: searchTerm}...) shortened by es6 object-shorthand
const rootReducer = combineReducers({ searchTerm, apiData });

/*
// combining reducers without combineReducers()
const setSearchTerm = (state, action) => Object.assign({}, state, { searchTerm: action.payload });

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return setSearchTerm(state, action);
    default:
      return state;
  }
};
*/

export default rootReducer;
