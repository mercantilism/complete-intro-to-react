// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
// this is the type for props.match
import type { Match } from 'react-router-dom';
// react-redux provides bindings between react and redux
import { Provider } from 'react-redux';
import store from './store';
import preload from '../data.json';
import AsyncRoute from './AsyncRoute';

const FourOhFour = () => <h1>404</h1>;

const App = () => (
  // BrowserRouter is a higher order component; it doesn't render anything itself,
  // it delegates rendering. It could be said that a higher order
  // component encapsulates behavior, but not style or markup

  // The Switch component prevents the router from rendering more
  // than one component, allowing us to serve our 404 component
  <Provider store={store}>
    {/* Provider here, with it's store attr, puts store on context so it can be accessed across components */}
    <div className="app">
      <Switch>
        {/* <h1> Example of inter jsx comment </h1> */}
        <Route exact path="/" component={props => <AsyncRoute props={props} loadingPromise={import('./Landing')} />} />
        <Route
          path="/search"
          component={props => (
            <AsyncRoute props={Object.assign({ shows: preload.shows }, props)} loadingPromise={import('./Search')} />
          )}
        />
        <Route
          path="/details/:id"
          component={(props: { match: Match }) => {
            const selectedShow = preload.shows.find(show => props.match.params.id === show.imdbID);
            // as well as passing show from props, because details is a route, we want it
            // to also have the rest of props, so we pass it as a destructured object: {...props}
            return (
              <AsyncRoute
                props={Object.assign({ show: selectedShow, match: {} }, props)}
                loadingPromise={import('./Details')}
              />
            );
          }}
        />
        <Route component={FourOhFour} />
      </Switch>
    </div>
  </Provider>
);

export default App;
