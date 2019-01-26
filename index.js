const {setup, start} = require('@dreesq/serpent');
const express = require('express');

const app = express();

process.on('uncaughtException', console.error);

setup(app).then(start);

