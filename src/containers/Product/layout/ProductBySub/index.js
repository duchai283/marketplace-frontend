import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../../components/ProductList';
import { config } from 'src/global-config';
import { useDispatch } from 'react-redux';
import { showGlobalLoading } from 'src/containers/Modal/actions';
import { hideGlobalLoading } from 'src/containers/Modal/actions';

const ProductBySub = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchProducts = async () => {
        dispatch(showGlobalLoading());
        try {
          const res = await fetch(
            `${config.apiUrl}/products/products-by-sub?id=${id}`
          );
          const data = await res.json();
          setProducts(data);
          setTimeout(() => {
            dispatch(hideGlobalLoading());
          }, 500);
        } catch (err) {
          setTimeout(() => {
            dispatch(hideGlobalLoading());
          }, 500);
        }
      };
      fetchProducts();
    }
  }, [id]);
  console.log(products);
  return (
    <div className="product_by_cat">
      <div className="product__block">
        {products.count !== 0 && <ProductList productData={products.data} />}
        {products.count === 0 && (
          <h3>There are no product in this category now!</h3>
        )}
      </div>
    </div>
  );
};

export default ProductBySub;
