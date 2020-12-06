import React, { Component } from 'react';
import { withAuthorization } from '../AuthState';
import { withFirebase } from '../Firebase';
import firebase from 'firebase';
import { Link} from 'react-router-dom';
import DetailsPage from "../TripDetails"
import './Home.css';



class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: []
    }
  }

  //Retrieves data from database
 componentDidMount() {
    let db = firebase.firestore();

    let user = firebase.auth().currentUser;
    if (user) {
      db.collection('users')
      .doc(user.uid)
      .collection('trips')
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log( data);
        this.setState({ trips: data });
        
      })
      .catch(err => {
        console.log('err', err);
      });
    } else {
      console.log('error');
    }
  }

  render() {
   const {trips} = this.state;
    return (
     
  
      <div className="TripLibrary">
        <div className="TripLibraryHeaderContainer">
          <div className="TripLibraryHeader" />
        </div>
        <h2 >Your Trips</h2> 
        <div>
        {
          trips.map(trip => (
          <Link 
         to={`/details/:${trip.tripName}`} component={DetailsPage} id="trip" 
          >
            <div className="TripContainer" key={trip.id}>
                  <h1>{trip.tripName}</h1>
                  <p>{trip.dateRange}</p>
                  <img src={trip.photo} alt={trip.tripName}></img>
          </div>
          </Link>
        ))}
        <h3>Add More Trips!</h3>

        </div>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(withFirebase(HomePage));
