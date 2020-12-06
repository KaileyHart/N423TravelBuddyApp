import React from 'react';

import { withAuthorization } from '../AuthState';
import PasswordChangeForm from '../PasswordChange/index';

import './PasswordChangePage.css';

const PasswordChangePage = () => (
  <div className="ChangePassword">
    <div className="ChangePasswordHeaderContainer">
      <div className="ChangePasswordHeader" />
    </div>
    <h2>ChangePassword</h2>
    <PasswordChangeForm />
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(PasswordChangePage);
