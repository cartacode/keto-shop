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
  [action.SAVE_PRODUCTS]: (state, action) => {
    return { ...state, ...action.payload }
  },
  [action.UPDATE_PRODUCTS]: (state, action) => {
    console.log('reducer update_PRODUCTS: ', action);
    let products = Object.assign([], state.allProducts);
    products = products.filter((product) => {
      if (product.price >= action.payload.filterPrice) {
        return product;
      }
    })

    return { ...state, ...action.payload, products: products }
  },
  [action.SAVE_ITEM]: (state, action) => {
    console.log('reducer SAVE_PRODUCTS: ', action, state);
    let products = state.cartItems;
    // let products = Object.assign([], state.cartItems);
    products.push(action.payload.product);
    
    return { ...state, ...action.payload, cartItems: products }
  },
}

let defaultState = {}

export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
