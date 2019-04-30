import React from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import * as Foursquare from '../api/Foursquare';

class MapContainer extends React.Component {
    state = {
        selectedVenue: {},
        activeMarker: {},
        showingInfoWindow: false
    };

    centerMap = () => {
        let bounds = new this.props.google.maps.LatLngBounds();
        this.props.boundPoints.forEach((boundPoint) => {
            bounds.extend(boundPoint);
        });
        return bounds;
    }

    onMarkerClick = (props, marker) => {
        let selectedVenue = this.props.filteredVenues.filter((venue) => venue.name === props.title)
        let venuePhoto = '';
        let size = '150';
        Foursquare.getVenuePhoto(selectedVenue[0].id)
            .then((response) => {
                venuePhoto = `${response[0].prefix}${size}${response[0].suffix}`;
                selectedVenue[0].img = venuePhoto;
                this.setState({
                    selectedVenue: selectedVenue[0],
                    activeMarker: marker,
                    showingInfoWindow: true
                });
            })
            .catch((error) => {
                selectedVenue[0].img = '';
                this.setState({
                    selectedVenue: selectedVenue[0],
                    activeMarker: marker,
                    showingInfoWindow: true
                });
            });
    }

    onInfoWindowClose = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                selectedVenue: {},
                activeMarker: {},
                showingInfoWindow: false,
            })
        }
    };

    render() {
        return(
            <Map
                google={this.props.google}
                initialCenter={{lat: 25.39, lng: -2.52}}
                zoom={2}
                bounds={this.centerMap()}
                onClick={this.onInfoWindowClose}
            >
                {this.props.filteredVenues.map((venue, index) =>
                    <Marker
                        key={venue.id}
                        title={venue.name}
                        name={venue.name}
                        position={{lat: venue.location.lat, lng: venue.location.lng}}
                        onClick={this.onMarkerClick}
                    />
                )}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onInfoWindowClose}
                >
                        <div>
                            <h3>{this.state.selectedVenue.name}</h3>
                            <p>{this.state.selectedVenue.city}</p>
                            <p>{this.state.selectedVenue.street}</p>
                            {this.state.selectedVenue.img ? (
                                <img src={this.state.selectedVenue.img} alt={this.state.selectedVenue.name} />
                            ) : (
                                <p>No image</p>
                            )}
                            <span>Data from SquareSpace.</span>
                        </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBppTSlqCQ3KaiqDeYRgdTZqv0Cw_z24lk'
})(MapContainer);
