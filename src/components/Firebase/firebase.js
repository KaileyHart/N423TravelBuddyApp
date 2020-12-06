import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/firestore';

//Firebase Configuration
const config = {
  apiKey: 'AIzaSyDGwLzfJFs7SK2sU23hI63DYlf0pQGG_Mc',
  authDomain: 'tripjournal-293122.firebaseapp.com',
  databaseURL: 'https://tripjournal-293122.firebaseio.com',
  projectId: 'tripjournal-293122',
  storageBucket: 'tripjournal-293122.appspot.com',
  messagingSenderId: '317813178342',
  appId: '1:317813178342:web:ef417304df69fd15cd2027',
  measurementId: 'G-Q0P0NJNBHX',
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  //Create User
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  //Let's user sign in
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  //Let's user sign out
  doSignOut = () => this.auth.signOut();

  //Deletes User
  doDeleteUser = user => this.auth.delete(user);

  //Let's User reset their password through email
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  //Let's user reset password manually
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
  

  //Users
  users = () => this.db.collection('users');
  user = uid => this.db.collection(`users/${uid}`);

  //Trips


}

export default Firebase;
