const express = require('express');
const path = require('path');

// ignore request for FavIcon. so there is no error in browser
const ignoreFavicon = (req, res, next) => {
    if (req.originalUrl.includes('favicon.ico')) {
        res.status(204).end();
    }
    next();
};

var appLogger = (req, res, next) => {
    let method = req.method;
    let path = req.path;
    console.log(`${method} ${path} ${Date()}`);
};

// fn to create express server
const create = async () => {

    // server
    const app = express();

    // configure nonFeature
    app.use(ignoreFavicon);

    // root route - serve static file
    app.get('/', (req, res, next) => {
        res.sendFile(path.join(__dirname, '../public/client.html'));
        next();
    });
    app.use(appLogger);

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
