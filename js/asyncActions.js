// @flow

import axios from 'axios';
import { addAPIData } from './actionCreators';

function getAPIDetails(imdbID: string) {
  // returns a function for redux to resolve once the appropriate incoming data is available
  return (dispatch: Function) => {
    axios
      .get(`http://localhost:3000/${imdbID}`)
      .then(response => {
        dispatch(addAPIData(response.data));
      })
      .catch(error => {
        console.error('axios error', error); // eslint-disable-line no-console
      });
  };
}

export default getAPIDetails;
