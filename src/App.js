import React, { Component } from 'react';
import './App.css';
import * as Foursquare from './api/Foursquare';
import SideMenu from './components/SideMenu';
import MapContainer from './components/MapContainer';

class App extends Component {
  state = {
    venues: [],
    filterQuery: '',
    filteredVenues: [],
    boundPoints: [
      {lat: 35, lng: -25},
      {lat: 15, lng: 40}
    ]
  }

  search = (searchQuery) => {
    Foursquare.getVenues(searchQuery.area, searchQuery.venue, searchQuery.limit)
      .then(foursquareVenues => {
        let venues = [];
        let boundPoints = [];
        foursquareVenues.forEach(foursquareVenue => {
          venues.push({
            id: foursquareVenue.id,
            name: foursquareVenue.name,
            country: foursquareVenue.location.country,
            city: foursquareVenue.location.city,
            state: foursquareVenue.location.state,
            street: foursquareVenue.location.crossStreet,
            location: {
              lat: foursquareVenue.location.lat,
              lng: foursquareVenue.location.lng
            },
            img: ''
          });
          boundPoints.push({
            lat: foursquareVenue.location.lat,
            lng: foursquareVenue.location.lng
          });
        });
        this.setState({venues: venues, boundPoints: boundPoints});
        this.filter(this.state.filterQuery);
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  filter = (filterQuery) => {
    if (filterQuery) {
      this.setState((state, props) => ({
        filterQuery: filterQuery,
        filteredVenues: state.venues.filter(venue => venue.name.toLowerCase().includes(filterQuery))
      }));
    } else {
      this.setState((state, props) => ({
        filterQuery: '',
        filteredVenues: state.venues
      }));
    }
  }

  render() {
    return (
      <div className="app">
        <header>
          <h1>Neighborhood Map</h1>
        </header>
        <main>
          <aside>
            <SideMenu onSearch={this.search} onFilter={this.filter} filteredVenues={this.state.filteredVenues} />
          </aside>
          <section>
            <MapContainer filteredVenues={this.state.filteredVenues} boundPoints={this.state.boundPoints}  />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
