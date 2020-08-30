import React, { useState } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectCartData,
  makeSelectCurrentUser
} from 'src/containers/Home/selectors';
import AddToCartBtn from 'src/components/Product/AddToCartBtn';
import { formatMoney } from 'src/utils/helper';
import Button from 'src/components/button';
import { useHistory } from 'react-router-dom';
import TakeMyMoney from '../../components/CheckoutButton';
import { showError } from 'src/utils/notification';

const DeliveryAddress = ({ cartData, dispatch, currentUser }) => {
  const history = useHistory();

  const [Address, setAddress] = useState(
    currentUser.address.length !== 0 ? currentUser.address[0] : null
  );
  const [active, setActive] = useState(
    currentUser.address.length !== 0 ? currentUser.address[0].id : null
  );
  if (!cartData) {
    return <h3>Loading</h3>;
  }

  return (
    <div className="ld-checkout">
      <div className="ld-wrapper-order-summary">
        <div className="ld-left" style={{ width: '60%' }}>
          <div className="">
            <h1 className="ld-heading">
              <span>Delivery Address</span>
            </h1>

            <div className="cko-address-wrap">
              {currentUser &&
                currentUser.address.map((item, i) => (
                  <div
                    className={`cko-address ${item.id === active ? 'red' : ''}`}
                    style={{ position: 'relative' }}
                    onClick={() => {
                      setActive(item.id);
                      setAddress(item);
                    }}
                  >
                    <div className="cko-address-title">
                      <h3 style={{ color: '#fff' }}>{item.label}</h3>
                    </div>
                    <div className="ck-address-content">
                      <div>{item.fullname}</div>
                      <div>{item.address}</div>
                      <div>
                        {item.city}-{item.district}-{item.ward}
                      </div>
                      <div>{item.phone}</div>
                    </div>
                    {i === 0 && (
                      <span style={{ position: 'absolute', bottom: -20 }}>
                        * Default Delivery Address
                      </span>
                    )}
                  </div>
                ))}
            </div>
            <div style={{ width: '100%', textAlign: 'right' }}>
              <Button
                text="+ Add new address"
                style={{
                  width: '40%',
                  marginTop: '30px',
                  marginLeft: 'auto'
                }}
                onClick={() => {
                  history.push('/customer/address');
                }}
              ></Button>
            </div>
          </div>
        </div>

        <div
          className="ld-right"
          style={{ width: '300px', marginLeft: '30px' }}
        >
          <div className="ld-totals">
            <h1>Order Summary</h1>
            <div
              className="totals-infor box-totals"
              style={{
                display: 'flex',
                flexDirection: 'column',
                lineHeight: '35px'
              }}
            >
              <div style={{ display: 'flex', marginBottom: 30 }}>
                <input
                  type="text"
                  placeholder="Enter voucher code"
                  style={{
                    borderRadius: 4,
                    outline: 'none',
                    border: '1px solid rgb(221, 221, 221)',
                    paddingLeft: 15,
                    borderRight: 'none',
                    marginRight: -5
                  }}
                />
                <div
                  style={{
                    height: '35px',
                    width: '90px',
                    borderRadius: '0px 5px 5px 0px',
                    backgroundColor: 'rgb(131, 177, 81)',
                    color: '#fff',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                >
                  APPLY
                </div>
              </div>
              <div
                style={{
                  paddingTop: 20,
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #000'
                }}
              >
                <div className="totals-left">
                  <div style={{ fontSize: '20px', fontWeight: '600' }}>
                    Total
                  </div>
                </div>
                <div className="totals-right">
                  <div style={{ fontSize: '20px', fontWeight: '600' }}>
                    {formatMoney(cartData.totalAmount)}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 10
                }}
              >
                <div className="totals-left">
                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: 'bold',
                      color: '#eb5757'
                    }}
                  >
                    Total Savings
                  </div>
                </div>
                <div className="totals-right">
                  <div
                    style={{
                      fontSize: '12px',
                      backgroundColor: '#eb5757',
                      color: '#fff',
                      borderRadius: '5px',
                      paddingLeft: '3px',
                      paddingRight: '5px',
                      fontWeight: 'bold'
                    }}
                  >
                    {formatMoney(cartData.totalSaving)}
                  </div>
                </div>
              </div>
            </div>

            {active ? (
              <TakeMyMoney
                cart={cartData}
                address={Address}
                opened={() => {
                  console.log('opened');
                }}
              >
                <Button
                  text="Place Order"
                  style={{
                    width: '100%',
                    marginTop: '50px',
                    marginBottom: '50px'
                  }}
                  onClick={() => {
                    if (!Address) {
                      return showError(
                        'Please choose an address to place order!'
                      );
                    }
                  }}
                ></Button>
              </TakeMyMoney>
            ) : (
              <Button
                text="Place Order"
                style={{
                  width: '100%',
                  marginTop: '50px',
                  marginBottom: '50px'
                }}
                onClick={() => {
                  return showError('Please choose an address to place order!');
                }}
              ></Button>
            )}

            <div className="wrap-cart">
              <div className="miniCart">
                <div className="minicart__items cartHeight cartWidth">
                  {cartData.items &&
                    cartData.items.map(item => (
                      <div className="cart__item">
                        <div className="item_img_wrap">
                          <img src={item.product.image} alt="" />
                        </div>
                        <div className="title_wrap">{item.product.title}</div>
                        <div className="price_wrap">
                          {formatMoney(item.product.price)}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartData: makeSelectCartData(),
  currentUser: makeSelectCurrentUser()
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryAddress);
