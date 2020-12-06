import React, { Component } from 'react';
import { withAuthorization } from '../AuthState';
import { withFirebase } from '../Firebase';
import firebase from 'firebase';
import * as ROUTES from '../../constants/routes';
import './AddTrip.css';
import '../Home/index';

//Trip Variables
const INITIAL_TRIP_STATE = {
  tripName: '',
  location: '',
  dateRange: '',
  photo: '',
  additionalPhotos: '',
  description: '',
  people: '',
  rating: '',
  error: null,
};

class AddTripPage extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_TRIP_STATE };
  }

  //Add Trip
  onSubmit = event => {
    event.preventDefault();
    const {
      tripName,
      location,
      dateRange,
      photo,
      additionalPhotos,
      description,
      people,
      rating,
    } = this.state;

    var db = firebase.firestore();

    var user = firebase.auth().currentUser;


    const ref = firebase.storage().ref();
   
    // let featurePhoto = document.getElementById("featureImg").get(0).files[0];
    // let fileName = +new Date() + "-" + featurePhoto.name;
    // let metadata = {contentType: featurePhoto.type}

    //if user, add trip
    if (user) {
      console.log('here');
      console.log(user);
      db.collection('users')
        .doc(user.uid)
        .collection('trips')
        .add({
          tripName: tripName,
          location: location,
          dateRange: dateRange,
          photo: photo,
          additionalPhotos: additionalPhotos,
          description: description,
          people: people,
          rating: rating,
        })
        .then(docRef => {
          console.log('doc written with:', docRef.id);
          // let uploadFeaturePhoto = ref.child(fileName).put(featurePhoto, metadata)
          // uploadFeaturePhoto.then(() => {
          //   let image = ref.child(fileName);
          //   let urlPromise = image.getDownloadURL();
          //   urlPromise.then(url => {
          //     console.log(url)
          //   })
          // })
          this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
          console.log('error:', error);
        });
      //If no user, error
    } else {
      console.log('error');
    }
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      tripName,
      location,
      dateRange,
      photo,
      additionalPhotos,
      description,
      people,
      rating,
      error,
    } = this.state;

    //Will not work if input is empty
    const isInvalid =
      tripName === '' ||
      location === '' ||
      dateRange === '' ||
      photo === '' ||
      description === '' ||
      people === '' ||
      rating === '';

    return (
      <div className="AddTrip">
        <div className="TripLibraryHeaderContainer">
          <div className="TripLibraryHeader" />
        </div>
        <h2>Add A Trip</h2>
        <form className="AddTripInputs" onSubmit={this.onSubmit}>
          <input
            name="tripName"
            value={tripName}
            onChange={this.onChange}
            type="text"
            placeholder="Trip Name"
          />
          <input
            name="location"
            value={location}
            onChange={this.onChange}
            type="text"
            placeholder="Location"
          />
          <input
            name="dateRange"
            value={dateRange}
            onChange={this.onChange}
            type="date"
            placeholder="mm/dd/yy"
          />
          <input
            id="featureImg"
            name="photo"
            value={photo}
            onChange={this.onChange}
            type="file"
            placeholder="Add Feature Photo"
          />
          <input
            id="imgs"
            name="additionalPhotos"
            value={additionalPhotos}
            onChange={this.onChange}
            type="file"
            placeholder="Additional Photos"
            multiple
          />
          <input
            id="description"
            name="description"
            value={description}
            onChange={this.onChange}
            type="text"
            placeholder="Description"
          />
          <input
            name="people"
            value={people}
            onChange={this.onChange}
            type="text"
            placeholder="People"
          />
          <input
            name="rating"
            value={rating}
            onChange={this.onChange}
            type="Number"
            placeholder="Rating"
          />

          <div className="AddTripButton">
            <button type="submit" disabled={isInvalid}>
              Add Trip
            </button>
          </div>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(
  withFirebase(AddTripPage),
);
