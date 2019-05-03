import React, { Component } from 'react';
import './App.css';
import * as Foursquare from './api/Foursquare';
import SideMenu from './components/SideMenu';
import MapContainer from './components/MapContainer';
import Spinner from './components/Spinner';

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

  toggleLoader = num => {
    const LOADER = document.querySelector('section > .loader');
    LOADER.style.display = num === 1 ? 'flex' : 'none';
  }

  search = searchQuery => {
    this.toggleLoader(1);
    Foursquare.getVenues(searchQuery.area, searchQuery.venue, searchQuery.limit)
      .then(foursquareVenues => {
        if (!foursquareVenues.length) { // receiving and empty array should also be considered an error
          alert('No Results');
          this.toggleLoader(0);
          return;
        } else {
          let venues = [];
          let boundPoints = [];
          foursquareVenues.forEach(foursquareVenue => {
            venues.push({
              id: foursquareVenue.id,
              name: foursquareVenue.name,
              country: foursquareVenue.location.country,
              city: foursquareVenue.location.city,
              state: foursquareVenue.location.state,
              street: foursquareVenue.location.address,
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
          this.setState({venues, boundPoints});
          this.filter(this.state.filterQuery);
          this.toggleLoader(0);
        }
      })
      .catch(() => {
        alert('No Results');
        this.toggleLoader(0);
      });
  }

  filter = filterQuery => {
    if (filterQuery) {
      this.setState(state => ({
        filterQuery: filterQuery,
        filteredVenues: state.venues.filter(venue => venue.name.toLowerCase().includes(filterQuery))
      }));
    } else {
      this.setState(state => ({
        filterQuery: '',
        filteredVenues: state.venues
      }));
    }
  }

  render() {
    return (
      <div className="app">
        <header>
          <h1 tabIndex="1" aria-label="Neighborhood Map">Neighborhood Map</h1>
        </header>
        <main>
          <aside>
            <SideMenu onSearch={this.search} onFilter={this.filter} filteredVenues={this.state.filteredVenues} />
          </aside>
          <section>
            <Spinner spinner={true} />
            <MapContainer filteredVenues={this.state.filteredVenues} boundPoints={this.state.boundPoints} />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
