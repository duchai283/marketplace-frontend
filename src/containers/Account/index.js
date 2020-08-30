import React, { useState, useEffect } from 'react';
import './styles.scss';
import AccountRoutes from './routes';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'src/containers/Home/selectors';
import { connect } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { getUserInfo } from '../Home/actions';

const LeftMenu = [
  {
    key: '1',
    title: 'My Account',
    path: '/customer/account'
  },
  {
    key: '2',
    title: 'My orders',
    path: '/customer/orders'
  },
  {
    line: 'line'
  },
  {
    key: '3',
    title: 'Address Infomation',
    path: '/customer/address'
  }
];

const Account = ({ currentUser, dispatch }) => {
  const [active, setActive] = useState(null);
  let location = useLocation();
  let history = useHistory();

  useEffect(() => {
    LeftMenu.forEach(menu => {
      if (menu.path === location.pathname) {
        return setActive(menu.key);
      }
      if (location.pathname === '/customer') {
        return setActive('1');
      }
    });
  }, [location.pathname]);

  useEffect(() => {
    if (!currentUser) {
      history.push('/');
    }
  }, [currentUser, history]);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  const handleActive = state => {
    if (state) setActive(state);
  };
  return (
    <div className="innerbody">
      <div className="bodyLeftAccountComponent">
        <div className="accountMenuComponent">
          <ul className="nav">
            {LeftMenu.map(menu => (
              <li
                className={`nav-item ${active === menu.key ? 'active' : ''} ${
                  menu.line ? ' line' : ''
                }`}
                key={menu.key}
                onClick={() => {
                  if (menu.key) {
                    setActive(menu.key);
                  }
                }}
              >
                <Link to={menu.path}>{menu.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bodyMiddleAccountComponent">
        <AccountRoutes
          handleActive={handleActive}
          currentUser={currentUser}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser()
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Account);
