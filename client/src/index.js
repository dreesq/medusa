import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import './res/styles/index.scss';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import client from './client';

library.add(fab);

client.ready(() => {
    ReactDOM.render(<Root />, document.getElementById('root'));
});

