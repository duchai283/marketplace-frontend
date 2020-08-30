import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Router } from 'react-router-dom';
import Home from './containers/Home';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { store, persistor, history } from './configureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <Home />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
