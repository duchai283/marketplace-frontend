import React from 'react';
import { Route, Redirect, Switch, useRouteMatch } from 'react-router-dom';
import AccountInfo from '../components/AccountInfo';
import '../styles.scss';
import AccountOrders from '../components/AccountOrders';
import EditAddress from '../components/EditAddress';
import EditAccount from '../components/EditAccount';
import OrderDetails from '../components/OrderDetails';

const AccountRoutes = ({ handleActive, currentUser, dispatch }) => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route
        path={`${path}/account`}
        render={() => (
          <AccountInfo handleActive={handleActive} currentUser={currentUser} />
        )}
      ></Route>
      <Route path={`${path}/orders`} render={() => <AccountOrders />}></Route>
      <Route
        path={`${path}/order-details/:id`}
        render={() => <OrderDetails />}
      ></Route>
      <Route
        path={`${path}/address`}
        render={() => <EditAddress dispatch={dispatch} />}
      ></Route>

      <Redirect to="/customer/account" />
    </Switch>
  );
};
export default AccountRoutes;
