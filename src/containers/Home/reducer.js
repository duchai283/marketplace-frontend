// eslint-disable-next-line
import produce from 'immer';

import * as constants from './constants';
import { persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';

export const initialState = {
  cartData: {},
  showAddToCart: {},
  currentUser: null,
  messageEmail: '',
  products: [],
  category: [],
  productByCat: [],
  orders: []
};

const persistConfig = {
  key: 'home',
  storage: localStorage,
  whitelist: ['cartData', 'currentUser'],
  debounce: 1000
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, newState => {
    switch (action.type) {
      // login
      case constants.LOGIN_ACTION:
        break;
      case constants.LOGIN_ACTION_SUCCESS:
        newState.bannerSlider = action.payload;
        break;

      case constants.ADD_PRODUCT_TO_CART:
        break;
      case constants.ADD_PRODUCT_TO_CART_SUCCESS:
        break;
      case constants.ADD_PRODUCT_TO_CART_FAILED:
        break;

      case constants.EMPTY_CART:
        break;
      case constants.EMPTY_CART_SUCCESS:
        newState.cartData = action.payload;
        break;
      case constants.ADD_PRODUCT_TO_CART_FAILED:
        break;

      case constants.LOAD_CARD_DATA:
        break;
      case constants.LOAD_CARD_DATA_SUCCESS:
        newState.cartData = action.payload;
        break;

      case constants.SHOW_ADD_TO_CART:
        newState.showAddToCart.isShow = true;
        newState.showAddToCart.qty = action.payload.qty;
        newState.showAddToCart.isDelete = action.payload.isDelete;
        break;
      case constants.HIDE_ADD_TO_CART:
        newState.showAddToCart.isShow = false;
        newState.showAddToCart.qty = 0;
        newState.showAddToCart.isDelete = false;
        break;

      case constants.GET_USER_INFO_SUCCESS:
        newState.currentUser = action.payload;
        break;
      case constants.SEND_EMAIL_ACTION_SUCCESS:
        newState.messageEmail = action.payload;
        break;
      case constants.LOG_OUT_ACTION:
        newState.currentUser = null;
        newState.cartData = {};
        break;
      case constants.LOAD_PRODUCTS_SUCCESS:
        newState.products = action.payload;
        break;
      case constants.LOAD_CATEGORY_SUCCESS:
        newState.category = action.payload;
        break;
      case constants.LOAD_PRODUCT_BY_CATEGORY_SUCCESS:
        newState.productByCat = action.payload;
        break;
      case constants.GET_ORDERS_SUCCESS:
        newState.orders = action.payload;
        break;
    }
  });

export default persistReducer(persistConfig, reducer);
