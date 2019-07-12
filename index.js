const {setup, start} = require('@dreesq/serpent');
const express = require('express');

const app = express();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.on('uncaughtException', console.error);

setup(app).then(start);

