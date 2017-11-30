// @flow

import React, { Component } from 'react';
import ShowCard from './ShowCard';

// if we wanted to hold an array of html elements from our json we could:
// const Shows = preload.shows.map(show => <h3>{show.title}</h3>);
// but it would actually be a bad idea, because if anything changed
// to do with the actual shows data, Shows would still hold its
// original assignment value

// React Component classes must include the render() method, and that method must return markup.
class Search extends Component {
  /*
  // without the use of class properties in defining class state, we would need
  // to create this.state inside of a constructor
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: 'this is some sort of debug statement'
    };

    // if, outside of the constructor, we hadn't defined handleSearchTerm as a prop,
    //  but as a method - 'handleSearchTermChange(event) {...}' - then we would of had
    // to bind handleSearchTermChange.this to the constructor 'this':
    // this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    // .bind() creates a new function that, when called has it's 'this' keyword
    // bound to the provided value
  }
  */

  state = {
    searchTerm: ''
  };
  props: {
    shows: Array<Show>
  };
  // we don't have to rebind this in handleSearchTermChange, because it's an arrow function.
  // arrow functions don't create new contexts when called - so even when called in render, it's
  // this will belong to its original context: this in Search
  handleSearchTermChange = (event: SyntheticKeyboardEvent & { target: HTMLInputElement }) => {
    this.setState({ searchTerm: event.target.value });
    // We need to use the setState method, instead of this.state.searchTerm = ...
    // because setState lets react know that a re-render needs to occur
    // It's also an optimization path, wherein changes are batched
  };
  render() {
    return (
      <div className="search">
        <header>
          <h1>reactvideo</h1>
          <input
            type="text"
            placeholder="search"
            onChange={this.handleSearchTermChange}
            value={this.state.searchTerm}
          />
        </header>
        <div>
          {/* the key prop is a unique id for react to hold on to for more efficient diffing */}
          {/* the key prop is also not available to the component to which
          it is passed - it's not accessible as part of props */}
          {this.props.shows
            // filter to match search term
            .filter(
              show =>
                `${show.title} ${show.description}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0
            )
            .map(show => (
              <ShowCard
                key={show.imdbID}
                poster={show.poster}
                title={show.title}
                year={show.year}
                description={show.description}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Search;
