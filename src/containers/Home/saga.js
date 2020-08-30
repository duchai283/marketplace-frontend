import { config } from 'src/global-config';
import { call, takeLatest, put, delay, select } from 'redux-saga/effects';
import { setAccessToken, setCurrentUser } from 'src/utils/validate';
import { showError, showSuccess } from 'src/utils/notification';
import * as navigation from 'src/utils/navigation';
import * as modalActions from 'src/containers/Modal/actions';
import request from 'src/utils/request';
import { v4 as uuidv4 } from 'uuid';
import * as actions from './actions';
import * as constants from './constants';
import { getCurrentUser } from 'src/utils/validate';
import { makeSelectCurrentUser, makeSelectCartData } from './selectors';
import { hideGlobalLoading } from '../Modal/actions';
import { get } from 'lodash';

function* onLoginAction(action) {
  const requestURL = `${config.apiUrl}/auth/login`;
  yield put(modalActions.showGlobalLoading());
  try {
    const res = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(action.params)
    });

    if (res.errors) {
      yield delay(500);
      yield put(modalActions.hideGlobalLoading());
      return showError(res.errors.message);
    }

    setAccessToken(res.token);
    if (res.token) {
      yield put(actions.getUserInfo());
      showSuccess('Login Successful');
      navigation.navigate('/');
    }
    yield delay(500);
    yield put(modalActions.hideGlobalLoading());
  } catch (err) {
    yield put(modalActions.hideGlobalLoading());
    showError('Login failed, Please try again!');
  }
}

function* onSignUpAction(action) {
  const requestURL = `${config.apiUrl}/auth/signup`;
  yield put(modalActions.showGlobalLoading());
  try {
    const res = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(action.params)
    });

    if (!res) {
      yield delay(500);
      yield put(modalActions.hideGlobalLoading());
      return showError('This email address have already sign up');
    }

    setAccessToken(res.token);
    if (res.token) {
      let isSignUp = true;
      yield put(actions.getUserInfo({ isSignUp }));
      showSuccess('Sign Up Successful');
    }
    yield delay(500);
    yield put(modalActions.hideGlobalLoading());
  } catch (err) {
    yield put(modalActions.hideGlobalLoading());
    showError(`This ${action.params.email} email address is exist`);
  }
}

function* onSyncCart(action) {
  const requestURL = `${config.apiUrl}/customers/sync-cart`;

  try {
    const res = yield call(request, requestURL, {
      method: 'GET',
      body: JSON.stringify()
    });

    if (res.cart) {
      yield put(actions.loadCartData());
    }

    yield put(modalActions.hideGlobalLoading());
  } catch (err) {
    yield put(modalActions.hideGlobalLoading());
  }
}

function* onGetUserInfo(action) {
  console.log('isSignUp', action);
  const isSignUp = get(action, 'params.isSignUp', false);
  const cartData = yield select(state => makeSelectCartData()(state));

  const requestURL = `${config.apiUrl}/customers/me`;

  try {
    const res = yield call(request, requestURL, {
      method: 'GET'
    });
    setCurrentUser(res.user);
    yield put(actions.getUserInfoSuccess(res.user));
    if (isSignUp && cartData.items.length !== 0) {
      yield put(actions.syncCart());
    }
    yield put(actions.loadCartData());
    yield put(modalActions.hideGlobalLoading());
  } catch (err) {
    yield put(modalActions.hideGlobalLoading());
    showError('login failed, Please try again!');
  }
}

function* onUpdateUserInfo(action) {
  yield put(modalActions.showGlobalLoading());
  let requestURL = `${config.apiUrl}/auth/update`;
  const isChangePassword = action.params.isChangePassword;

  if (isChangePassword) {
    requestURL = `${config.apiUrl}/auth/update?isChangePassword=true`;
  }
  try {
    let res;
    if (isChangePassword) {
      res = yield call(request, requestURL, {
        method: 'POST',
        body: JSON.stringify({
          currentPassword: action.params.currentPassword,
          newPassword: action.params.newPassword
        })
      });

      yield put(actions.getUserInfo());
      yield delay(500);
      yield put(modalActions.hideGlobalLoading());
      return showSuccess(res.message);
    }

    res = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(action.params)
    });

    if (res.errors) {
      yield delay(500);
      yield put(modalActions.hideGlobalLoading());
      return showSuccess(res.errors.message);
    }

    showSuccess(res.message);
    yield put(actions.getUserInfo());
    yield delay(500);
    yield put(modalActions.hideGlobalLoading());
  } catch (err) {
    yield put(modalActions.hideGlobalLoading());
    console.log('err', err);
    showError('Something went wrong! Please try again');
  }
}

