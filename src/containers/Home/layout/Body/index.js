import React, { useEffect } from 'react';
import Banner from '../Banner';
import './styles.scss';
import ProductList from 'src/containers/Product/components/ProductList';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectProducts } from '../../selectors';
import { loadProducts, loadCategory } from '../../actions';

const Body = ({ products, dispatch }) => {
  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadCategory());
  }, [dispatch]);

  const filterProduct = () => {
    const object = {};
    object.home = products.slice(0, 6);
    object.home2 = products.filter(item => item.final_price).slice(0, 6);
    object.home3 = products.slice(13, 19);
    object.home4 = products.slice(20, 26);
    object.home5 = products.slice(28, 34);
    return object;
  };
  let data = {};
  if (products.length !== 0) {
    data = filterProduct();
  }
  return (
    <div className="">
      <Banner></Banner>
      <div className="product__block">
        <h1 className="heading">Hot Offer</h1>
        <ProductList productData={data.home2} />
      </div>
      <div className="img__banner">
        <img src="images/TopBanner_Sameday_Delivery.jpg" alt="" />
      </div>
      <div className="product__block">
        <h1 className="heading">below 200đ</h1>
        <ProductList productData={data.home} />
      </div>
      <div className="product__block">
        <h1 className="heading">What's New?</h1>
        <ProductList productData={data.home3} />
      </div>
      <div className="product__block">
        <h1 className="heading">Appliance & Electronics</h1>
        <ProductList productData={data.home4} />
      </div>
      <div className="product__block">
        <h1 className="heading">PET CARE,DOG CARE</h1>
        <ProductList productData={data.home5} />
      </div>
      <div className="homCatComponent">
        <Link className="cat" to="/products/5f0493919a76000a03ce0cf1">
          <img
            src="https://d5anwn521ljmo.cloudfront.net/mageplaza/bannerslider/banner/image/c/a/categories_health_beauty_488x290_1.jpg"
            alt=""
          />
        </Link>
        <Link className="cat" to="/products/5f0493a69a76000a03ce0cf3">
          <img
            src="https://d5anwn521ljmo.cloudfront.net/mageplaza/bannerslider/banner/image/c/a/categories_petcare_488x290.jpg"
            alt=""
          />
        </Link>
        <Link className="cat" to="/products/5f0493b19a76000a03ce0cf4">
          <img
            src="https://d5anwn521ljmo.cloudfront.net/mageplaza/bannerslider/banner/image/c/a/categories_fruits_vegetables_488x290_1.jpg"
            alt=""
          />
        </Link>
        <Link className="cat" to="/products/5f0493bc9a76000a03ce0cf5">
          <img
            src="https://d5anwn521ljmo.cloudfront.net/mageplaza/bannerslider/banner/image/c/a/categories_frozen_488x290_1.jpg"
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  products: makeSelectProducts()
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Body);
