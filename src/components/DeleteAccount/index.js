import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import './DeleteAccount.css';

import { withFirebase } from '../Firebase';

const DeleteAccountPage = () => (
  <div className="DeleteAccount">
    <div className="DeleteAccountHeaderContainer">
      <div className="DeleteAccountHeader" />
    </div>
    <h2>Delete Account</h2>
    <br />
    <div className="DeleteAccountButtonContainer">
      <div>
        <p>Are you sure you want to delete your account?</p>
        <DeleteAccountLogic />
      </div>
    </div>
  </div>
);

const INITIAL_STATE = {
  user: '',
  error: null,
};

class DeleteAccountLogic extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { user } = this.state;

    this.props.firebase
      .doDeleteUser(user)
      .then(() => {
        //user deleted
        console.log('account deleted');
        this.setState({ ...INITIAL_STATE });
        //If successful, send user to sign up screen
        this.props.history.push(ROUTES.SIGN_UP);
      })
      .catch(error => {
        //Error
        console.log('Something went wrong', error);
        this.setState({ error });
      });
    event.preventDefault();
  };

  render() {
    return (
      <form className="DeleteAccountButtons" onSubmit={this.onSubmit}>
        <div>
          <button id="yes" type="submit">
            Yes
          </button>
        </div>
        <div>
          <Link to={ROUTES.SETTINGS}>
            <button id="no">No</button>
          </Link>
        </div>
      </form>
    );
  }
}
export default withFirebase(DeleteAccountPage);

export { DeleteAccountLogic };
