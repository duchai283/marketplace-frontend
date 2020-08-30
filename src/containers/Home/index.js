import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from './layout/Header';
import Footer from './layout/Footer';
import Modal from '../Modal';
import Account from '../Account';
import Wrapper_Home from './wrapper_home';
import { ToastContainer } from 'react-toastify';
import { Switch, Route } from 'react-router-dom';
import { setNavigator } from 'src/utils/navigation';
import { loadCartData } from './actions';
import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';

const Home = () => {
  const dispatch = useDispatch();
  setNavigator(dispatch);

  useEffect(() => {
    dispatch(loadCartData());
  }, []);

  return (
    <div className="container">
      <ToastContainer />
      <Modal />
      <div className="header__wrapper">
        <Header></Header>
      </div>
      <Switch>
        <Route path="/customer" component={Account} />
        <Route path="/" component={Wrapper_Home} />
      </Switch>
      <div className="footer__wrapper">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
