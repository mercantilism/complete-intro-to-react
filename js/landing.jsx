// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RouterHistory } from 'react-router-dom';
import { setSearchTerm } from './actionCreators';

class Landing extends Component {
  props: {
    searchTerm: string,
    handleSearchTermChange: Function,
    wipeSearchTerm: Function,
    history: RouterHistory
  };
  // Because we need to inherit this from Landing, we want goToSearch to be an arrow function.
  goToSearch = (event: SyntheticEvent) => {
    event.preventDefault();
    // because Landing has a route, it has access to history
    this.props.history.push('/search');
  };
  render() {
    return (
      <div className="landing">
        <h1>reactvide</h1>
        <form onSubmit={this.goToSearch}>
          <input
            onChange={this.props.handleSearchTermChange}
            value={this.props.searchTerm}
            type="text"
            placeholder="search"
          />
        </form>
        <Link onClick={this.props.wipeSearchTerm} to="/search">
          or browse all
        </Link>
      </div>
    );
  }
}

// We want to take our redux handled state, and make available to the Landing component
// just the part of that state that this component has business caring about.
const mapStateToProps = state => ({ searchTerm: state.searchTerm });
// mapDispatchToProps creates methods that our Component can evoke to dispatch events to redux
const mapDispatchToProps = (dispatch: Function) => ({
  // everything in this object will be injected as props into Landing
  // dispatch is a function provided by redux specifically for passing actions to reducers
  handleSearchTermChange(event) {
    dispatch(setSearchTerm(event.target.value));
  },
  wipeSearchTerm() {
    dispatch(setSearchTerm(''));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
