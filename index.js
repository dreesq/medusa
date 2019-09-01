const {setup, start} = require('@dreesq/serpent');
const express = require('express');
const path = require('path');

const app = express();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.on('uncaughtException', console.error);

const serve = () => {
    app.use(express.static('./client/build'));

    app.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname, './client/build/index.html'));
    });
};

(async () => {
    await setup(app, {
        actions: {
            list: '/api',
            handler: '/api'
        }
    });

    process.env.NODE_ENV === 'production' && serve();
    await start();
})();

