import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useHistory } from 'react-router-dom';

import './styles.scss';
import Button from 'src/components/button';
import {
  makeSelectShowAddToCartAler,
  makeSelectCartData,
  makeSelectCurrentUser
} from 'src/containers/Home/selectors';
import * as actions from 'src/containers/Modal/actions';
import * as homeActions from '../../actions';
import { setAccessToken } from 'src/utils/validate';
import { setCurrentUser } from 'src/utils/validate';
import { formatMoney } from 'src/utils/helper';
import AddToCartBtn from 'src/components/Product/AddToCartBtn';
import { showEmptyCart } from 'src/containers/Modal/actions';
import { getCurrentUser } from 'src/utils/validate';
import { showSignUpModal } from 'src/containers/Modal/actions';
import { getAccessToken } from 'src/utils/validate';

const Header = ({ showAddToCartAler, cartData, dispatch, currentUser }) => {
  const [search, setSearch] = useState(null);
  const history = useHistory();

  const handleShowSignUpModal = () => {
    dispatch(actions.showSignUpModal());
  };
  const handleShowLoginModal = () => {
    dispatch(actions.showLoginModal());
  };

  const handleLogOut = () => {
    setAccessToken(null);
    setCurrentUser(null);
    dispatch(homeActions.logOutAction());
    dispatch(homeActions.emptyCart());
    dispatch(homeActions.loadCartData());
  };

  const handleSearch = () => {
    history.push(`/search/${search}`);
  };

  const renderPrice = item => {
    if (item.product.final_price !== 0) {
      return (
        <div className="priceComponent2">
          <div
            className="final__price"
            style={{ textAlign: 'left', fontSize: 14 }}
          >
            {formatMoney(item.product.final_price)}
          </div>
          <div className="price_wrap">
            <strike className="old_price" style={{ fontSize: 12 }}>
              {formatMoney(item.product.price)}
            </strike>
          </div>
        </div>
      );
    }
    return (
      <div className="nomarl_price" style={{ margin: '0' }}>
        {formatMoney(item.totalAmount)}
      </div>
    );
  };

  const renderPriceTotal = item => {
    if (item.product.final_price !== 0) {
      return (
        <div className="priceComponent" style={{ width: 100 }}>
          <div
            className="nomarl_price"
            style={{ textAlign: 'center', margin: 0, fontSize: 15 }}
          >
            {formatMoney(item.totalAmount)}
          </div>
          <div className="price_wrap">
            <div
              className="old_price"
              style={{ margin: '0 auto', fontSize: 10, color: 'red' }}
            >
              save {formatMoney(item.totalSaving)}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div
        className="nomarl_price"
        style={{ margin: '0 auto', width: 100, textAlign: 'center' }}
      >
        {formatMoney(item.totalAmount)}
      </div>
    );
  };

  console.log('cart', cartData);
  return (
    <>
      <header className="header">
        <div className="header__logo">
          <div class="wrapper__img">
            <Link to="/">
              <img src="../../images/logo.png" alt="logo_marketplace" />
            </Link>
          </div>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="search"
            className="search__input"
            value={search}
            onChange={e => setSearch(e.currentTarget.value)}
            onKeyDown={e => {
              if (e.which == 13 || e.keyCode == 13) {
                handleSearch();
                return false;
              }
              return true;
            }}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="search__icon"
            onClick={handleSearch}
          />
        </div>
        <div className="wrapper_end">
          <div className="cart">
            <FontAwesomeIcon icon={faShoppingCart} className="cart__icon" />
            Cart
            {cartData?.items?.length ? (
              <strong className="circle__items">
                {cartData.items.reduce((acc, curr) => acc + curr.qty, 0)}
              </strong>
            ) : null}
            {/* addTocart */}
            {showAddToCartAler.isShow ? (
              <div className="addToCart_Block">
                <div
                  className={`quantity ${
                    showAddToCartAler.isDelete ? 'remove' : ''
                  }`}
                >
                  {showAddToCartAler.qty}
                </div>
                <div className="text__add">
                  {showAddToCartAler.isDelete
                    ? 'sản phẩm đã được xoá'
                    : 'sản phẩm được thêm vào giỏ hàng'}
                </div>
              </div>
            ) : null}
            {/* endAddTocart */}
            {/* miniCart */}
            <div className="miniCart">
              <div className="wrapper__btn">
                <Button
                  text={'View Cart'}
                  onClick={() => history.push('/checkout/cart')}
                  style={{
                    color: 'rgb(64, 72, 90)',
                    background: 'rgb(228, 229, 233)'
                  }}
                />
                <span style={{ marginRight: '15px' }}></span>
                {cartData && cartData.items.length !== 0 && (
                  <Button
                    text={'checkout'}
                    onClick={() => {
                      if (getAccessToken()) {
                        history.push('/checkout/delivery-address');
                      } else {
                        dispatch(showSignUpModal());
                      }
                    }}
                  />
                )}
              </div>
              {cartData.items ? (
                <div className="minicart__items">
                  {cartData.items.map(item => (
                    <div className="cart__item">
                      <div className="item_img_wrap">
                        <img src={item.product.image} alt="" />
                      </div>
                      <div className="title_wrap">
                        <div>{item.product.title}</div>
                        <div className="price_wrap">{renderPrice(item)}</div>
                      </div>
                      <AddToCartBtn product={item.product} inCart={true} />
                      <div className="price_wrap">{renderPriceTotal(item)}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="miniCart__text">
                  Bạn chưa có sản phẩm nào trong cart
                </div>
              )}
              <div
                className="miniCart__empty"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 20px',
                  borderTop: '1px solid rgb(228, 229, 233)'
                }}
              >
                <div></div>
                <div
                  style={{ fontSize: '14px', color: 'rgb(131, 177, 81)' }}
                  onClick={() => {
                    dispatch(showEmptyCart());
                  }}
                >
                  Empty Cart
                </div>
              </div>
              <div className="miniCart__total">
                <div className="miniCart__total__text">Tổng Tiền</div>
                <div className="miniCart__total__subTotal">
                  {formatMoney(cartData.totalAmount)}
                </div>
              </div>
            </div>
            {/* end_miniCart */}
          </div>
          {currentUser ? (
            <div className="user">
              <span className="user__name">
                Hi, {currentUser.email.split('@')[0]}
              </span>
              <div className="user__activities">
                <Link className="user__block" to="/customer">
                  My Account
                </Link>
                <Link className="user__block" to="/customer/orders">
                  My Orders
                </Link>
                <Link to="/customer/address" className="user__block">
                  My Address
                </Link>
                <Link className="user__block" onClick={handleLogOut}>
                  Log Out
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="signup" onClick={handleShowSignUpModal}>
                <span className="auth__text">Sign Up</span>
              </div>
              <div className="login" onClick={handleShowLoginModal}>
                <span className="auth__text">Login</span>
              </div>
            </>
          )}
        </div>
      </header>
      <div className="bgwhite"></div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  cartData: makeSelectCartData(),
  showAddToCartAler: makeSelectShowAddToCartAler(),
  currentUser: makeSelectCurrentUser()
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Header);
