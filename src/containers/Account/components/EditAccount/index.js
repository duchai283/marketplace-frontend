import React, { useState } from 'react';
import './styles.scss';
import AccountForm from '../Form/AccountForm';
import ChangePasswordForm from '../Form/ChangePasswordForm';
import { useLocation } from 'react-router-dom';

const EditAccount = ({ dispatch }) => {
  const { search } = useLocation();

  const [isChangePass, setIsChangePass] = useState(
    search ? !!search.split('=')[1] : false
  );

  return (
    <div className="accountComponent">
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

export default EditAccount;
