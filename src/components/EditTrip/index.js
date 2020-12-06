import React, { Component } from 'react';
import { withAuthorization } from '../AuthState';
import { withFirebase } from '../Firebase';
import './EditTrip.css';
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

class EditTripPage extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_TRIP_STATE };
  }

  //Edit Trip
  onSubmit = event => {
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

  

event.preventDefault();
};

  //Changes input from initial state to what the user inputted
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
      <div className="EditTrip">
        <div className="TripLibraryHeaderContainer">
          <div className="TripLibraryHeader" />
        </div>
        <h2>Edit A Trip</h2>
        <form className="EditTripInputs" onSubmit={this.onSubmit}>
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

          <div className="EditTripButton">
            <button type="submit" disabled={isInvalid}>
              Edit Trip
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
  withFirebase(EditTripPage),
);
