// @flow

import React from 'react';
import { render } from 'react-dom';
import App from './App';

const renderApp = () => {
  render(<App />, document.getElementById('app'));
};

renderApp();

// for Hot Module Reload, only enabled in dev
// module.hot comes along as webpack bundles our code with various
// hot module reload plugins we've specified
if (module.hot) {
  // anytime App changes, rerender the whole app
  // the other modules/component know how to replace themselves
  // because of the joints we made through the babel config,
  // it's just the top level module that needs to be helped out
  module.hot.accept('./App', () => {
    renderApp();
  });
}
