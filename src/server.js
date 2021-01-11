const express = require('express');

const create = async () => {

    const app = express();

    app.get('/', (req, res) => {

        const html = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Express</title>
            </head>
            <body>
                <h1>Express</h1>
                <p>Welcome to Express</p>
            </body>
        </html>
        `

        res.send(html);
    });

    return app;
};

module.exports = {
    create
};
