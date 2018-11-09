import React, { Component } from 'react';
import { BrowserRouter as Router, HashRouter as HRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../container';
import CartPage from '../container/CartPage';

export default class Routes extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/cart" component={CartPage} />
          </Switch>
        </Router>
      </div>
    )
  }
}
