import React from 'react'
import PropTypes from 'prop-types';

const FilterOptions = props => (
    <div className="filter-options" tabIndex="7" aria-label="Filter Results">
        <h2>Filter Results</h2>
        <div className="options">
            <input id="filter" type="text" tabIndex="8" aria-label="Filter Venues by Name" maxLength="25" placeholder="Venue Name" onChange={e => {
                props.onFilter(e.target.value.trim().toLowerCase());
            }} />
        </div>
    </div>
);

FilterOptions.propTypes= {
    onFilter: PropTypes.func.isRequired
}

export default FilterOptions;
