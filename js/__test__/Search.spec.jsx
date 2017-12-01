import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../store';
import { setSearchTerm } from '../actionCreators';
import preload from '../../data.json';
import Search, { Unwrapped as UnwrappedSearch } from '../Search';
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
  const component = shallow(<UnwrappedSearch shows={preload.shows} searchTerm="" />);
  // A directory is created for snapshots inside of current directory
  // Here match the current tree agains our previous tree snapshot
  expect(component).toMatchSnapshot();
  // If we want to update our shapshot, say we change our component,
  // we can update our snapshots by running jest with -u:
  // NODE_ENV=test ./node_modules/.bin/jest -u
  // - this will rewrite our snapshots
});

test('Search should render correct amount of shows', () => {
  const component = shallow(<UnwrappedSearch shows={preload.shows} searchTerm="" />);
  // order of expect statements should match: received value to equal expected value
  // component.find() works with css selectors, like 'input' but also with
  // react component, in our case ShowCard
  expect(component.find(ShowCard).length).toEqual(preload.shows.length);
});

test('Search should render the correct amount of showCard components based on search term - without Redux', () => {
  const searchWord = 'black';
  const component = shallow(<UnwrappedSearch shows={preload.shows} searchTerm={searchWord} />);
  const showCount = preload.shows.filter(
    show => `${show.title} ${show.description}`.toUpperCase().indexOf(searchWord.toUpperCase()) >= 0
  ).length;
  expect(component.find(ShowCard).length).toEqual(showCount);
});

test('Search should render the correct amount of showCard components based on search term - with Redux', () => {
  const searchWord = 'black';
  store.dispatch(setSearchTerm(searchWord));
  const component = render(
    <Provider store={store}>
      <MemoryRouter>
        <Search shows={preload.shows} searchTerm={searchWord} />
      </MemoryRouter>
    </Provider>
  );
  const showCount = preload.shows.filter(
    show => `${show.title} ${show.description}`.toUpperCase().indexOf(searchWord.toUpperCase()) >= 0
  ).length;
  // because we are using render() instead of shallow(), the 'component' value will be actual mark-up;
  // this means we have to find() with an actual css selector, instead of a react component name:
  // so '.show-card' instead of 'showCard'
  expect(component.find('.show-card').length).toEqual(showCount);
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
