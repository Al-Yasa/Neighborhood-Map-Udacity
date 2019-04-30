import React from 'react';
import Venue from './Venue';

class VenuesList extends React.PureComponent {
    venueClick = (venueName) => {
        document.querySelector(`[title="${venueName}"]`).click();
    }

    render() {
        return(
            <ul>
                {this.props.filteredVenues
                    .map((venue) => (<Venue venue={venue} key={venue.id} onVenueClick={this.venueClick} />))
                }
            </ul>
        );
    }
}

export default VenuesList;
