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
    
    // Trust the Azure proxy, test HTTPS with req.secure
    app.set('trust proxy', 1);
    
    // configure nonFeature
    app.use(ignoreFavicon);

    // Public route - serve static file
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/client.html'));
    });
    
    // Error handler
    /* eslint-disable no-unused-vars */
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send(`Something broke! ${  req.route.path}`);
    });
    return app;
};

module.exports = {
    create
};
