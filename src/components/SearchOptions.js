import React from 'react';

class SearchOptions extends React.Component {
    state = {
        area: 'Dubai',
        venue: 'Food',
        limit: 5
    };

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    search = () => {
        this.props.onSearch(this.state);
    }

    render() {
        return(
            <div className="search-options">
                <h2>Search Results</h2>
                <div className="options">
                    <label htmlFor="area" >Area</label>
                    <input id="area" type="text" name="area" minLength="2" maxLength="25" placeholder="Dubai, New York, Frankfurt" onChange={this.handleChange} defaultValue="Dubai" />
                    <label htmlFor="venue" >Venue</label>
                    <input id="venue" type="text" name="venue" minLength="2" maxLength="25" placeholder="Food, Coffee, Restaurant, School" onChange={this.handleChange}  defaultValue="Food" />
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
