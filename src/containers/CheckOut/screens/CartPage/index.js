import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import {
  makeSelectCartData,
  makeSelectCurrentUser
} from 'src/containers/Home/selectors';
import AddToCartBtn from 'src/components/Product/AddToCartBtn';
import { formatMoney } from 'src/utils/helper';

import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import TotalSummary from '../../components/TotalSummary';

const CartPage = ({ cartData, dispatch, currentUser }) => {
  const history = useHistory();
  if (_.isEmpty(cartData)) {
    return (
      <div
        className="ld-checkout"
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <h1>There is no items in your cart</h1>;
      </div>
    );
  }

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
        {formatMoney(item.product.price)}
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

  return (
    <div className="ld-checkout">
      {cartData.items.length !== 0 ? (
        <div className="ld-wrapper-order-summary">
          <div className="ld-left">
            <div className="">
              <h1 className="ld-heading">
                <span>Cart</span> {cartData.items.length} items
              </h1>
            </div>

            <div className="wrap-cart">
              <div className="miniCart">
                <div className="minicart__items cartHeight">
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
              </div>
            </div>
          </div>

          <div
            className="ld-right"
            style={{ width: '300px', marginLeft: '30px' }}
          >
            <TotalSummary cartData={cartData} />
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            marginTop: '25%',
            textAlign: 'center',
            flexDirection: 'column'
          }}
        >
          <div>You have no items in your shopping cart.</div>
          <br />
          <div>
            Click{' '}
            <Link to="/" style={{ color: 'blue' }}>
              here
            </Link>{' '}
            to continue shopping.
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartData: makeSelectCartData(),
  currentUser: makeSelectCurrentUser()
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
