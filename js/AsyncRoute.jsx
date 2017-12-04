// @flow
import React, { Component } from 'react';
import Spinner from './Spinner';

// AsyncRoute is a higher order component that we're creating. When it's rendered
// it's going to fetch the component we've requested within it - only after the fetch
// is complete will it render that component, in the mean time it will render spinner.
class AsyncRoute extends Component {
  state = {
    loaded: false
    // We could put our inner component in state but it's a really bad idea:
    // When React runs it's diffing algorithm, it checks everything in state
    // and components are kind of large and complex to be subjecting to frequent diff checks
  };
  componentDidMount() {
    // webpack is going to give us a module with our Component as it's default prop
    this.props.loadingPromise.then(module => {
      this.component = module.default;
      this.setState({ loaded: true });
    });
  }
  props: {
    // This will be the props for the children - for whatever component we're trying to render
    // it's type mixed because we don't know or care what kind of props the child will take
    props: mixed,
    // loadingPromise will be a promise that returns and object. That object will contain a default property
    // that will be a React Component - which is a Class. The stars define type info for that Component,
    //  they say we don't care, could be any type of React Component
    loadingPromise: Promise<{ default: Class<React.Component<*, *, *>> }>
  };
  // We put component on the class itself, instead of in state, so that it isn't subject to React's diffing algorithm.
  // We're only going to run the component once, we never want to do a rerender from AsyncRoute
  component = null;
  render() {
    if (this.state.loaded) {
      return <this.component {...this.props.props} />;
    }
    return <Spinner />;
  }
}

export default AsyncRoute;
