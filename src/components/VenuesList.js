import React from 'react';
import Venue from './Venue';

class VenuesList extends React.PureComponent {
    venueClick = (venueName) => {
        document.querySelector(`[title="${venueName}"]`).click();
    }

    render() {
        let filteredVenues = this.props.filteredVenues;
        return(
            <div className="venues">
                {filteredVenues.length !== 0 ? (
                    <p className="message">{filteredVenues.length} Result{filteredVenues.length == 1 ? '' : 's'}</p>
                ) : (
                    <p className="message">No Results</p>
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
