import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import HomePage from '../container';
import CartPage from '../container/CartPage';
import Admin from '../container/Admin';
import { syncHistoryWithStore } from 'react-router-redux';


export default class Routes extends Component {
  render() {
    const { history, store } = this.props;
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/cart" component={CartPage} />
            <Route exact path="/admin" component={Admin} />
          </Switch>
        </Router>
      </div>
    )
  }
}
