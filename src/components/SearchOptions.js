import React from 'react';

class SearchOptions extends React.Component {
    constructor(props) {
        super(props);
        // create a refs to store textInput DOM elements
        this.areaInput = React.createRef();
        this.venueInput = React.createRef();
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
            <div className="search-options">
                <h2>Search Results</h2>
                <div className="options">
                    <label htmlFor="area" >Area</label>
                    <input ref={this.areaInput} id="area" type="text" name="area" maxLength="25" placeholder="Dubai, New York, Frankfurt" onChange={this.handleChange} defaultValue="Dubai" />
                    <label htmlFor="venue" >Venue</label>
                    <input ref={this.venueInput} id="venue" type="text" name="venue" maxLength="25" placeholder="School, Restaurant, Coffee" onChange={this.handleChange}  defaultValue="School" />
                    <label htmlFor="limit" >Limit</label>
                    <select name="limit" defaultValue="5" onChange={this.handleChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <button onClick={this.search}>Search</button>
            </div>
        );
    }
}

export default SearchOptions;
