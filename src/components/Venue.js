import React from 'react';

class Venue extends React.Component {
    onClick = () => {
        this.props.onVenueClick(this.props.venue.name);
    }

    render() {
        return(
            <li className="venue" onClick={this.onClick}>
                <h4>{this.props.venue.name}</h4>
            </li>
        );
    }
}

export default Venue;