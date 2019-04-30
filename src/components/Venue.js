import React from 'react';

class Venue extends React.Component {
    onClick = () => {
        this.props.onVenueClick(this.props.venue.name);
    }

    render() {
        return(
            <li onClick={this.onClick}>
                <h4>{this.props.venue.name}</h4>
                <p>{this.props.venue.street}</p>
            </li>
        );
    }
}

export default Venue;
