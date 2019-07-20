import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import './res/styles/index.scss';
import client from './client';

window.client = client;

client.setup().then(() => {
    ReactDOM.render(<Root />, document.getElementById('root'));
});