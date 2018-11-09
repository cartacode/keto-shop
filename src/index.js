import React from 'react'
import ReactDOM from 'react-dom'
import App from './AppContainer'
import './index.css'

import createHistory from 'history/createBrowserHistory';
import { 
  connectRouter
} from 'connected-react-router';
import { BrowserRouter as Router, HashRouter as HRouter, Route, Switch } from 'react-router-dom';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'

import reducers from './reducers'
import createSagaMiddleware from 'redux-saga'

import sagas from './sagas';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import registerServiceWorker from './registerServiceWorker';


export const history = createHistory();
const connectRouterHistory = connectRouter(history);


const sagaMiddleware = createSagaMiddleware()

let composeEnhancers = compose

if (process.env.NODE_ENV === 'development') {
  const composeWithDevToolsExtension =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  if (typeof composeWithDevToolsExtension === 'function') {
    composeEnhancers = composeWithDevToolsExtension
  }
}

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(
    sagaMiddleware
  ))
)

sagaMiddleware.run(sagas)



ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
        <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)

registerServiceWorker();
