import React from 'react';
import SideBar from './layout/SideBar';
import Body from './layout/Body';
import './styles.scss';
import { Switch, Route } from 'react-router-dom';
import ResetPass from '../Auth/screens/ResetPass';
import ProductByCatergory from '../Product/layout/ProductByCatergory';
import CartPage from '../CheckOut/screens/CartPage';
import DeliveryAddress from '../CheckOut/screens/DeliveryAddress';
import ProductSearch from '../Product/layout/ProductSearch';
import ProductBySub from '../Product/layout/ProductBySub';
import TrackTrace from '../TrackTrace';

const Wrapper_Home = () => {
  return (
    <div className="bodyComponent">
      <div className="inner_body">
        <SideBar />
        <div className="body_wrap">
          <Switch>
            <Route
              path="/account/resetPassword/:token"
              exact
              component={ResetPass}
            />
            <Route exact path="/checkout/cart" component={CartPage} />
            <Route
              exact
              path="/checkout/delivery-address"
              component={DeliveryAddress}
            />
            <Route
              exact
              path="/track-and-trace/track/:id"
              component={TrackTrace}
            />
            <Route path="/products/:id" exact component={ProductByCatergory} />
            <Route path="/products-sub/:id" exact component={ProductBySub} />
            <Route path="/search/:title" exact component={ProductSearch} />
            <Route path="/" component={Body} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Wrapper_Home;
