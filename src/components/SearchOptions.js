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
            <div onSubmit={this.search} >
                <h2>Search Results</h2>
                <div className="options">
                    <input type="text" name="area" minLength="2" maxLength="25" size="25" placeholder="Dubai, New York, Frankfurt" onChange={this.handleChange} defaultValue="Dubai" />
                    <input type="text" name="venue" minLength="2" maxLength="25" size="25" placeholder="Food, Coffee, Restaurant, School" onChange={this.handleChange}  defaultValue="Food" />
                    <select name="limit" defaultValue="5" onChange={this.handleChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                    <button onClick={this.search}>Search</button>
                </div>
            </div>
        );
    }
}

export default SearchOptions;
