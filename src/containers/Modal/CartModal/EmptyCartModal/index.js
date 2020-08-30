import React from 'react';
import './styles.scss';
import Button from 'src/components/button';
import { hideEmptyCart } from '../../actions';
import { emptyCart } from 'src/containers/Home/actions';

const EmptyCart = ({ dispatch }) => {
  const handleCloseModal = () => {
    dispatch(hideEmptyCart());
  };
  return (
    <div>
      <div className="base" onClick={handleCloseModal}></div>
      <div className="emptycart">
        <div style={{ marginBottom: 20 }}>
          Are you sure you would like to empty your cart?
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            text={'CANCEL'}
            style={{
              color: 'rgb(64, 72, 90)',
              background: 'rgb(228, 229, 233)'
            }}
            onClick={() => dispatch(hideEmptyCart())}
          />
          <Button
            text={'YES'}
            style={{
              color: 'rgb(64, 72, 90)',
              background: 'rgb(228, 229, 233)'
            }}
            onClick={() => {
              dispatch(emptyCart());
              dispatch(hideEmptyCart());
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
