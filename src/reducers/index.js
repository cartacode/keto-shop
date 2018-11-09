import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as testSaga } from '../sagas/testSaga/reducer'
// import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';

const reducers = combineReducers({
  testSaga,
  form: formReducer,
  router: routerReducer
})

export default reducers
