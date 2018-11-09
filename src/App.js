import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Routes from './routes'
import Header from './components/Header';

import './App.css'

class App extends Component {
  static propTypes = {
    init: PropTypes.func
  }

  constructor(props) {
    super(props);
    window.localStorage.setItem("cartItems", JSON.stringify([]))
  }

  render() {
    const { history } = this.props;
    return (
      <div className="App">
        <Routes history={history} />
      </div>
    )
  }
}

export default App