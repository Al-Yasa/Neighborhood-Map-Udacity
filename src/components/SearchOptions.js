import React from 'react';
import PropTypes from 'prop-types';

class SearchOptions extends React.Component {
    constructor(props) {
        super(props);
        // create a refs to store textInput DOM elements
        this.areaInput = React.createRef();
        this.venueInput = React.createRef();
    }

    static propTypes = {
        onSearch: PropTypes.func.isRequired
    }

    state = {
        area: 'Dubai',
        venue: 'School',
        limit: 5
    };

    handleChange = ({target}) => {
        this.setState({ [target.name]: target.value });
    };

    search = () => {
        const AREA_EMPTY = !this.state.area;
        const AREA_INVALID = (this.state.area.length === 1) || (this.state.area[1] === ' ');
        const VENUE_EMPTY = !this.state.venue;
        const VENUE_INVALID = (this.state.venue.length === 1) || (this.state.venue[1] === ' ');
        const SEARCH_INVALID = AREA_EMPTY || AREA_INVALID || VENUE_EMPTY || VENUE_INVALID;
        if (SEARCH_INVALID) {
            if (AREA_EMPTY || AREA_INVALID) {
                this.areaInput.current.className = "invalid-field";
                setTimeout(() => {
                    this.areaInput.current.className = "";
                }, 1500);
            }
            if (VENUE_EMPTY || VENUE_INVALID) {
                this.venueInput.current.className = "invalid-field";
                setTimeout(() => {
                    this.venueInput.current.className = "";
                }, 1500);
            }
        } else {
            this.props.onSearch(this.state);
        }
    }

    render() {
        return(
            <div className="search-options" tabIndex="2" aria-label="Search Options">
                <h2>Search Results</h2>
                <div className="options">
                    <label htmlFor="area" >Area</label>
                    <input ref={this.areaInput} id="area" type="text" tabIndex="3" aria-label="Search Country, City or Area" name="area" maxLength="25" placeholder="Dubai, New York, Frankfurt" onChange={this.handleChange} defaultValue="Dubai" />
                    <label htmlFor="venue" >Venue</label>
                    <input ref={this.venueInput} id="venue" type="text"tabIndex="4" aria-label="Search Venue Name" name="venue" maxLength="25" placeholder="School, Restaurant, Coffee" onChange={this.handleChange}  defaultValue="School" />
                    <label htmlFor="limit" >Limit</label>
                    <select id="limit" tabIndex="5" role="tablist" aria-label="Limit Search" name="limit" defaultValue="5" onChange={this.handleChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <button tabIndex="6" aria-label="Search" onClick={this.search}>Search</button>
            </div>
        );
    }
}

export default SearchOptions;
