import Serpent from '@dreesq/serpent-client';
import {API_URL} from "./constants";
import axios from 'axios';

const client = window.client = new Serpent(API_URL, {
    axios,
    handler: 'http://localhost:3004/api',
    actions: 'http://localhost:3004/api',
    debug: process.env.NODE_ENV !== 'production'
});

export default client;
