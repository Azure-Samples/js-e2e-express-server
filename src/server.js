const express = require('express');

const create = async () => {

    const app = express();

    app.get('/', (req, res) => {

        res.send("Hello World");
    });

    return app;
};

module.exports = {
    create
};
