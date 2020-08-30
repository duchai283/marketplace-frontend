import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import { useParams } from 'react-router-dom';
import './styles.scss';
import ProductList from '../../components/ProductList';
import * as modalActions from 'src/containers/Modal/actions';
import { config } from 'src/global-config';
import _ from 'lodash';
const ProductSearch = ({ dispatch }) => {
  const [data, setData] = useState(null);
  const { title } = useParams();

  useEffect(() => {
    const fetchProductSearch = async () => {
      dispatch(modalActions.showGlobalLoading());
      try {
        const res = await fetch(
          `${config.apiUrl}/products/search?title=${title}`
        );
        const data = await res.json();
        setData(data.data);
        setTimeout(() => {
          dispatch(modalActions.hideGlobalLoading());
        }, 1000);
      } catch (error) {
        dispatch(modalActions.hideGlobalLoading());
        console.log('err', error);
      }
    };

    fetchProductSearch();
  }, [title]);

  if (_.isEmpty(data)) {
    return (
      <div
        className="ld-checkout"
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <h1>Couldn't found any items with your search</h1>;
      </div>
    );
  }
  return (
    <div className="product_by_cat">
      <div className="CatBannerComponent"></div>
      <div className="product__block">
        <h1 className="heading">Search Product</h1>
        {data && <ProductList productData={data} />}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(null, mapDispatchToProps)(ProductSearch);
