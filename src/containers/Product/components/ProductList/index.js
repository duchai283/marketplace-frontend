import React from 'react';
import './styles.scss';
import ProductItem from '../ProductItem';

const ProductList = ({ productData }) => {
  return (
    <div className="product__list">
      {productData &&
        productData.map(product => (
          <ProductItem key={product._id} product={product} />
        ))}
    </div>
  );
};

export default ProductList;
