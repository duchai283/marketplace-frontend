import React, { useState } from 'react';
import './styles.scss';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AccountForm from '../Form/AccountForm';
import ChangePasswordForm from '../Form/ChangePasswordForm';

const AccountInfo = ({ currentUser, handleActive }) => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const [isChangePass, setIsChangePass] = useState(
    search ? !!search.split('=')[1] : false
  );
  return (
    <div className="accountComponent">
      <h1 className="ld-account-page--title">My Account</h1>
      <div className="block-dashboard-info mt-3">
        <div className="block-title">Account Information</div>
        <div className="block-content">
          <div className="box-title">
            <strong>Contact Information</strong>
          </div>
          <div className="box-content">
            {currentUser && (
              <div>
                <div className="firstname">
                  <span className="label">First Name:</span>{' '}
                  {currentUser.firstname}
                </div>
                <div className="lastname">
                  <span className="label">Last Name:</span>{' '}
                  {currentUser.lastname}
                </div>

                <div className="email">
                  <span className="label">Email:</span> {currentUser.email}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <h1 className="ld-account-page--title">Edit Account Information</h1>
      <div className="account_edit_wrap">
        <AccountForm
          setIsChangePass={setIsChangePass}
          isChangePass={isChangePass}
          dispatch={dispatch}
        />
        {isChangePass && <ChangePasswordForm dispatch={dispatch} />}
      </div>
    </div>
  );
};

export default AccountInfo;
