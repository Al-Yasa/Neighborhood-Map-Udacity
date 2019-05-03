import React from 'react';
import SearchOptions from './SearchOptions';
import FilterOptions from './FilterOptions';
import VenuesList from './VenuesList';
import PropTypes from 'prop-types';

class SideMenu extends React.Component {
    static propTypes = {
        onSearch: PropTypes.func.isRequired,
        onFilter: PropTypes.func.isRequired,
        filteredVenues: PropTypes.arrayOf(PropTypes.object).isRequired
    }

    search = searchQuery => {
        this.props.onSearch(searchQuery)
    }

    filter = filterQuery => {
        this.props.onFilter(filterQuery);
    }

    render() {
        return(
            <>
            <SearchOptions onSearch={this.search} />
            <FilterOptions onFilter={this.filter} />
            <VenuesList filteredVenues={this.props.filteredVenues} />
            </>
        );
    }
}

export default SideMenu;
