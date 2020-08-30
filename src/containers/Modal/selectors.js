import { createSelector } from 'reselect';

/**
 * Direct selector to the authorize state domain
 */

const selectHomeDomain = state => state.modal;
export const makeSelectShowLoginModal = () =>
  createSelector(selectHomeDomain, subState => subState.showLoginModal);

export const makeSelectShowSignUpModal = () =>
  createSelector(selectHomeDomain, subState => subState.showSignUpModal);

export const makeSelectShowForgotPassModal = () =>
  createSelector(selectHomeDomain, subState => subState.showForgotPassModal);
export const makeSelectHasLoader = () =>
  createSelector(selectHomeDomain, subState => subState.hasLoader);

export const makeSelectShowProductDetails = () =>
  createSelector(selectHomeDomain, subState => subState.showProductDetails);

export const makeSelectProduct = () =>
  createSelector(selectHomeDomain, subState => subState.product);

export const makeSelectShowEmptyCart = () =>
  createSelector(selectHomeDomain, subState => subState.showEmptyCart);

export const makeSelectShowCancelOrder = () =>
  createSelector(selectHomeDomain, subState => subState.showCancelOrder);

export const makeSelectOrderId = () =>
  createSelector(selectHomeDomain, subState => subState.orderId);
