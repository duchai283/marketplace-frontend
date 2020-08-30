import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { showError } from 'src/utils/notification';
import { createOrder } from 'src/containers/Home/actions';

const TakeMyMoney = ({ cart, children, dispatch, address }) => {
  const onToken = res => {
    if (!address) {
      return showError('Place Order Failed, Please Select Address!');
    }
    const payload = {
      shipping: address,
      total: cart
    };
    dispatch(createOrder(payload));
  };

  return (
    <StripeCheckout
      amount={cart.totalAmount}
      name="Marketplace"
      description={`Order of buy product in marketplace`}
      stripeKey="pk_test_5Fg8sJE6B905fiaxpOPuWgak00pGY3hksw"
      token={res => onToken(res)}
      currency="VND"
    >
      {children}
    </StripeCheckout>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(null, mapDispatchToProps)(TakeMyMoney);
