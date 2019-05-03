import React from 'react';
import Venue from './Venue';
import PropTypes from 'prop-types';

class VenuesList extends React.PureComponent {
    static propTypes = {
        filteredVenues: PropTypes.arrayOf(PropTypes.object).isRequired
    }

    venueClick = venueName => {
        document.querySelector(`[title="${venueName}"]`).click();
    }

    render() {
        let filteredVenues = this.props.filteredVenues;
        return(
            <div className="venues">
                {filteredVenues.length !== 0 ? (
                    <p className="message">{filteredVenues.length} Result{filteredVenues.length === 1 ? '' : 's'}</p>
                ) : (
                    <p className="message">No Results</p>
                )}
                <ul className="venues-list" tabIndex="9" aria-label="List of Venues">
                    {this.props.filteredVenues
                        .map((venue, index) => (<Venue venue={venue} key={venue.id} onVenueClick={this.venueClick} tabIndex={index + 10} />))
                    }
                </ul>
            </div>
        );
    }
}

export default VenuesList;
