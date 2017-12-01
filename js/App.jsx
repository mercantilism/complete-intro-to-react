// @flow

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// this is the type for props.match
import type { Match } from 'react-router-dom';
import preload from '../data.json';
import Landing from './Landing';
import Search from './Search';
import Details from './Details';

const FourOhFour = () => <h1>404</h1>;

const App = () => (
  // BrowserRouter is a higher order component; it doesn't render anything itself,
  // it delegates rendering. It could be said that a higher order
  // component encapsulates behavior, but not style or markup

  // The Switch component prevents the router from rendering more
  // than one component, allowing us to serve our 404 component
  <BrowserRouter>
    <div className="app">
      <Switch>
        {/* <h1> Example of inter jsx comment </h1> */}
        <Route exact path="/" component={Landing} />
        <Route path="/search/:term" component={props => <Search shows={preload.shows} {...props} />} />
        <Route path="/search" component={props => <Search shows={preload.shows} {...props} />} />
        <Route
          path="/details/:id"
          component={(props: { match: Match }) => {
            const selectedShow = preload.shows.find(show => props.match.params.id === show.imdbID);
            // as well as passing show from props, because details is a route, we want it
            // to also have the rest of props, so we pass it as a destructured object: {...props}
            return <Details show={selectedShow} {...props} />;
          }}
        />
        <Route component={FourOhFour} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
