// @flow

import { SET_SEARCH_TERM, ADD_API_DATA } from './actions';

export function setSearchTerm(searchTerm: string) {
  return { type: SET_SEARCH_TERM, payload: searchTerm };
}

// We're not actually going to be using this outside this file,
// but it's a good idea to export it anyway, so that we can import it
// into our test suite, or reuse on a separate incoming data source we might have
export function addAPIData(apiData: Show) {
  return { type: ADD_API_DATA, payload: apiData };
}
