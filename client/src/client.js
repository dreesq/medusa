import Serpent from '@dreesq/serpent-client';
import {API_URL} from "./constants";
import axios from 'axios';

const client = new Serpent(API_URL, {
    axios
});

export default client;
