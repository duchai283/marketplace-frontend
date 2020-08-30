import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { formatMoney } from 'src/utils/helper';
import AddToCartBtn from 'src/components/Product/AddToCartBtn';

const ProductDetailsPage = ({ product }) => {
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
    <div>
      <div className="prod_main_wrap">
        <div className="prod_left">
          <div className="prod_left__img-wrap">
            <img src={product.image} alt="" />
          </div>
        </div>
        <div className="prod_right">
          <div className="prod_right__title">{product.title}</div>
          <div className="prod_right__price">{renderPrice(product)}</div>
          <AddToCartBtn product={product} />
        </div>
      </div>
      <div className="prod__description">{product.desc}</div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsPage);
