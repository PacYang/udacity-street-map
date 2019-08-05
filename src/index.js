import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Error from './Error';

window.googlemap_authFailure = () => {
    ReactDOM.render(<Error/>, document.getElementById('root'));
}
  
ReactDOM.render(<App/>, document.getElementById('root'));
serviceWorker.register();
