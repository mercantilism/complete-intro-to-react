import React from 'react';
import { shape, string } from 'prop-types';
import styled from 'styled-components';

// styled`...` is a tagged template literal - it's valid JS and runs a template
// literal - the style rules - through the function styled.div;
// it returns a div with those styles.

// these styles aren't output as inlined styles; it creates a style tag inside of which
// the rules are applied to a generated class also applied to the generated element.
// Media queries and sass/less use of & also work in styled components
const Wrapper = styled.div`
  width: 32%;
  border: 2px solid #333;
  border-radius: 4px;
  margin-bottom: 25px;
  padding-right: 10px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 46%;
  float: left;
  margin-right: 10px;
`;

// props here - the parent argument body - is immutable; the child can't modify these
const ShowCard = props => (
  <Wrapper>
    <Image src={`/public/img/posters/${props.show.poster}`} alt={`${props.show.title} Show Poster`} />
    <div>
      <h3>{props.show.title}</h3>
      <h4>({props.show.year})</h4>
      <p>{props.show.description}</p>
    </div>
  </Wrapper>
);

/* if we wanted to create default prop vals
ShowCard.defaultProps = {
  foo: 'stuff'
};
*/

// we can define the props of a propTypes type object with the shape() method
ShowCard.propTypes = {
  show: shape({
    poster: string.isRequired,
    title: string.isRequired,
    year: string.isRequired,
    description: string.isRequired
  }).isRequired
};

export default ShowCard;
