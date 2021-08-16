const request = require('supertest');
const { create } = require('./server.js');

describe('root', () => {

    it('request root, returns html', async (done) => {

        const app = await create();

        return request(app)
            .get('/')
            .expect(200)
            .then((res) => {
                expect(res.text).toContain('Welcome to Express');
                done();
            }).catch(err => done(err));;
    });
    it('request invalid path, returns 404', async (done) => {

        const app = await create();
        const invalidPath = `/invalid-path`;
        const invalidPathError = `Cannot GET ${invalidPath}`;

        return request(app)
            .get(invalidPath)
            .expect(404)
            .then((res) => {
                expect(res.text).toContain(invalidPathError);
                done();
            }).catch(err => done(err));;
    });
});
