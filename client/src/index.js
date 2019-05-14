import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import './res/styles/index.scss';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {faTimesCircle, faPlus, faEllipsisH, faTrashAlt, faEdit, faSearch} from '@fortawesome/free-solid-svg-icons'
import client from './client';

library.add(fab, faTimesCircle, faPlus, faEllipsisH, faTrashAlt, faEdit, faSearch);

window.client = client;

client.setup().then(() => {
    ReactDOM.render(<Root />, document.getElementById('root'));
});

