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
    let products = Object.assign([], state.allProducts);
    products = products.filter((product) => {
      if (product.price >= action.payload.filterPrice) {
        return product;
      }
    })

    return { ...state, ...action.payload, products: products }
  },
  [action.SAVE_ITEM]: (state, action) => {
    let products = JSON.parse(localStorage.getItem("cartItems"))
    // let products = Object.assign([], state.cartItems);
    products.push(action.payload.product);
    localStorage.setItem("cartItems", JSON.stringify(products))
    
    return { ...state, ...action.payload, cartItems: products }
  },
}

let defaultState = {}

export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
