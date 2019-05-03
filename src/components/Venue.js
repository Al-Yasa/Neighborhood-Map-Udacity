import React from 'react';
import PropTypes from 'prop-types';

const Venue = props => (
    <li className="venue">
        <button tabIndex={props.tabIndex} onClick={() => props.onVenueClick(props.venue.name)}>{props.venue.name}</button>
    </li>
);

Venue.propTypes= {
    venue: PropTypes.object.isRequired,
    onVenueClick: PropTypes.func.isRequired,
    tabIndex: PropTypes.number.isRequired
}

export default Venue;
