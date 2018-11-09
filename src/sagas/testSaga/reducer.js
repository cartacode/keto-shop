import * as action from './actions'

export const init = () => {
  return {
    type: action.INIT,
    payload: {},
  }
}

const ACTION_HANDLERS = {
  [action.SET_STATE]: (state, action) => {
    return { ...state, ...action.payload }
  },
  [action.INIT]: (state, action) => {
    return { ...state, ...action.payload }
  },
  [action.PRODUCTS]: (state, action) => {
    return { ...state, ...action.payload }
  },
  [action.UPDATE_PRODUCTS]: (state, action) => {
    let products = state.products.slice(1, 3);
    return { ...state, ...action.payload, products: products }
  }
}

let defaultState = {}

export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
