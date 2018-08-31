import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import LandingPage from './views/LandingPage/LandingPage';

export default class ReactRouter extends Component {

  render() {
    const landingPageComponent = () => <LandingPage easy={false} />;
    const easyMode = () => <LandingPage easy={true} />;

    return (
      <Router history={browserHistory}>
        <Route path="/" component={landingPageComponent} />
        <Route path="/easy" component={easyMode} />
      </Router>
    );
  }
}
