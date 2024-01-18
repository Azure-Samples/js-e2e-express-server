import { create } from './server.js';

const port = process.env.PORT || 3000;

create()
    .then(app => {
        app.listen(port, () => {
            console.log(`Server has started on port ${port}!`);
        });
    })
    .catch(err => {
        console.error(`Failed to start the server: ${err.message}`);
        process.exit(1);
    });