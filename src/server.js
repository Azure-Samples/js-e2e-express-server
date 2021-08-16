const express = require('express');
const path = require('path');
const utils = require('./utils');

// fn to create express server
const create = async () => {

    // server
    const app = express();
    app.use(utils.ignoreFavicon);
    
    // Log request
    app.use(utils.appLogger);

    // root route - serve static file
    app.get('/', (req, res) => {
        return res.sendFile(path.join(__dirname, '../public/client.html'));
    });

    // Catch errors
    app.use(utils.logErrors);
    app.use(utils.clientErrorHandler);
    app.use(utils.errorHandler);

    return app;
};

module.exports = {
    create
};
