import React from 'react';
import PropTypes from 'prop-types';

const Spinner = props => (
    props.spinner ? (
        <div className="loader">
            <img src="spinner.svg" alt="Spinner" />
        </div>
    ) : (
        <div className="google-loader">
            <img src="spinner.svg" alt="Spinner" />
        </div>
    )
);

Spinner.propTypes= {
    spinner: PropTypes.bool
}

export default Spinner;
