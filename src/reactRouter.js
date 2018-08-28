import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import LandingPage from './views/LandingPage/LandingPage';

export default class ReactRouter extends Component {

  render() {
    const landingPageComponent = (props, state, params) =>
      <LandingPage />;

    return (
      <Router history={browserHistory}>
        <Route path="/" component={landingPageComponent} />
      </Router>
    );
  }
}
