// @flow

import React from 'react';
import { connect } from 'react-redux';
import ShowCard from './ShowCard';
import Header from './Header';

// if we wanted to hold an array of html elements from our json we could:
// const Shows = preload.shows.map(show => <h3>{show.title}</h3>);
// but it would actually be a bad idea, because if anything changed
// to do with the actual shows data, Shows would still hold its
// original assignment value

// React Component classes must include the render() method, and that method must return markup.
const Search = (props: {
  // have to disable eslint on the following line - flow can't follow searchTerm 2 blocks deep
  searchTerm: string, // eslint-disable-line react/no-unused-prop-types
  shows: Array<Show>
}) => (
  <div className="search">
    <Header showSearch />
    <div>
      {/* the key prop is a unique id for react to hold on to for more efficient diffing */}
      {/* the key prop is also not available to the component to which
          it is passed - it's not accessible as part of props */}
      {props.shows
        // filter to match search term
        .filter(show => `${show.title} ${show.description}`.toUpperCase().indexOf(props.searchTerm.toUpperCase()) >= 0)
        .map(show => <ShowCard key={show.imdbID} {...show} />)}
    </div>
  </div>
);

const mapStateToProps = state => ({ searchTerm: state.searchTerm });

export default connect(mapStateToProps)(Search);
