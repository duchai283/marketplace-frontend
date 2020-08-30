import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectShowLoginModal,
  makeSelectShowSignUpModal,
  makeSelectShowForgotPassModal,
  makeSelectHasLoader,
  makeSelectShowProductDetails,
  makeSelectProduct,
  makeSelectShowEmptyCart,
  makeSelectShowCancelOrder,
  makeSelectOrderId
} from './selectors';
import './styles.scss';
import LoginModal from './AuthModal/LoginModal';
import SignUpModal from './AuthModal/SignUpModal';
import ForgotPassModal from './AuthModal/ForgotPassModal';
import LoaderIndicator from './LoaderIndicator';
import ProductDetailsModal from './ProductModal/ProductDetailsModal';
import EmptyCart from './CartModal/EmptyCartModal';
import CancelOrderModal from './Order/OrderCancel';

const Modal = ({
  dispatch,
  showLoginModal,
  showSignUpModal,
  showForgotPassModal,
  showProductDetails,
  product,
  hasLoader,
  showEmptyCart,
  showCancelOrder,
  orderId
}) => {
  return (
    <div className="modal__wrap">
      {showLoginModal ? (
        <LoginModal dispatch={dispatch} showLoginModal={showLoginModal} />
      ) : null}
      {showSignUpModal ? <SignUpModal dispatch={dispatch} /> : null}

      {showForgotPassModal ? <ForgotPassModal dispatch={dispatch} /> : null}

      {showProductDetails ? (
        <ProductDetailsModal dispatch={dispatch} product={product} />
      ) : null}
      {showEmptyCart ? <EmptyCart dispatch={dispatch} /> : null}

      {showCancelOrder ? (
        <CancelOrderModal dispatch={dispatch} orderId={orderId} />
      ) : null}

      {hasLoader ? <LoaderIndicator /> : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  showLoginModal: makeSelectShowLoginModal(),
  showSignUpModal: makeSelectShowSignUpModal(),
  showForgotPassModal: makeSelectShowForgotPassModal(),
  showProductDetails: makeSelectShowProductDetails(),
  product: makeSelectProduct(),
  hasLoader: makeSelectHasLoader(),
  showEmptyCart: makeSelectShowEmptyCart(),
  showCancelOrder: makeSelectShowCancelOrder(),
  orderId: makeSelectOrderId()
});
const mapDisPatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDisPatchToProps)(Modal);
