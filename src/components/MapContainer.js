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
        let size = '200x150';
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
        console.log(this.props.google);


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
                                <img src={this.state.selectedVenue.img} alt={this.state.selectedVenue.name} />
                            ) : (
                                <img src='no-image.png' alt="No image" />
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
    apiKey: 'AIzaSyBppTSlqCQ3KaiqDeYRgdTZqv0Cw_z24lk'
})(MapContainer);
