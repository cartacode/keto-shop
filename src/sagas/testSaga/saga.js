import { put, call, takeLatest, take, takeEvery, all, fork } from 'redux-saga/effects'

import * as actions from './actions'
import {
  getProductsApi
} from './apiCreators';


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
