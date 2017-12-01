// @flow

import React, { Component } from 'react';
// we would import prop-types if we weren't using flow
// import { shape, string } from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// styled`...` is a tagged template literal - it's valid JS and runs a template
// literal - the style rules - through the function styled.div;
// it returns a div with those styles.

// these styles aren't output as inlined styles; it creates a style tag inside of which
// the rules are applied to a generated class also applied to the generated element.
// Media queries and sass/less use of & also work in styled components
const Wrapper = styled(Link)`
  width: 32%;
  border: 2px solid #333;
  border-radius: 4px;
  margin-bottom: 25px;
  padding-right: 10px;
  overflow: hidden;
  color: black;
  text-decoration: none;
`;

const Image = styled.img`
  width: 46%;
  float: left;
  margin-right: 10px;
`;

// props here - the parent argument body - is immutable; the child can't modify these

class ShowCard extends Component {
  // Default behavior is to re-render on every state change.
  // Returning false from shouldComponentUpdate overrides that default behavior.
  // ShowCard is stateless, so, after it's initial render, it never needs to update
  // This is an important performance measure to take sense all of the showcards
  // would update whenever the user change the value of the Search serch input
  shouldComponentUpdate() {
    return false;
    // we could instead specify the update trigger, like
    // return this.props.rating !=== nextProps.rating
  }
  props: Show;
  render() {
    return (
      <Wrapper className="show-card" to={`/details/${this.props.imdbID}`}>
        <Image src={`/public/img/posters/${this.props.poster}`} alt={`${this.props.title} Show Poster`} />
        <div>
          <h3>{this.props.title}</h3>
          <h4>({this.props.year})</h4>
          <p>{this.props.description}</p>
        </div>
      </Wrapper>
    );
  }
}

// If we weren't using flow, but using prop types:
/* if we wanted to create default prop vals
ShowCard.defaultProps = {
  foo: 'stuff'
};
*/

// Again, if we weren't using flow, but using prop types:
// we can define the props of a propTypes type object with the shape() method
/*
ShowCard.propTypes = {
  show: shape({
    poster: string.isRequired,
    title: string.isRequired,
    year: string.isRequired,
    description: string.isRequired
  }).isRequired
};
*/

export default ShowCard;