function* onSendEmail(action) {
  yield put(modalActions.showGlobalLoading());
  const requestURL = `${config.apiUrl}/auth/send-email`;
  try {
    const res = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(action.params)
    });
    if (res.errors) {
      yield delay(500);
      yield put(modalActions.hideGlobalLoading());
      return showError(res.errors.message);
    }
    if (res.isSendEmail) {
      yield put(actions.sendEmailActionSuccess(action.params.email));
    }
    yield delay(500);
    yield put(modalActions.hideGlobalLoading());
  } catch (err) {
    yield put(modalActions.hideGlobalLoading());
    showError('Send Email failed, Please try again!');
  }
}

function* onResetPasswordAction(action) {
  yield put(modalActions.showGlobalLoading());
  const requestURL = `${config.apiUrl}/auth/reset-pass`;
  try {
    const res = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(action.params)
    });

    if (res.errors) {
      yield delay(500);
      yield put(modalActions.hideGlobalLoading());
      return showError(res.errors.message);
    }

    showSuccess(res.message);
    yield delay(500);
    yield put(modalActions.hideGlobalLoading());
  } catch (err) {
    yield put(modalActions.hideGlobalLoading());
    console.log('err', err);
    showError('Reset Password failed, Please try again!');
  }
}

function* onAddUserAddress(action) {
  const payload = { id: uuidv4(), ...action.params };
  yield put(modalActions.showGlobalLoading());
  const requestURL = `${config.apiUrl}/auth/add-address`;
  try {
    const res = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (res.errors) {
      yield delay(500);
      yield put(modalActions.hideGlobalLoading());
      return showError(res.errors.message);
    }

    showSuccess(res.message);
    yield put(actions.getUserInfo());
    yield delay(500);
    yield put(modalActions.hideGlobalLoading());
  } catch (err) {
    yield put(modalActions.hideGlobalLoading());
    console.log('err', err);
    showError('Reset Password failed, Please try again!');
  }
}

function* onLoadProduct() {
  yield put(modalActions.showGlobalLoading());
  const requestURL = `${config.apiUrl}/products/products`;
  try {
    const res = yield call(request, requestURL, {
      method: 'GET'
    });

    yield put(actions.loadProductsSuccess(res.data));
    yield delay(500);
    yield put(modalActions.hideGlobalLoading());
  } catch (err) {
    yield put(modalActions.hideGlobalLoading());
    showError('Load Product Failed, Please Try Again!');
  }
}

function* onLoadCategory() {
  yield put(modalActions.showGlobalLoading());
  const requestURL = `${config.apiUrl}/products/category`;
  try {
    const res = yield call(request, requestURL, {
      method: 'GET'
    });
    yield put(actions.loadCategorySuccess(res.data));
    yield delay(500);
    yield put(modalActions.hideGlobalLoading());
  } catch (err) {
    yield put(modalActions.hideGlobalLoading());
    showError('Load Category failed, Please try again!');
  }
}

function* onLoadProductByCategory(action) {
  yield put(modalActions.showGlobalLoading());
  const requestURL = `${config.apiUrl}/products/products-by-cat?id=${action.params.id}`;
  try {
    const res = yield call(request, requestURL, {
      method: 'GET'
    });
    yield put(actions.loadProductByCategorySuccess(res));
    yield delay(500);
    yield put(modalActions.hideGlobalLoading());
  } catch (err) {
    yield put(modalActions.hideGlobalLoading());
    showError('Load Category failed, Please try again!');
  }
}

