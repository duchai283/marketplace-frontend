import React from 'react';
import './styles.scss';
import Button from 'src/components/button';
import { hideCancelOrderModal } from '../../actions';
import { cancelOrder } from 'src/containers/Home/actions';
import { useParams } from 'react-router-dom';

const CancelOrderModal = ({ dispatch, orderId }) => {
  const handleCloseModal = () => {
    dispatch(hideCancelOrderModal());
  };

  return (
    <div>
      <div className="base" onClick={handleCloseModal}></div>
      <div className="emptycart">
        <div style={{ marginBottom: 20 }}>
          Are you sure you would like to cancel this order?
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            text={'NO'}
            style={{
              color: 'rgb(64, 72, 90)',
              background: 'rgb(228, 229, 233)'
            }}
            onClick={() => dispatch(hideCancelOrderModal())}
          />
          <Button
            text={'YES'}
            style={{
              color: 'rgb(64, 72, 90)',
              background: 'rgb(228, 229, 233)'
            }}
            onClick={() => {
              dispatch(cancelOrder({ id: orderId }));
              dispatch(hideCancelOrderModal());
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal;
