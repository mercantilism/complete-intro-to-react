// @flow

import { createStore, compose } from 'redux';
import reducer from './reducers';

const store = createStore(
  reducer,
  compose(
    // if the environment is the browser and the redux devToolsExtension is present
    // then use the extension; else do nothing:
    // f => f, is an identity function: all it does is return it's argument
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )
);

export default store;
