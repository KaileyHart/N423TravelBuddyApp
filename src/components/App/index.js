import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AddTripPage from '../AddTrip/AddTrip';
import Navigation from '../Navigation';
import EditTripPage from '../EditTrip/index';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import SettingsPage from '../Settings';
import DetailsPage from '../TripDetails';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../AuthState';
import PasswordChangePage from '../PasswordChangePage';
import DeleteAccountPage from '../DeleteAccount';

//Main Page, Navigation
const App = () => (
  
  <Router>

    <div>
    <Navigation />
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      
      <Route exact path={`/details/:id`} component={DetailsPage}/>
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        exact
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route
        exact
        path={ROUTES.PASSWORD_CHANGE}
        component={PasswordChangePage}
      />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route exact path={ROUTES.ADD_TRIP} component={AddTripPage} />
      
      <Route exact path={ROUTES.EDIT_TRIP} component={EditTripPage} />
      <Route exact path={ROUTES.SETTINGS} component={SettingsPage} />
      <Route
        exact
        path={ROUTES.DELETE_ACCOUNT}
        component={DeleteAccountPage}
      />

      
    </div>
  </Router>
);

export default withAuthentication(App);
