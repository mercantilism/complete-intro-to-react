import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import Search from './Search';

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
        <Route path="/search" component={Search} />
        <Route component={FourOhFour} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
