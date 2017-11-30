// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  state = {
    searchTerm: ''
  };
  handleSearchTerm = (event: SyntheticKeyboardEvent & { target: HTMLInputElement }) => {
    this.setState({ searchTerm: event.target.value });
  };
  render() {
    return (
      <div className="landing">
        <h1>reactvideo</h1>
        <input type="text" placeholder="search" value={this.state.searchTerm} onChange={this.handleSearchTerm} />
        <Link to="/search">or Browse All</Link>
      </div>
      // the 'to' attribute of the Link component provides the
      //  corresponding href for a given route
    );
  }
}

export default Landing;
