import { createSelector } from 'reselect';

/**
 * Direct selector to the authorize state domain
 */

const selectHomeDomain = state => state.home;
export const makeSelectCartData = () =>
  createSelector(selectHomeDomain, subState => subState.cartData);

export const makeSelectShowAddToCartAler = () =>
  createSelector(selectHomeDomain, subState => subState.showAddToCart);

export const makeSelectCurrentUser = () =>
  createSelector(selectHomeDomain, subState => subState.currentUser);

export const makeSelectMessageEmail = () =>
  createSelector(selectHomeDomain, subState => subState.messageEmail);

export const makeSelectProducts = () =>
  createSelector(selectHomeDomain, subState => subState.products);

export const makeSelectProductsByCategory = () =>
  createSelector(selectHomeDomain, subState => subState.productByCat);

export const makeSelectCategory = () =>
  createSelector(selectHomeDomain, subState => subState.category);

export const makeSelectOrders = () =>
  createSelector(selectHomeDomain, subState => subState.orders);
