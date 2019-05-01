import React from 'react';

class FilterOptions extends React.Component {
    filter = (e) => {
        this.props.onFilter(e.target.value.trim().toLowerCase());
    }

    render() {
        return(
            <div className="filter-options">
                <h2>Filter Results</h2>
                <div className="options">
                    <input id="filter" type="text" maxLength="25" placeholder="Venue Name" onChange={this.filter} />
                </div>
            </div>
        );
    }
}

export default FilterOptions;
