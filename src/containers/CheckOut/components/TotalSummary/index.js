import React from 'react';
import Button from 'src/components/button';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { formatMoney } from 'src/utils/helper';
import { getCurrentUser } from 'src/utils/validate';
import { showLoginModal } from 'src/containers/Modal/actions';
import { showSignUpModal } from 'src/containers/Modal/actions';
import { getAccessToken } from 'src/utils/validate';

const TotalSummary = ({ cartData }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
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
            <div style={{ fontSize: '20px', fontWeight: '600' }}>Total</div>
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

      <Button
        text="Check Out"
        style={{ width: '100%', marginTop: '50px' }}
        onClick={() => {
          if (getAccessToken()) {
            history.push('/checkout/delivery-address');
          } else {
            dispatch(showSignUpModal());
          }
        }}
      ></Button>
    </div>
  );
};

export default TotalSummary;
