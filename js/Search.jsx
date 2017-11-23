import React, { Component } from 'react';
import preload from '../data.json';
import ShowCard from './ShowCard';

// if we wanted to hold an array of html elements from our json we could:
// const Shows = preload.shows.map(show => <h3>{show.title}</h3>);
// but it would actually be a bad idea, because if anything changed
// to do with the actual shows data, Shows would still hold its
// original assignment value

// React Component classes must include the render() method, and that method must return markup.
class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: 'this is some sort of debug statement'
    };

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  }
  handleSearchTermChange(event) {
    this.setState({ searchTerm: event.target.value });
    // We need to use the setState method, instead of this.state.searchTerm = ...
    // because setState lets react know that a re-render needs to occur
    // It's also an optimization path, wherein changes are batched
  }
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
          {preload.shows.map(show => <ShowCard key={show.imdbID} show={show} />)}
        </div>
      </div>
    );
  }
}

export default Search;
