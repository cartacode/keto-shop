import React, { Component } from 'react';
import { BrowserRouter as Router, HashRouter as HRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from '../container';

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        </Router>
      </div>
    )
  }
}
