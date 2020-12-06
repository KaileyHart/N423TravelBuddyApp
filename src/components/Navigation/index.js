import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import './Navigation.css';

import { AuthUserContext } from '../AuthState';

import listIcon from '../../assets/icons/list.svg';
import plusIcon from '../../assets/icons/plus.svg';
import settingsIcon from '../../assets/icons/controls.svg';


const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

//Shows if user is authenticated
const NavigationAuth = () => (
  <div className="Navigation">
    <ul>
      <li id="list">
        <Link className="link" to={ROUTES.HOME}>
          <img src={listIcon} alt="" />
          <p>Your Trips</p>
        </Link>
      </li>
      <li id="plus">
        <Link className="link" to={ROUTES.ADD_TRIP}>
          <img src={plusIcon} alt="" />
          <p> Add Trip</p>
        </Link>
      </li>
      <li id="settings">
        <Link className="link" to={ROUTES.SETTINGS}>
          <img src={settingsIcon} alt="" />
          <p>Settings</p>
        </Link>
      </li>
    </ul>
  </div>
);

//Shows if user is NOT authenticated
const NavigationNonAuth = () => (


<div className="Nav">
<div className="SignInContainer">
  <div className="SignInHeader" />
</div>
  <div className="NavLinks"> 
<Link className="NavLink" to={ROUTES.SIGN_IN}> Login</Link>
<Link className="NavLink" to={ROUTES.SIGN_UP} >Sign Up</Link>
</div>
</div>
);

export default Navigation;
