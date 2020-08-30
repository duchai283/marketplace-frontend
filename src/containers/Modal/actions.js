import * as constant from './constants';

export function showLoginModal() {
  return {
    type: constant.SHOW_LOGIN_MODAL
  };
}
export function hideLoginModal() {
  return {
    type: constant.HIDE_LOGIN_MODAL
  };
}

export function showSignUpModal() {
  return {
    type: constant.SHOW_SIGN_UP_MODAL
  };
}
export function hideSignUpModal() {
  return {
    type: constant.HIDE_SIGN_UP_MODAL
  };
}

export function showForgotPassModal() {
  return {
    type: constant.SHOW_FORGOT_PASS_MODAL
  };
}
export function hideForgotPassModal() {
  return {
    type: constant.HIDE_FORGOT_PASS_MODAL
  };
}

export function showGlobalLoading() {
  return {
    type: constant.SHOW_GLOBAL_LOADING
  };
}
export function hideGlobalLoading() {
  return {
    type: constant.HIDE_GLOBAL_LOADING
  };
}

export function showProductDetails(params) {
  return {
    type: constant.SHOW_PRODUCT_DETAILS,
    params
  };
}
export function hideProductDetails() {
  return {
    type: constant.HIDE_PRODUCT_DETAILS
  };
}

export function showEmptyCart(params) {
  return {
    type: constant.SHOW_EMPTY_CART,
    params
  };
}
export function hideEmptyCart() {
  return {
    type: constant.HIDE_EMPTY_CART
  };
}

export function showCancelOrderModal(params) {
  return {
    type: constant.SHOW_CANCEL_ORDER,
    params
  };
}
export function hideCancelOrderModal() {
  return {
    type: constant.HIDE_CANCEL_ORDER
  };
}
