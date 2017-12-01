// @flow

import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

// compose(...) is used when we want to pass multiple store enhancers to the store,
// where a store enhancer is just some higher order function that augments the ability of the store
const store = createStore(
  reducer,
  compose(
    // A thunk is a function that returns a value determined at run time - a function
    // where the returned value is differed until the completion of some asynch operation
    applyMiddleware(thunk),
    // if the environment is the browser and the redux devToolsExtension is present
    // then use the extension; else do nothing:
    // f => f, is an identity function: all it does is return it's argument
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )
);

export default store;
