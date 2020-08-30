import * as constant from './constants';

// LOAD_PRODUCT
export function loadProducts(params) {
  return {
    type: constant.LOAD_PRODUCTS,
    params
  };
}

export function loadProductsSuccess(payload) {
  return {
    type: constant.LOAD_PRODUCTS_SUCCESS,
    payload
  };
}

export function loadCategory(params) {
  return {
    type: constant.LOAD_CATEGORY,
    params
  };
}

export function loadCategorySuccess(payload) {
  return {
    type: constant.LOAD_CATEGORY_SUCCESS,
    payload
  };
}

export function loadProductByCategory(params) {
  return {
    type: constant.LOAD_PRODUCT_BY_CATEGORY,
    params
  };
}

export function loadProductByCategorySuccess(payload) {
  return {
    type: constant.LOAD_PRODUCT_BY_CATEGORY_SUCCESS,
    payload
  };
}

export function createOrder(params) {
  return {
    type: constant.CREATE_ORDER_ACTION,
    params
  };
}

export function createOrderSuccess(payload) {
  return {
    type: constant.CREATE_ORDER_ACTION_SUCCESS,
    payload
  };
}

export function addProductToCart(params) {
  return {
    type: constant.ADD_PRODUCT_TO_CART,
    params
  };
}

export function addProductToCartSuccess() {
  return {
    type: constant.ADD_PRODUCT_TO_CART_SUCCESS
  };
}

export function addProductToCartFailed() {
  return {
    type: constant.ADD_PRODUCT_TO_CART_FAILED
  };
}

export function showAddToCartAlert(payload) {
  return {
    type: constant.SHOW_ADD_TO_CART,
    payload
  };
}

export function hideAddToCartAlert(payload) {
  return {
    type: constant.HIDE_ADD_TO_CART,
    payload
  };
}

export function loginAction(params) {
  return {
    type: constant.LOGIN_ACTION,
    params
  };
}

export function loginActionSuccess(payload) {
  return {
    type: constant.LOGIN_ACTION_SUCCESS,
    payload
  };
}

export function signUpAction(params) {
  return {
    type: constant.SIGNUP_ACTION,
    params
  };
}

export function signUpActionSuccess(payload) {
  return {
    type: constant.SIGNUP_ACTION_SUCCESS,
    payload
  };
}

export function getUserInfo(params) {
  console.log('params', params);
  return {
    type: constant.GET_USER_INFO,
    params
  };
}

export function getUserInfoSuccess(payload) {
  return {
    type: constant.GET_USER_INFO_SUCCESS,
    payload
  };
}

export function updateUserInfo(params) {
  return {
    type: constant.UPDATE_USER_INFO,
    params
  };
}

export function updateUserInfoSuccess(payload) {
  return {
    type: constant.UPDATE_USER_INFO_SUCCESS,
    payload
  };
}

export function resetPasswordAction(params) {
  return {
    type: constant.RESET_PASSWORD_ACTION,
    params
  };
}

export function resetPasswordActionSuccess(payload) {
  return {
    type: constant.RESET_PASSWORD_ACTION_SUCCESS,
    payload
  };
}

export function sendEmailAction(params) {
  return {
    type: constant.SEND_EMAIL_ACTION,
    params
  };
}

export function sendEmailActionSuccess(payload) {
  return {
    type: constant.SEND_EMAIL_ACTION_SUCCESS,
    payload
  };
}

export function addUserAddress(params) {
  return {
    type: constant.ADD_USER_ADDRESS,
    params
  };
}

export function addUserAddressSuccess(payload) {
  return {
    type: constant.ADD_USER_ADDRESS_SUCCESS,
    payload
  };
}

export function logOutAction(params) {
  return {
    type: constant.LOG_OUT_ACTION,
    params
  };
}

export function getOrders(params) {
  return {
    type: constant.GET_ORDERS,
    params
  };
}

export function getOrdersSuccess(payload) {
  return {
    type: constant.GET_ORDERS_SUCCESS,
    payload
  };
}

export function loadCartData(params) {
  return {
    type: constant.LOAD_CARD_DATA,
    params
  };
}

export function loadCartDataSuccess(payload) {
  return {
    type: constant.LOAD_CARD_DATA_SUCCESS,
    payload
  };
}

export function emptyCart(params) {
  return {
    type: constant.EMPTY_CART,
    params
  };
}

export function emptyCartSuccess(payload) {
  return {
    type: constant.EMPTY_CART_SUCCESS,
    payload
  };
}

export function syncCart(params) {
  return {
    type: constant.SYNC_CART,
    params
  };
}

export function syncCartSuccess(payload) {
  return {
    type: constant.SYNC_CART_SUCCESS,
    payload
  };
}

export function cancelOrder(params) {
  return {
    type: constant.CANCEL_ORDER,
    params
  };
}

export function cancelOrderSuccess(payload) {
  return {
    type: constant.CANCEL_ORDER_SUCCESS,
    payload
  };
}
