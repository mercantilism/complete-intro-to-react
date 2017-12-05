// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import getAPIDetails from './asyncActions';
import Header from './Header';
import Spinner from './Spinner';

class Details extends Component {
  // component did mount is a life cycle hook: takes place after a component renders
  componentDidMount() {
    if (!this.props.rating) {
      this.props.getAPIData();
    }
  }
  props: {
    show: Show,
    rating: string,
    getAPIData: Function
  };
  render() {
    // destructuring props.show into same-named consts
    const { title, description, year, poster, trailer } = this.props.show;
    let ratingComponent;
    if (this.props.rating) {
      ratingComponent = <h3>{this.props.rating}</h3>;
    } else {
      ratingComponent = <Spinner />;
    }
    return (
      <div className="details">
        <Header />
        <section>
          <h1>{title}</h1>
          <h2>({year})</h2>
          {ratingComponent}
          <img src={`/public/img/posters/${poster}`} alt={`Poster for ${title}`} />
          <p>{description}</p>
        </section>
        <div>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&amp;controls=0&amp;showinfo=0`}
            frameBorder="0"
            allowFullScreen
            title={`trailer for ${title}`}
          />
        </div>
      </div>
    );
  }
}

// ownProps are the props passed down from the parents component
const mapStateToProps = (state, ownProps) => {
  // If the the imdbID passed from the parent matches an object in state.apiData,
  // then return that apiData obj prop, else return an empty object
  const apiData = state.apiData[ownProps.show.imdbID] ? state.apiData[ownProps.show.imdbID] : {};
  // Will either give us our rating - if we have already fetched the info for this title,
  // or will give us and undefined rating, so we can trigger the fetch
  return { rating: apiData.rating };
};
const mapDispatchToProps = (dispatch: Function, ownProps) => ({
  getAPIData() {
    dispatch(getAPIDetails(ownProps.show.imdbID));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
