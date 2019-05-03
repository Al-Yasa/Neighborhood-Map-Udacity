import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import GoogleError from './components/GoogleError';

window.gm_authFailure = () => {
    ReactDOM.render(<GoogleError />, document.getElementById('root'));
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
