import { put, call, takeLatest, take, takeEvery, all, fork } from 'redux-saga/effects'

import * as actions from './actions'
import {
  getProductsApi
} from './apiCreators';

const TMP_PRODUCTS = [
  {
    name: 'Khaki Suede Polish Work Boots',
    price: 149.99,
    category: 'women',
    sale: true,
    article: 'shoe',
    img: 'shoe1.png'
  },
  {
    name: 'Camo Fang Backpack Jungle',
    price: 39.99,
    category: 'women',
    sale: false,
    article: 'jacket',
    img: 'jacket1.png'
  },
  {
    name: 'Parka and Quilted Liner Jacket',
    price: 49.99,
    category: 'men',
    sale: true,
    article: 'jacket',
    img: 'jacket2.png'
  },
  {
    name: 'Cotton Black Cap',
    price: 12.99,
    category: 'men',
    sale: true,
    article: 'hats',
    img: 'hat1.png'
  },
  {
    name: 'Knit Sweater with Zips',
    price: 29.99,
    category: 'women',
    sale: false,
    article: 'sweater',
    img: 'sweater1.png'
  },
  {
    name: 'Long Linen-blend Shirt',
    price: 18.99,
    category: 'men',
    sale: false,
    article: 'shirt',
    img: 'shirt1.png'
  },
  {
    name: 'Knit Orange Sweater',
    price: 28.99,
    category: 'men',
    sale: false,
    article: 'sweater',
    img: 'sweater2.png'
  },
  {
    name: 'Cotton Band-collar Blouse',
    price: 49.99,
    category: 'men',
    sale: false,
    article: 'shirt',
    img: 'shirt2.png'
  },
  {
    name: 'Camo Fang Backpack Jungle',
    price: 59.99,
    category: 'women',
    sale: true,
    article: 'jacket',
    img: 'jacket3.png'
  },
  {
    name: 'Golden Pilot Jacket',
    price: 129.99,
    category: 'women',
    sale: false,
    article: 'jacket',
    img: 'jacket4.png'
  },
  {
    name: 'Spotted Patterned Sweater',
    price: 80.99,
    category: 'women',
    sale: false,
    article: 'jacket',
    img: 'sweater4.png'
  },
  {
    name: 'Double Knit Sweater',
    price: 59.99,
    category: 'men',
    sale: true,
    article: 'jacket',
    img: 'sweater5.png'
  }
];

let defaultState = {
  message: 'has not run',
  products: [],
  cartItems: [],
};

function* init() {
  yield put({
    type: actions.SET_STATE,
    payload: {
      ...defaultState,
      message: 'has been run',
      products: [],
      allProducts: [],
    }
  })
}

function callProductAPI() {
  
}

function* getProducts() {
  const data = yield call(getProductsApi);
  let products = [];

  if (data && data.success && data.success == true) {
    products = data.data;
  }
  
	yield put({
		type: actions.PRODUCTS,
		payload: {
			...defaultState,
      message: '',
			products: products,
      allProducts: products,
		}
	})
}

function* filter(payload) {
  yield put({
    type: actions.UPDATE_PRODUCTS,
    payload: {
      ...defaultState,
      filterPrice: payload.price,
    }
  })
}

function* addItem(payload) {
  let products = Object.assign([], defaultState.cartItems);
  products.push(payload.product);

  yield put({
    type: actions.SAVE_ITEM,
    payload: {
      ...defaultState,
      product: payload.product,
      cartItems: products
    }
  })
}

export default function* sagas() {
  yield all([
    yield takeLatest(actions.INIT, init),
    yield takeLatest(actions.GET_PRODUCTS, getProducts),
    yield takeLatest(actions.FILTER, filter),
    yield takeLatest(actions.ADD_ITEM, addItem),
  ]);

}
