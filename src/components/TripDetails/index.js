import React, { Component } from 'react';
import { withAuthorization } from '../AuthState';
import { withFirebase } from '../Firebase';
import firebase from 'firebase';
import "./TripDetails.css";
import * as ROUTES from '../../constants/routes';
import {Link} from "react-router-dom"
import backButton from "../../assets/icons/return-arrow-curve-pointing-left.svg";

//Shows the user a more detailed look of their trip
class DetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: {}
    }
  }

  //Grabs a single document 
  componentDidMount() {
    let db = firebase.firestore();
    let user = firebase.auth().currentUser;
    //if user, show their trips
    if (user) {
      console.log(user, 'user');
      db.collection('users')
      .doc(user.uid)
      .collection(`trips`)
      .doc(user.uid) 
      //58UOgo9YsIb0LJl9zSRP
      //'TrqB9FtoREgyXnFxZBMC'
      .get()
      .then(doc => {
        const data = doc.data()
        this.setState({ trip: data });
      })
        .catch(err => {
          console.log('err', err);
        });
    } else {
      console.log('error');
    }

  }

  render() {
    
    const {trip} = this.state;

    return (
      
      <div className="TripDetails">
        <div className="TripDetailsHeaderContainer">
          <div className="TripDetailsHeader" />
        </div>
        <h2 >Trip Details</h2>
        <div className="TripDetailsDetails"> 
        <div className="TripDetailsButtons">
        <Link to={ROUTES.HOME}>
        <img src={backButton} alt="Back Button"/>
        </Link>
        <button><Link to={ROUTES.EDIT_TRIP}> Edit Trip </Link></button>
        </div>
        <div className="TripTitle "> 
          <h1>{trip.tripName}</h1>
          <p>{trip.dateRange}</p>
        </div>
        <div className="TripImg">
        <img src={trip.photo} alt={trip.tripName}>
        </img></div>
        <div className="TripPeopleLocationRating">
          <div className="TripPeople">
            <h1>People:</h1>
            <p>{trip.people}</p>
          </div>
          <div className="TripLocationRating">
            <div className="TripLocation">
              <h1>{trip.location}</h1>
            </div>
            <div className="TripRating">
            <p>{trip.rating}</p></div>
          </div>
        </div>
        <div className="TripDescription">
          <h1>Description:</h1>
          <p>{trip.description}</p>
        </div>
        <div className="TripAdditionalPhotos">
          <h1>Additional Photos:</h1> 
          
            <img src={trip.additionalPhotos} alt={trip.tripName}/>
            <img src={trip.additionalPhotos} alt={trip.tripName}/>
        
        </div>
        </div>
      </div>
    );
  }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(withFirebase(DetailsPage));
