import React, { Component } from 'react';

import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import './SignIn.css';

//Allows user to sign in
const SignInPage = () => (
  // <div className="SignIn">
  //   <div className="SignInContainer">
  //     <div className="SignInHeader" />
  //   </div>
 
  <div className="SignIn">
    <h1>Welcome Back</h1>
    <SignInForm />
    <PasswordForgetLink />
    <div className="SignInFooter" />
  </div>
);

//Sets state to empty until the user puts something in the input
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    //Signs user into firebase
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });

        //If successful, send user to home screen
        this.props.history.push(ROUTES.HOME);
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
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form className="SignInInputs" onSubmit={this.onSubmit}>
        <input
          id="top"
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <div className="SignInButton">
          <button disabled={isInvalid} type="submit">
            Sign In
          </button>
        </div>

        <p className="SignUpLink">
          Don't have an account?{' '}
          <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </p>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
