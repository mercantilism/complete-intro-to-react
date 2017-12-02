/* eslint no-console: 0 */
require('babel-register');
// In this file we can only write js that node will understand,
// but babel-register will run all of our require()'d modules through babel

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const ReactRouter = require('react-router-dom');
const _ = require('lodash');
const fs = require('fs');
const App = require('./js/App').default;

const StaticRouter = ReactRouter.StaticRouter;
const port = 8080;
// fs.readFileSync() is the synchronous version of fs.readFile('./file', () => {...callback for async read})
// it's a bad idea to use this most places. It's ok here because were just reading once, on start up
const baseTemplate = fs.readFileSync('./index.html');
// template will now be a function, when we invoke it we'll get back our markup from baseTemplate
const template = _.template(baseTemplate);

const server = express();

// says statically serve files in the public library
server.use('/public', express.static('./public'));

server.use((req, res) => {
  console.log(req.url);
  // ReactRouter/StaticRouter will actually end up modifying this context obj
  const context = {};
  // instead of rendering our react components to a DOM or something,
  // ReactDOMServer.renderToString() will just give us the result HTML as a string
  const body = ReactDOMServer.renderToString(
    React.createElement(StaticRouter, { location: req.url, context }, React.createElement(App))
  );
  // handling inter-app redirects, if we had any
  if (context.url) {
    res.redirect(context.url);
  }

  res.write(template({ body }));
  res.end();
});

console.log(`listening on port ${port}`);
server.listen(port);
