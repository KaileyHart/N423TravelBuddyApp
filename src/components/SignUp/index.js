import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from 'firebase';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import './SignUp.css';

//Let's the user sign up 
const SignUpPage = () => (
  // <div className="SignUp">
  //   <div className="SignUpContainer">
  //     <div className="SignUpHeader" />
  //   </div>
  <div className="SignUp">
    <h1 className="SignUpTitle">Welcome</h1>
    <SignUpForm />
    <p className="SignUpLink">
      Already have an account? <Link to={ROUTES.SIGN_IN}>Log In</Link>
    </p>
    <div className="SignUpFooter" />
  </div>
);

//User Variables
const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  user = uid => this.db.collection(`users/${uid}`);

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    var db = firebase.firestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, passwordOne)
      .then(user => {
        //Firebase function to add a user
        db.collection('users')
          .add({
            username,
            email,
          })
          .then(docRef => {
            console.log('doc written:', docRef.id);
            //If successful, send user to home screen
            this.props.history.push(ROUTES.HOME);
          })
          .catch(error => {
            console.log('error', error);
          });
      })
      .catch(error => {
        console.log('error', error);
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit} className="SignUpInputs">
        <input
          id="topInput"
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="email@email.com"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Create Password"
        />
        <input
          id="bottomInput"
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <div className="SignUpButton">
          <button disabled={isInvalid} type="submit">
            Sign Up
          </button>
        </div>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm };
