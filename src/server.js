import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import * as utils from './utils.js';

// fn to create express server
const create = async () => {

    // server
    const app = express();
    app.use(favicon(path.join(process.cwd(), './public', 'favicon.ico')));
    
    // Log request
    app.use(utils.appLogger);

    // root route - serve static file
    app.get('/api/hello', (req, res) => {
        res.json({hello: 'goodbye'});
        res.end();
    });

    // root route - serve static file
    app.get('/', (req, res) => res.sendFile(path.join(process.cwd(), './public/client.html')));

    // Catch errors
    app.use(utils.logErrors);
    app.use(utils.clientError404Handler);
    app.use(utils.clientError500Handler);
    app.use(utils.errorHandler);

    return app;
};

export { create };