import React from 'react';
import renderer from 'react-test-renderer';
import Search from '../Search';

test('Search renders correctly', () => {
  // render Search without the dom
  const component = renderer.create(<Search />);
  // convert Search component to json tree
  const tree = component.toJSON();
  // A directory is created for snapshots inside of current directory
  // Here match the current tree agains our previous tree snapshot
  expect(tree).toMatchSnapshot();
  // If we want to update our shapshot, say we change our component,
  // we can update our snapshots by running jest with -u:
  // NODE_ENV=test ./node_modules/.bin/jest -u
  // - this will rewrite our snapshots
});

// Note that we have to configure for using imports and jsx in our .babelrc
// - we'll need to create top level "env" option to provide plugin use to our test target
// we'll then have to preface running jest in the command line with an assertion of environment
// so - if run locally - NODE_ENV=test ./node_modules/.bin/jest