function* onCreateOrder(action) {
  yield put(modalActions.showGlobalLoading());
  const requestURL = `${config.apiUrl}/products/create-order`;
  const currentUser = yield select(state => makeSelectCurrentUser()(state));

  try {
    const res = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ ...action.params, user_id: currentUser._id })
    });

    if (res.message) {
      showSuccess(res.message);
      yield put(actions.addProductToCartFailed([]));
      yield put(actions.loadCartData());
      navigation.navigate('/');
    }
    yield delay(500);
    yield put(modalActions.hideGlobalLoading());
  } catch (err) {
    yield put(modalActions.hideGlobalLoading());
    showError('Create order failed, Please try again!');
  }
}

function* onGetOrders(action) {
  yield put(modalActions.showGlobalLoading());
  const requestURL = `${config.apiUrl}/products/orders`;

  try {
    const res = yield call(request, requestURL, {
      method: 'GET'
    });

    if (res) {
      yield put(actions.getOrdersSuccess(res.data));
    }
    yield delay(500);
    yield put(modalActions.hideGlobalLoading());
  } catch (err) {
    yield put(modalActions.hideGlobalLoading());
    showError('Create order failed, Please try again!');
  }
}

function* onLoadCardData(action) {
  const requestURL = `${config.apiUrl}/customers/cart`;

  try {
    const res = yield call(request, requestURL, {
      method: 'GET'
    });
    console.log('res', res);
    yield put(actions.loadCartDataSuccess(res.cart));
  } catch (err) {
    console.log('err', err);
  }
}

function* onAddProductToCart(action) {
  const product = action.params.product;
  const qty = action.params.qty;
  const requestURL = `${config.apiUrl}/customers/cart`;

  try {
    const res = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify({
        item: { id_product: product._id, qty: qty >= 0 ? qty : 1 }
      })
    });

    yield put(actions.loadCartData());
  } catch (err) {}
}

function* onEmptyCart(action) {
  const requestURL = `${config.apiUrl}/customers/empty-cart`;
  try {
    const res = yield call(request, requestURL, {
      method: 'GET'
    });
    console.log('res', res);
    navigation.navigate('/');
    yield put(actions.loadCartData());
  } catch (err) {}
}

function* onCancelOrder(action) {
  const id = action.params.id;
  const requestURL = `${config.apiUrl}/products/cancel-order?id=${id}`;
  try {
    const res = yield call(request, requestURL, {
      method: 'GET'
    });
    console.log('res', res);
    if (res.data) {
      showSuccess('Cancel Order Success');
      navigation.navigate('/customer/orders');
    }
  } catch (err) {}
}

export default function* homeSaga() {
  yield takeLatest(constants.LOGIN_ACTION, onLoginAction);
  yield takeLatest(constants.SIGNUP_ACTION, onSignUpAction);
  yield takeLatest(constants.GET_USER_INFO, onGetUserInfo);
  yield takeLatest(constants.UPDATE_USER_INFO, onUpdateUserInfo);
  yield takeLatest(constants.RESET_PASSWORD_ACTION, onResetPasswordAction);
  yield takeLatest(constants.SEND_EMAIL_ACTION, onSendEmail);
  yield takeLatest(constants.ADD_USER_ADDRESS, onAddUserAddress);
  yield takeLatest(constants.LOAD_PRODUCTS, onLoadProduct);
  yield takeLatest(constants.LOAD_CATEGORY, onLoadCategory);
  yield takeLatest(constants.LOAD_PRODUCT_BY_CATEGORY, onLoadProductByCategory);
  yield takeLatest(constants.CREATE_ORDER_ACTION, onCreateOrder);
  yield takeLatest(constants.GET_ORDERS, onGetOrders);
  yield takeLatest(constants.LOAD_CARD_DATA, onLoadCardData);
  yield takeLatest(constants.ADD_PRODUCT_TO_CART, onAddProductToCart);
  yield takeLatest(constants.EMPTY_CART, onEmptyCart);
  yield takeLatest(constants.SYNC_CART, onSyncCart);
  yield takeLatest(constants.CANCEL_ORDER, onCancelOrder);
}
