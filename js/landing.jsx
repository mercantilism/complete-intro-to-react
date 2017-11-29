// @flow

import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div className="landing">
    <h1>reactvideo</h1>
    <input type="text" placeholder="search" />
    <Link to="/search">or Browse All</Link>
  </div>
  // the 'to' attribute of the Link component provides the
  //  corresponding href for a given route
);

export default Landing;
