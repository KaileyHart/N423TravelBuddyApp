import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import './PasswordForget.css';
import '../SignIn/SignIn.css';

const PasswordForgetPage = () => (
  <div className="ForgetPassword">
    <div className="ForgetPasswordContainer">
      <div className="ForgetPasswordHeader" />
    </div>
    <h1 className="ForgetPasswordTitle">Password Reset</h1>
    <p>
      Enter your email address and a temporary password will be sent
      to you.
    </p>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <form className="ForgetPasswordInputs" onSubmit={this.onSubmit}>
        <input
          id="top"
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <div className="ForgetPasswordButton">
          <div>
            <button disabled={isInvalid} type="submit">
              Reset My Password
            </button>
          </div>
          <div>
            <Link to={ROUTES.SIGN_IN}>
              <button>Cancel</button>
            </Link>
          </div>
        </div>
        <div className="ForgetPasswordFooter" />

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p className="ForgetPasswordLink">
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
