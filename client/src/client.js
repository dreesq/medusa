import Serpent from '@dreesq/serpent-client';
import {API_URL} from "./constants";
import axios from 'axios';

const client = window.client = new Serpent({
    axios,
    handler: API_URL,
    actions: API_URL,
    debug: process.env.NODE_ENV !== 'production'
});

export default client;
