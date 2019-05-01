import React from 'react';
import Venue from './Venue';

class VenuesList extends React.PureComponent {
    venueClick = (venueName) => {
        document.querySelector(`[title="${venueName}"]`).click();
    }

    render() {
        return(
            <div className="venues">
                {this.props.filteredVenues.length !== 0 ? (
                    <p>{this.props.filteredVenues.length} results</p>
                ) : (
                    <h4>No results</h4>
                )}
                <ul className="venues-list">
                    {this.props.filteredVenues
                        .map((venue) => (<Venue venue={venue} key={venue.id} onVenueClick={this.venueClick} />))
                    }
                </ul>
            </div>
        );
    }
}

export default VenuesList;
