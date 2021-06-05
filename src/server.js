const express = require('express');
const path = require('path');

// ignore request for FavIcon. so there is no error in browser
const ignoreFavicon = (req, res, next) => {
    if (req.originalUrl.includes('favicon.ico')) {
        res.status(204).end();
    }
    next();
};

// fn to create express server
const create = async () => {

    // server
    const app = express();
    app.use(express.static(path.join(__dirname,'..','public')));
    app.set('views', path.join(__dirname,'..','views'));
    app.set('view engine', 'ejs');
    var routs = require('./routs.js');

    // configure nonFeature
    app.use(ignoreFavicon);

    app.use('/', routs);

    // app.get('/', (req, res) => {
    //     res.sendFile(path.join(__dirname, '../views/client.html'));
    // });
    // app.get('/moon', (req, res) => {
    //     res.sendFile(path.join(__dirname, '../views/moon.html'));
    // });
    // app.get('/login/:usr', (req, res) => {
    //     res.render(path.join(__dirname, '../views/login.ejs'),{usr:'paytondugas'});
    // });


    // Error handler
    /* eslint-disable no-unused-vars */
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
    return app;
};

module.exports = {
    create
};
