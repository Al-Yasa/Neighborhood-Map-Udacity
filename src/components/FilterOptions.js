import React from 'react';

class FilterOptions extends React.Component {
    filter = (e) => {
        this.props.onFilter(e.target.value.trim().toLowerCase());
    }

    render() {
        return(
            <div>
                <h2>Filter Results</h2>
                <div>
                    <input type="text" minLength="2" maxLength="25" size="25" placeholder="Venue Name" onChange={this.filter} />
                </div>
            </div>
        );
    }
}

export default FilterOptions;
