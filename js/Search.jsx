import React from 'react';
import preload from '../data.json';
import ShowCard from './ShowCard';

// if we wanted to hold an array of html elements from our json we could:
// const Shows = preload.shows.map(show => <h3>{show.title}</h3>);
// but it would actually be a bad idea, because if anything changed
// to do with the actual shows data, Shows would still hold its
// original assignment value

const Search = () => (
  <div className="search">
    <div>
      {/* the key prop is a unique id for react to hold on to for more efficient diffing */}
      {preload.shows.map(show => <ShowCard key={show.imdbID} show={show} />)}
    </div>
  </div>
);

export default Search;
