import React from 'react';
import './styles.scss';
import ProductDetailsPage from 'src/containers/Product/layout/ProductDetailsPage';
import { hideProductDetails } from '../../actions';

const ProductDetailsModal = ({ dispatch, product }) => {
  const handleCloseModal = () => {
    dispatch(hideProductDetails());
  };

  console.log('product222', product);
  return (
    <div>
      <div className="base" onClick={handleCloseModal}></div>
      <div className={`details_modal`}>
        <ProductDetailsPage product={product} />
      </div>
    </div>
  );
};

export default ProductDetailsModal;
