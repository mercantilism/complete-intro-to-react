import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import Landing from './landing';

const App = () => (
  // HashRouter is a higher order component; it doesn't render anything itself,
  // it delegates rendering. It could be said that a higher order
  // component encapsulates behavior, but not style or markup
  <HashRouter>
    <div className="app">
      <Route exact path="/" component={Landing} />
    </div>
  </HashRouter>
);

render(<App />, document.getElementById('app'));
