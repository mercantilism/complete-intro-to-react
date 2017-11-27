import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Search from '../Search';

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
  const component = shallow(<Search />);
  // A directory is created for snapshots inside of current directory
  // Here match the current tree agains our previous tree snapshot
  expect(component).toMatchSnapshot();
  // If we want to update our shapshot, say we change our component,
  // we can update our snapshots by running jest with -u:
  // NODE_ENV=test ./node_modules/.bin/jest -u
  // - this will rewrite our snapshots
});

// Note that we have to configure for using imports and jsx in our .babelrc
// - we'll need to create top level "env" option to provide plugin use to our test target
// we'll then have to preface running jest in the command line with an assertion of environment
// so - if run locally - NODE_ENV=test ./node_modules/.bin/jest
