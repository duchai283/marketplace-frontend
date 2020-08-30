import React from 'react';
import './styles.scss';
import AddToCartBtn from 'src/components/Product/AddToCartBtn';
import { connect } from 'react-redux';
import { formatMoney } from 'src/utils/helper';
import { showProductDetails } from 'src/containers/Modal/actions';

const ProductItem = ({ product, dispatch }) => {
  const handleOpenModal = () => {
    dispatch(showProductDetails(product));
  };
  const renderPrice = product => {
    if (product.final_price !== 0) {
      return (
        <div className="priceComponent">
          <div className="final__price">{formatMoney(product.final_price)}</div>
          <div className="price_wrap">
            <strike className="old_price">{formatMoney(product.price)}</strike>
            <span className="percentNumber">
              -
              {Math.ceil(
                ((product.price - product.final_price) * 100) / product.price
              )}
              %
            </span>
          </div>
        </div>
      );
    }
    return <div className="nomarl_price">{formatMoney(product.price)}</div>;
  };
  return (
    <div className="product__item">
      <div className="item">
        <div className="wrap" onClick={handleOpenModal}>
          <div className="imgwrap">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="productTitle">
            <span>{product.title}</span>
          </div>
        </div>
        <div>
          {renderPrice(product)}
          <AddToCartBtn product={product} />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(null, mapDispatchToProps)(ProductItem);
