import React from 'react';

const Spinner = (props) => (
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

export default Spinner;
