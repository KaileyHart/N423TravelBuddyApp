import React from 'react';

import { AuthUserContext } from '../AuthState';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { withAuthorization } from '../AuthState';
import LogOutButton from '../LogOut/index';
import './Settings.css';
//Settings Page that let's user change their password, logout, or delete their account
const SettingsPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div className="Settings">
        <div className="SettingsHeaderContainer">
          <div className="SettingsHeader" />
        </div>

        <h2>Settings</h2>

        <h3>Hello {authUser.email}!</h3>
        <div className="SettingsButtons">
          <LogOutButton />
          <Link className="link" to={ROUTES.PASSWORD_CHANGE}>
            <button>Change Password</button>
          </Link>
         
          <Link className="link" to={ROUTES.DELETE_ACCOUNT}>
            <button id="delete">Delete Account</button>
          </Link>
        </div>
      </div>
    )}
  </AuthUserContext.Consumer>
);

/* LIST VIEW CODE
 <div id="changeView">
            <p>Change View</p>
            <div className="SettingsButtons__Views">
              <button>5</button>
              <button>10</button>
              <button>20</button>
              <button>all</button>
            </div>
          </div> */

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(SettingsPage);
