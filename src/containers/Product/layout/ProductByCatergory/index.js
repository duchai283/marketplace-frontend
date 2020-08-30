import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './styles.scss';
import { useParams } from 'react-router-dom';
import './styles.scss';
import { makeSelectProductsByCategory } from 'src/containers/Home/selectors';
import { loadProductByCategory } from 'src/containers/Home/actions';
import ProductList from '../../components/ProductList';

const mapBannerCat = {
  '5f0493919a76000a03ce0cf1':
    'https://d5anwn521ljmo.cloudfront.net/mageplaza/bannerslider/banner/image/c/a/category_topbanner_healthandbeauty_986x200.jpg',
  '5f04939d9a76000a03ce0cf2':
    'https://d5anwn521ljmo.cloudfront.net/mageplaza/bannerslider/banner/image/c/a/category_topbanner_beerwine_spirits_986x200.jpg',
  '5f0493a69a76000a03ce0cf3':
    'https://d5anwn521ljmo.cloudfront.net/mageplaza/bannerslider/banner/image/c/a/category_topbanner_petcare_986x200_1_1.jpg',
  '5f0493b19a76000a03ce0cf4':
    'https://d5anwn521ljmo.cloudfront.net/mageplaza/bannerslider/banner/image/c/a/category_topbanner_fruits_vegetables_986x200.jpg',
  '5f0493bc9a76000a03ce0cf5':
    'https://d5anwn521ljmo.cloudfront.net/mageplaza/bannerslider/banner/image/c/a/category_topbanner_frozen_986x200.jpg'
};

const ProductByCatergory = ({ dispatch, productByCat }) => {
  const { id } = useParams();
  const refScroll = useRef(null);
  useEffect(() => {
    dispatch(loadProductByCategory({ id }));
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  if (productByCat.length === 0) {
    return <h1>LOADING</h1>;
  }

  const renderImg = () => {
    let url = '';
    for (let key in mapBannerCat) {
      if (key === productByCat.cat._id) {
        url = mapBannerCat[key];
      }
    }
    return url;
  };

  console.log('productByCat', productByCat);
  return (
    <div className="product_by_cat" ref={refScroll}>
      <div className="CatBannerComponent">
        <img src={renderImg()} className="imgbanner" />
      </div>
      <div className="product__block">
        <h1 className="heading">{productByCat.cat.category_name}</h1>
        <ProductList productData={productByCat.data} />
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  productByCat: makeSelectProductsByCategory()
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ProductByCatergory);
