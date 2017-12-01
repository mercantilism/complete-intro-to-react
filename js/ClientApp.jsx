// @flow

import React from 'react';
import { render } from 'react-dom';
// import Perf from 'react-addons-perf';
import App from './App';

// bring in performance tools
// make perf tools available on window, so we can manipulate it
/*
window.Perf = Perf;
// start on page load
Perf.start();
*/

// in console, Perf.printWasted() will show us all of the times we render but nothing changes
// Perf.printInclusive() will give times for all renders
// Perf.printExclusive() will do much the same, but exclusive of life cycle methods

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
