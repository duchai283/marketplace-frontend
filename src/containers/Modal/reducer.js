// eslint-disable-next-line
import produce from 'immer';

import * as constants from './constants';

export const initialState = {
  showLoginModal: false,
  showSignUpModal: false,
  showForgotPassModal: false,
  showProductDetails: false,
  hasLoader: false,
  product: {},
  showEmptyCart: false,
  showCancelOrder: false,
  orderId: ''
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, newState => {
    switch (action.type) {
      case constants.SHOW_LOGIN_MODAL:
        newState.showLoginModal = true;
        break;
      case constants.HIDE_LOGIN_MODAL:
        newState.showLoginModal = false;
        break;
      case constants.SHOW_SIGN_UP_MODAL:
        newState.showSignUpModal = true;
        break;
      case constants.HIDE_SIGN_UP_MODAL:
        newState.showSignUpModal = false;
        break;
      case constants.SHOW_FORGOT_PASS_MODAL:
        newState.showForgotPassModal = true;
        break;
      case constants.HIDE_FORGOT_PASS_MODAL:
        newState.showForgotPassModal = false;
        break;
      case constants.SHOW_GLOBAL_LOADING:
        newState.hasLoader = true;
        break;
      case constants.HIDE_GLOBAL_LOADING:
        newState.hasLoader = false;
        break;
      case constants.SHOW_PRODUCT_DETAILS:
        newState.product = action.params;
        newState.showProductDetails = true;
        break;
      case constants.HIDE_PRODUCT_DETAILS:
        newState.showProductDetails = false;
        break;
      case constants.SHOW_EMPTY_CART:
        newState.showEmptyCart = true;
        break;
      case constants.HIDE_EMPTY_CART:
        newState.showEmptyCart = false;
        break;

      case constants.SHOW_CANCEL_ORDER:
        newState.showCancelOrder = true;
        newState.orderId = action.params.id;
        break;
      case constants.HIDE_CANCEL_ORDER:
        newState.showCancelOrder = false;
        newState.orderId = '';
        break;
    }
  });

export default reducer;
