import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import preload from '../../data.json';
import Search from '../Search';
import ShowCard from '../ShowCard';

test('Search renders correctly', () => {
  // Using just renderer:
  // render Search without the dom with renderer
  // const component = renderer.create(<Search />);
  // convert Search component to json tree
  // const tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // Using enzyme: enzyme is a wrapper around react-test-renderer
  // We use shallow from enzyme to create our component. It's using renderer under
  // the hood, but renderer and enzyme cannot be imported in the same file
  // shallow() lets us test the component but it ignore it's children components
  // We should create separate tests for our children
  const component = shallow(<Search shows={preload.shows} />);
  // A directory is created for snapshots inside of current directory
  // Here match the current tree agains our previous tree snapshot
  expect(component).toMatchSnapshot();
  // If we want to update our shapshot, say we change our component,
  // we can update our snapshots by running jest with -u:
  // NODE_ENV=test ./node_modules/.bin/jest -u
  // - this will rewrite our snapshots
});

test('Search should render correct amount of shows', () => {
  const component = shallow(<Search shows={preload.shows} />);
  // order of expect statements should match: received value to equal expected value
  // component.find() works with css selectors, like 'input' but also with
  // react component, in our case ShowCard
  expect(component.find(ShowCard).length).toEqual(preload.shows.length);
});

test('Search should render the correct amount of showcards based on search term', () => {
  const searchWord = 'black';
  const component = shallow(<Search shows={preload.shows} />);
  // simulate() simulates events
  component.find('input').simulate('change', { target: { value: searchWord } });
  const showCount = preload.shows.filter(
    show => `${show.title} ${show.description}`.toUpperCase().indexOf(searchWord.toUpperCase()) >= 0
  ).length;
  expect(component.find(ShowCard).length).toEqual(showCount);
});

// we can skip a test by declaring xtest(), like:
xtest("this is a test I'm skipping", () => {});

// we can also create a test suite using 'describe' and nesting our test's inside it:
// (this is useful when we're testing multiple features or pieces of functionality that apply in the same component)
/*
describe('Search', () => {
  // inside we would use the keyword 'it' instead of test
  it('should render correct amount of shows', () => {...})
})
*/

// Note that we have to configure for using imports and jsx in our .babelrc
// - we'll need to create top level "env" option to provide plugin use to our test target
// we'll then have to preface running jest in the command line with an assertion of environment
// so - if run locally - NODE_ENV=test ./node_modules/.bin/jest
