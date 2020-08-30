import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeSelectCartData } from 'src/containers/Home/selectors';
import { addProductToCart } from 'src/containers/Home/actions';
import './styles.scss';
import { showAddToCartAlert } from 'src/containers/Home/actions';
import { hideAddToCartAlert } from 'src/containers/Home/actions';
import { showError } from 'src/utils/notification';

const isProductInCart = (items, product) => {
  return items.findIndex(item => item.product._id === product._id);
};

const AddToCartBtn = ({ product, inCart }) => {
  const dispatch = useDispatch();
  const cartData = useSelector(makeSelectCartData());
  const [isTouched, setIsTouched] = useState(false);
  const items = _.get(cartData, 'items', []);
  const stock = _.get(product, 'stock');
  // console.log('product', product);
  const indexProduct = isProductInCart(items, product);
  const [qty, setQty] = useState(
    indexProduct !== -1 ? items[indexProduct].qty : 0
  );

  useEffect(() => {
    const index = isProductInCart(items, product);
    setQty(index !== -1 ? items[index].qty : 0);
  }, [cartData]);

  const handlePlus = () => {
    let newQty = Number(items[indexProduct].qty) + 1;
    if (newQty > stock) {
      showError('Max quantity allowed');
      newQty = stock;
      return dispatch(addProductToCart({ product, qty: newQty }));
    }

    dispatch(addProductToCart({ product, qty: newQty }));
    showAler();
  };

  const handleMinus = () => {
    dispatch(
      addProductToCart({ product, qty: Number(items[indexProduct].qty) - 1 })
    );

    showAler(true);
  };

  const handleChangeInput = ({ currentTarget }) => {
    if (Number(currentTarget.value) >= 0) {
      setIsTouched(true);
      return setQty(Number(currentTarget.value));
    }
  };

  const handelOnPressEnter = e => {
    if (e.key === 'Enter') {
      let value = Number(e.currentTarget.value);
      if (value > stock) {
        showError('Max quantity allowed');
        value = stock;
        return dispatch(addProductToCart({ product, qty: value }));
      }

      dispatch(addProductToCart({ product, qty: Number(value) }));
      setIsTouched(false);
      showAlerWithQty(value);
    }
  };

  const showAlerWithQty = value => {
    const oldQty = items[indexProduct].qty;
    if (value - oldQty >= 0) {
      showAler(false, Math.abs(value - oldQty));
    } else {
      showAler(true, Math.abs(value - oldQty));
    }
  };

  const onHandleBlur = e => {
    // let value = Number(e.currentTarget.value);
    // dispatch(addProductToCart({ product, qty: Number(value) }));
    // showAlerWithQty(value);
  };

  const showAler = (isDelete, qty) => {
    dispatch(showAddToCartAlert({ qty: qty ? qty : 1, isDelete }));
    setTimeout(() => {
      dispatch(hideAddToCartAlert());
    }, 1500);
  };

  const renderButton = () => {
    if (qty !== 0 || isTouched) {
      return (
        <div className={`btn btn__primary ${inCart ? 'incart' : ''}`}>
          <button className="btnAdd" onClick={handleMinus}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <input
            type="text"
            className="inputAddToCart"
            value={qty}
            onChange={handleChangeInput}
            onKeyDown={handelOnPressEnter}
            onBlur={onHandleBlur}
          />
          <button className="btnMinus" onClick={handlePlus}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      );
    }

    const handleAddToCart = () => {
      dispatch(addProductToCart({ product }));
      showAler();
    };

    return (
      <button
        className="btn btn__primary"
        onClick={handleAddToCart}
        style={{ width: '98%' }}
      >
        ADD TO CART
      </button>
    );
  };

  return renderButton();
};

export default AddToCartBtn;
