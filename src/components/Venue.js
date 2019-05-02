import React from 'react';

const Venue = (props) => (
    <li className="venue" onClick={e => props.onVenueClick(props.venue.name)}>
        <h4>{props.venue.name}</h4>
    </li>
);

export default Venue;
