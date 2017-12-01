import { SET_SEARCH_TERM } from './actions';

const DEFAULT_STATE = {
  searchTerm: ''
};

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

const setSearchTerm = (state, action) => Object.assign({}, state, { searchTerm: action.payload });

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return setSearchTerm(state, action);
    default:
      return state;
  }
};

export default rootReducer;
