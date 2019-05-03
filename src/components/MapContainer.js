import React from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import * as Foursquare from '../api/Foursquare';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

class MapContainer extends React.Component {
    static propTypes = {
        filteredVenues: PropTypes.arrayOf(PropTypes.object).isRequired,
        boundPoints: PropTypes.arrayOf(PropTypes.shape({
            lat: PropTypes.number.isRequired,
            lng: PropTypes.number.isRequired
        })).isRequired,
    }

    componentDidMount() {
        // if you want to see the error screen that appears if google fails to load the map uncomment the line below
        // window.gm_authFailure();
        // the line of code above has nothing to do with the app, it is just to show the error screen
    }

    state = {
        selectedVenue: {},
        activeMarker: {},
        showingInfoWindow: false
    };

    centerMap = () => {
        let bounds = new this.props.google.maps.LatLngBounds();
        this.props.boundPoints.forEach(boundPoint => {
            bounds.extend(boundPoint);
        });
        return bounds;
    }

    onMarkerClick = (props, marker) => {
        let selectedVenue = this.props.filteredVenues.filter(venue => venue.name === props.title)
        let venuePhoto = '';
        let size = '150';
        Foursquare.getVenuePhoto(selectedVenue[0].id)
            .then(response => { // look for an image for the selected venue
                venuePhoto = `${response[0].prefix}${size}${response[0].suffix}`;
                selectedVenue[0].img = venuePhoto;
                this.setState({
                    selectedVenue: selectedVenue[0],
                    activeMarker: marker,
                    showingInfoWindow: true
                });
            })
            .catch(() => { // if no image is found then leave it empty
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
                role="application"
                aria-label="map"
                google={this.props.google}
                initialCenter={{lat: 25.39, lng: -2.52}}
                zoom={2}
                bounds={this.centerMap()}
                onClick={this.onInfoWindowClose}
            >
                {this.props.filteredVenues.map(venue =>
                    <Marker
                        key={venue.id}
                        title={venue.name}
                        name={venue.name}
                        position={{lat: venue.location.lat, lng: venue.location.lng}}
                        onClick={this.onMarkerClick}
                        animation={this.state.activeMarker.name === venue.name && this.props.google.maps.Animation.BOUNCE}
                        icon={{
                            url : "marker-icon.png",
                            scaledSize: new this.props.google.maps.Size(50,50)
                        }}
                    />
                )}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onInfoWindowClose}
                >
                        <div className="infoWindow-content">
                            <h3>{this.state.selectedVenue.name}</h3>
                            {this.state.selectedVenue.img ? (
                                <img src={this.state.selectedVenue.img} alt={'Image of ' + this.state.selectedVenue.name} />
                            ) : ( // if venue has no image then give it a 'missing image' image
                                <img src='no-image.png' alt="No images Found" />
                            )}
                            <div className="infoWindow-text">
                                <p><span>Country: </span>{this.state.selectedVenue.country}</p>
                                <p><span>City: </span>{this.state.selectedVenue.city}</p>
                                <p><span>State: </span>{this.state.selectedVenue.state}</p>
                                <p><span>Street: </span>{this.state.selectedVenue.street}</p>
                            </div>
                            <span>Data from Foursquare.</span>
                        </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBppTSlqCQ3KaiqDeYRgdTZqv0Cw_z24lk',
    LoadingContainer: Spinner
})(MapContainer);
